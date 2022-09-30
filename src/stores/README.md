# Stores and State Management

[SO on creating sub-stores](https://stackoverflow.com/questions/54393475/correct-way-of-creating-multiple-stores-with-mobx-and-injecting-it-into-to-a-com)

[MobX documentation on defining data stores](https://mobx.js.org/defining-data-stores.html)

Our MobX state is a composition of several smaller "domain" stores.  It goes:

```shell
|--- Root Store
    |--- Auth Store
    |--- Deposit Store
    |--- Portfolio Store
    |--- Quiz Store
    |--- Referral Store
    |--- Skeleton Store # handles view-model skeletons
    |--- Transfer Store
    |--- User Store

    # Additionally
    |--- Transport (not a store, this is our API interaction client)
```

## General Instantiation Pattern

Each store is a class instance. Each sub-store is instantiated within the constructor of the Root Store

```typescript
// src/stores/rootStore.js

export class RootStore {
    constructor(api, tracking) {
        /** tracking clients */
        this.tracking = tracking;

        /** sub-stores */
        this.auth = AuthStore.build(this, api);
        this.deposit = DepositStore.build(this, api);
        this.cellar = CellarStore.build(this, api, toast);
        this.quiz = QuizStore.build(this, api);
        this.referral = ReferralStore.build(this, api);
        this.transfer = TransferStore.build(this, api);
        this.user = UserStore.build(this, api);
        this.skeleton = SkeletonStore.build(this);
    }
}
```

We instantiate + pass all dependencies through injection from the root level. Why?
* This makes unit testing infinitely easier, by removing the need to spy on global imports + instead stub spy objects locally with methods we want to test.  We can then pass them in like so:

```typescript
// src/stores/__tests__/portfolio.js

describe("Portfolio Store", () => {
    const api = {};
    const toastClient = { error: jest.fn() };
    const rootStore = { auth: { accessToken: "vv-jwt" }, user: { oktaUserInfo: { sub: "vvUserId" } } };
    const store = CellarStore.build(rootStore, api, toastClient);
    afterEach(() => store.resetState());

    // your assertions...
});
```

## Transport Client

Our Transport client is an API interaction abstraction.

It is a class instance that contains distinct methods that call our APIs.

We currently use the `fetch()` API + pass our JWTs in as method arguments.  These methods are intended to be invoked from within each sub store

## What's inside each store

### `@observable` properties

These are the same as class properties.  However, any components wrapped with the `observer()` HOC that reference these properties will watch these properties for changes

```typescript
    @observable selectedPaymentSource = new PaymentSource();
    @observable selectedFrequencyKey = "";
    @observable depositStartDate = moment().endOf("day");
```

### `@computed` properties

Further, MobX allows for `@computed` properties, which are es6 class getters that will watch `@observable` properties + recompute dynamically.  Think of them as Redux selectors or Ember computed properties - they are derived values based on `@observable` property inputs

```typescript
// inside of src/stores/deposit.js
    @observable depositAmt = 100;

    @computed get depositAmtInCents() {
        return this.depositAmt * 100;
    }

// inside of a component
console.log(depositStore.depositAmtInCents)
// 10000
```

### `@action` methods

These are your store's simple API to update an `@observable` property.  Directly updating a property through assignment will throw an error - this allows for the MobX observer loop to complete and update in sequence

DO NOT USE THESE TO PERFORM SIDE EFFECTS - you can use `flow()` methods to handle both side effects + `@observable` property changes

### `flow(fn* ())` generator methods
`flow()` methods are use to handle both side-effect logic + state updates.  A common use case is an HTTP call, followed by state change with the results

`flow()` methods return a Promise, so you can `await` on them from the calling context

* You can opt to have return values to be passed back into the calling context
* However, this is not recommended to keep side effects and data leaks out of the view layer + keep the flow deterministic by referencing the state as the source of truth

Typically, `flow()` methods will invoke those API calls defined within `transport.js`, aka the Transport client

## FetchStatus + FetchEntity Pattern

Most side effects involve

1. making an HTTP call
2. caching the response
3. caching the error (if applicable)

To standardize this pattern, we've created the `FetchStatus` and `FetchEntity` patterns:

### `FetchStatus`

[Module](https://github.com/Vinovest/web-client/blob/master/src/models/FetchStatus.js#L10-L58)

`FetchStatus` is a class instance that standardizes different fetch states, specific to how they are cached + used from within the view layer

* The idea is to use a `FetchStatus` instance for any type of fetch you will need to make + data you save
* You'd then key off of the `FetchStatus`'s states to determine if a call has completed, errored, or yet to be made


### `FetchEntity`

[Definition](https://github.com/Vinovest/web-client/blob/master/src/models/FetchStatus.js#L60-L66)

`FetchEntity` is a caching layer, and the idea is to instantiate a new one via the factory helper `emptyFetchEntity()`

```typescript
// within the FetchStatus.js module
export const emptyFetchEntity = (data) => ({
    data,
    status: invalidatedFetch(),
});

// src/stores/deposit/js
export class DepositStore {
    @observable depositPost = emptyFetchEntity();

    // ...
}
```

This means that any fetched + cacheable data should be instantiated + referenced with an `emptyFetchEntity()`, with an optional argument if you want to initialize a data type

```typescript

// let's say you are fetching user profile data - here we are initializing with {}

@observable userProfile = emptyFetchEntity({});

// under the hood, this is what this state looks like:

@observable userProfile = {
    data: {},
    status: invalidatedFetch()
}

// you'd then be able to key off this `userProfile` key's data + status values to guide state changes:

getStatus(state.userProfile).isPending()
getStatus(state.userProfile).isFailed()
getStatus(state.userProfile).isDone() // only checks if fetch is not pending, but not aware of success/failure
getStatus(state.userProfile).isFetching() // specifically checks for pending READ operations
getStatus(state.userProfile).isSuccess()

// if you want to access the cached data:

getData(state.userProfile).email
getData(state.userProfile).name
getData(state.userProfile).whatever_attribute

```

You can conduct state changes to these `FetchEntity`'s through `flow()` methods; however, you will need to replace the entire `FetchEntity` property with an entirely new instantiated object to prevent reference errors

```typescript
// src/stores/deposit/js
export class DepositStore {

    requestCreateDeposit = flow(function* (stripe) {
        this.depositPost = { ...this.depositPost, status: pendingFetch() };

        const source = this.selectedPaymentSource;
        let response = {};

        if (source.isACH() || this.isSubscription) {
            response = yield this._requestCreateV2TransferWithInterval();
        } else {
            response = yield this._requestOneTimeStripeTransferWithPaymentIntent(stripe);
        }

        if (!response.ok) {
            const error = yield response.json();
            const contactCTA =
                error.code === "card_declined"
                    ? " Please reach out to customer service or your card issuer to find out about next steps."
                    : "";
            this.depositPost = { ...this.depositPost, status: erroredFetch(`${error.message}${contactCTA}`) };
            return;
        }

        this.depositPost = { ...this.depositPost, status: completedFetch() };
    });
}

```

Finally, after invoking the `flow()` method to complete the fetch (or in this case, a POST), you can await the `flow()` call (bc remember that it is a generator + returns a cancellable Promise), key off the `status` attribute (since it is a `FetchEntity`) to determine how to proceed:

```typescript
// src/some-component.js
    const onCompleteTransfer = useCallback(async () => {
        await depositStore.requestCreateDeposit(stripe);

        if (depositStore.depositPost.status.isSuccess()) {
            routeTo("/deposit/confirmation");
            return;
        }

        routeTo("/deposit/failed");
    }, [depositStore, routeTo, stripe]);
```

One final item is that although in the above example, we reference the `status` key directly, we also provide two helper accessors to reference either the `data` key or `status` key:

```typescript
// within the FetchStatus.js module
export const getData = (entity) => entity.data;
export const getStatus = (entity) => entity.status;

// src/some-component.js
    const hasUserDataLoaded = useMemo(
        () => getStatus(s.user.oktaUserEntity).isDone() && getStatus(s.user.profileEntity).isDone(),
        [s.user.oktaUserEntity, s.user.profileEntity],
    );
```
