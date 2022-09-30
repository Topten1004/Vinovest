import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { range, get } from "lodash";
import { observer } from "mobx-react-lite";
import { useRootStore } from "#shared/hooks";
import { SmallSubtitle, UpperSubtitle } from "#shared/ui/Typography/styled";
import { formatDatePP } from "#utils/shared";

const pendingRange = range(3);

const NewsSection = observer(() => {
    const s = useRootStore();
    const { fetchNewsList, isNewsListPending, newsList, isNewsListDone } = s.press;

    React.useEffect(() => {
        if (!isNewsListPending && !newsList.length && !isNewsListDone) {
            fetchNewsList();
        }
    }, [fetchNewsList, isNewsListPending, newsList, isNewsListDone]);

    return (
        <Section>
            {!isNewsListPending && newsList.map((item) => <PressItem key={get(item, "sys.id")} item={item} />)}
            {isNewsListPending && pendingRange.map((e) => <PressItem key={e} isPending />)}
        </Section>
    );
});

const PressItem = ({ item = {}, isPending }) => {
    const postDate = get(item, "fields.date");
    const postTitle = get(item, "fields.title");
    const postImage = get(item, "fields.image.fields.file.url");
    const postUrl = get(item, "fields.url");

    return (
        <div className="newsItem">
            <a target="_blank" rel="noopener noreferrer" className="linkWrapper" href={postUrl}>
                <div className="textWrapper">
                    <UpperSubtitle>
                        {isPending ? <Skeleton style={{ height: "16px", width: "100px" }} /> : formatDatePP(postDate)}
                    </UpperSubtitle>
                    <SmallSubtitle>
                        {isPending ? <Skeleton style={{ height: "36px", width: "260px" }} /> : postTitle}
                    </SmallSubtitle>
                </div>
                <div className="logoWrapper">
                    {isPending ? (
                        <Skeleton style={{ height: "111px", width: "247px" }} />
                    ) : (
                        <img src={postImage} alt={postTitle} />
                    )}
                </div>
            </a>
        </div>
    );
};

const Section = styled.section`
    padding: 0 8.888% 100px;
    margin: 0 auto;
    width: 1440px;
    max-width: 95%;
    .newsItem {
        border-bottom: 1px solid #eee;
    }
    .linkWrapper {
        padding: 65px 0;
        display: flex;
        color: #242e35;
        text-decoration: none;
        justify-content: space-between;
        align-items: center;
    }

    .textWrapper {
        max-width: 770px;
        ${UpperSubtitle} {
            font-size: 14px;
            margin-bottom: 14px;
            display: block;
        }
        ${SmallSubtitle} {
            text-align: start;
        }
    }
    .logoWrapper {
        max-width: 247px;
        img {
            width: 100%;
            object-fit: contain;
        }
    }
    @media screen and (max-width: 767px) {
        .linkWrapper {
            flex-direction: column;
            align-items: flex-start;
            padding: 33px 0px;
        }
        .logoWrapper {
            margin-top: 20px;
            max-width: 180px;
        }
    }
`;
export default NewsSection;
