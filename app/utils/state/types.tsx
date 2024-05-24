enum LazyState {
    UN_INITIALIZED = 'UN_INITIALIZED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
}

interface LazyNonSuccess<T> {
    readonly state: LazyState.UN_INITIALIZED | LazyState.LOADING | LazyState.ERROR;
    readonly data?: T;
}

interface LazySuccess<T> {
    readonly state: LazyState.SUCCESS;
    readonly data: T;
}

type Lazy<T> = LazyNonSuccess<T> | LazySuccess<T>;

interface LazyStrict<T> {
    readonly state: LazyState;
    readonly data: T;
}

type DispatchHandler<TDispatchEvent extends { type: string }> = {
    [EventType in TDispatchEvent['type']]: (
        payload: Extract<TDispatchEvent, { type: EventType }>
    ) => Promise<unknown>;
};

type Dispatcher<TDispatchEvent extends { type: string }> = (
    value: TDispatchEvent
) => Promise<unknown>;

type UpdateReducerState<ReducerAction> = (value: ReducerAction) => void;

export type {
    LazyNonSuccess,
    LazySuccess,
    Lazy,
    LazyStrict,
    DispatchHandler,
    Dispatcher,
    UpdateReducerState,
};
export { LazyState };
