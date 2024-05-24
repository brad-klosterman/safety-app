import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { type APIResponse, type APIErrorResponse } from './types';

class APIFactory {
    axios_instance: AxiosInstance;

    constructor(private readonly baseURL: string) {
        this.axios_instance = axios.create({
            baseURL,
        });
    }

    public updateAuthorizationHeader(authorization_header: string) {
        this.axios_instance.defaults.headers.Authorization = authorization_header;
    }

    public async get<T>(
        path: string | undefined = '',
        config?: AxiosRequestConfig | undefined
    ): APIResponse<T> {
        try {
            const response = await this.axios_instance.get(path, config);
            return response.data;
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    public async post<T>(path = '', data?: Record<string, any>): APIResponse<T> {
        try {
            const response = await this.axios_instance.post(path, data);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async patchForm<T>(path = '', data: FormData): APIResponse<T> {
        try {
            const response = await this.axios_instance.patch(path, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async uploadFile<T>(path = '', data: FormData): APIResponse<T> {
        try {
            const response = await this.axios_instance.post(path, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: any): APIErrorResponse {
        console.error(error);
        if (!error.response) {
            return { error: { code: 'UNKNOWN', message: error.message } };
        } else if (error.response.status === 401) {
            return { error: { code: 'UNAUTHORIZED', message: error.response.data } };
        } else if (error.response.status === 403) {
            return { error: { code: 'FORBIDDEN', message: error.response.data } };
        } else {
            return { error: { code: 'UNKNOWN', message: 'Unknown Error' } };
        }
    }
}

export { APIFactory };
