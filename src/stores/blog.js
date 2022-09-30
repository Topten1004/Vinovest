import { observable, computed, flow, action } from "mobx";
import stringify from "json-stringify-safe";
import { get } from "lodash";
import { emptyFetchEntity, completedFetch, pendingFetch, erroredFetch, getData, getStatus } from "#models/FetchStatus";

const emptyBlogCategoryEntity = () => emptyFetchEntity([{ name: "latest" }]);
// limit should support dividing by 2 without residue
const initFetchParams = () => ({ category: "latest", total: 0, skip: 0, limit: 18, pagesCount: 0, page: 1 });
const initPopular = () => ({ mostPopular: [], featured: {} });
export class BlogStore {
    static build(rootStore, api, toastClient) {
        return new BlogStore(rootStore, api, toastClient);
    }

    @observable blogCategoriesEntity = emptyBlogCategoryEntity();
    @observable fetchParams = initFetchParams();
    @observable blogListEntity = emptyFetchEntity([]);
    @observable articleEntity = emptyFetchEntity({});
    @observable popularEntity = emptyFetchEntity(initPopular());

    constructor(rootStore, api, toastClient) {
        this.root = rootStore;
        this.api = api;
        this.toastClient = toastClient;

        this.updateCategory = this.updateCategory.bind(this);
        this.fetchBlogCategories = this.fetchBlogCategories.bind(this);
        this.fetchBlogs = this.fetchBlogs.bind(this);
        this.fetchArticle = this.fetchArticle.bind(this);
        this.resetArticle = this.resetArticle.bind(this);
        this.fetchBlogsByCategory = this.fetchBlogsByCategory.bind(this);
    }

    @computed get blogCategories() {
        return getData(this.blogCategoriesEntity);
    }

    @computed get blogList() {
        return getData(this.blogListEntity);
    }

    @computed get article() {
        return getData(this.articleEntity);
    }

    @computed get popular() {
        return getData(this.popularEntity);
    }

    @computed get isBlogListPagePending() {
        return getStatus(this.blogListEntity).isPending() || getStatus(this.blogCategoriesEntity).isPending();
    }

    @computed get isArticlePagePending() {
        return getStatus(this.articleEntity).isPending();
    }

    @computed get articlePageDoesNotExist() {
        return getStatus(this.articleEntity).error === "PAGE_NOT_FOUND";
    }

    @computed get isPopularPending() {
        return getStatus(this.popularEntity).isPending();
    }

    @computed get isPopularPendingDone() {
        return getStatus(this.popularEntity).isDone();
    }

    @action updateCategory({ category, page = 1 }) {
        if (!this.isBlogListPagePending) {
            if (category === "latest") {
                this.fetchParams = { ...initFetchParams(), category };

                this.fetchBlogs(1);
            } else {
                const chosenCategory = this.blogCategoriesEntity.data.find(({ name }) => name === category);

                if (!chosenCategory.blogs) return

                const initParams = initFetchParams();
                const total = chosenCategory.blogs.length;

                this.fetchParams = {
                    ...initParams,
                    category,
                    pagesCount: Math.ceil(total / initParams.limit),
                    total,
                    page,
                };

                return this.fetchBlogsByCategory({
                    ...chosenCategory,
                    blogs: chosenCategory.blogs.slice(
                        (page - 1) * initParams.limit,
                        (page - 1) * initParams.limit + initParams.limit,
                    ),
                });
            }
        }
    }

    @action resetArticle() {
        this.articleEntity = emptyFetchEntity({});
    }
    // avoid circular reference mobx error
    runCircularReplacer = (data) => JSON.parse(stringify(data));

