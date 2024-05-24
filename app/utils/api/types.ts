type APIResponse<T> = Promise<APISuccessResponse<T> | APIErrorResponse>;

type APISuccessResponse<T> = T & { error: null };

type APIErrorResponse<Code extends APIErrorCode = APIErrorCode> = {
    error: {
        code: number | Code;
        message: string;
    };
};

type APIErrorCode = 'UNAUTHORIZED' | 'FORBIDDEN' | 'UNKNOWN';

/** Pagination */

type PaginationParams = {
    page: number;
    per_page: number;
};

type PaginationState = {
    readonly count: number;
    readonly items: number;
    readonly page: number;
    readonly per_page: number;
};

/** Filtering */

type FilterState<T> = {
    readonly filters: T;
    readonly num_active_filters: number;
};

export type {
    APIResponse,
    APIErrorResponse,
    APIErrorCode,
    PaginationParams,
    PaginationState,
    FilterState,
};