    fetchBlogCategories = flow(function* () {
        this.blogCategoriesEntity.status = pendingFetch();

        const { ok, data } = yield this.api.getBlogCategoriesFromContentful();

        if (!ok || !data) {
            const errorMsg =
                "There was an issue fetching your blog categories. Please try again or chat with us here 👉";
            this.blogCategoriesEntity.status = erroredFetch(data);
            this.toastClient.error(errorMsg, { position: "bottom-center" });
            return;
        }

        const categoriesAcc = data.reduce((acc, obj) => ({ ...acc, [obj.name]: obj }), {});
        // split Most Popular and Featured categories
        const { "Most Popular": mostPopular, Featured: featured, ...restCategoriesAcc } = categoriesAcc;

        const restCategoriesList = Object.values(restCategoriesAcc);

        this.blogCategoriesEntity = {
            data: [...emptyBlogCategoryEntity().data, ...restCategoriesList],
            status: completedFetch(),
        };
        // fetch Most Popular and Featured blogs
        this.fetchPopular({
            mostPopular: mostPopular ? mostPopular.blogs : [],
            featured: featured ? featured.blogs : [],
        });
    });

    fetchBlogsByIds = flow(function* (list, limit) {
        if (!list || !list.length) return [];

        const fetchIds = list.map(({ sys }) => sys.id);

        const { ok, data } = yield this.api.getBlogsListFromContentful({
            skip: 0,
            category: null,
            filterIds: fetchIds.join(","),
            limit,
        });

        if (!ok || !data) {
            const errorMsg = "There was an issue fetching your blogs. Please try again or chat with us here 👉";

            this.toastClient.error(errorMsg, { position: "bottom-center" });
            return;
        }

        const getItems = () => get(data, "items", []).map((data) => this.runCircularReplacer(data));

        return getItems(fetchIds);
    });

    fetchPopular = flow(function* ({ mostPopular, featured }) {
        this.popularEntity = {
            data: initPopular(),
            status: pendingFetch(),
        };

        const [mostPopularResponse, featuredResponse] = yield Promise.all([
            this.fetchBlogsByIds(mostPopular, 4),
            this.fetchBlogsByIds(featured),
        ]);

        if (mostPopularResponse) {
            this.popularEntity.data.mostPopular = mostPopularResponse;
        }

        if (mostPopularResponse) {
            this.popularEntity.data.featured = featuredResponse.filter(
                (data) => Object.entries(data).length > 1,
            );
        }

        this.popularEntity.status = completedFetch();
    });

    fetchBlogs = flow(function* (page) {
        const { limit, pagesCount } = this.fetchParams;
        if (page > pagesCount && pagesCount) return;

        this.blogListEntity = { status: pendingFetch(), data: [] };

        this.fetchParams.page = page;

        const response = yield this.api.getBlogsListFromContentful({
            skip: (page - 1) * limit,
            limit,
            category: null,
        });

        const { ok, data } = response;

        if (!ok || !data) {
            const errorMsg = "There was an issue fetching your blogs. Please try again or chat with us here 👉";

            this.blogListEntity = { status: erroredFetch(), data: [] };
            this.toastClient.error(errorMsg, { position: "bottom-center" });
            return;
        }

        const { total, skip } = data;

        this.fetchParams = {
            ...this.fetchParams,
            total,
            skip,
            pagesCount: Math.ceil(total / limit),
        };

        this.blogListEntity = {
            data: this.runCircularReplacer(data.items),
            status: completedFetch(),
        };
    });

    fetchBlogsByCategory = flow(function* (category) {
        this.blogListEntity = {
            data: [],
            status: pendingFetch(),
        };

        const blogs = yield this.fetchBlogsByIds(category.blogs);

        this.blogListEntity = { status: completedFetch(), data: blogs || [] };
    });

    fetchArticle = flow(function* (slug) {
        if (this.isBlogListPagePending) return;

        this.articleEntity = { status: pendingFetch(), data: {} };

        const { ok, data, error } = yield this.api.getArticleFromContentful(slug);

        if (!ok || !data) {
            const errorMsg = "There was an issue fetching blog. Please try again or chat with us here 👉";
            this.articleEntity = { status: erroredFetch(error), data: {} };

            if (error !== "PAGE_NOT_FOUND") this.toastClient.error(errorMsg, { position: "bottom-center" });
            return;
        }

        const relatedItems = yield this.fetchBlogsByIds(data.relatedArticles);

        data.relatedArticlesFromResponse = this.runCircularReplacer(relatedItems);

        this.articleEntity = { data: this.runCircularReplacer(data), status: completedFetch() };
    });
}
