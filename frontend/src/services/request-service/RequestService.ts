import RequestError from '@/services/request-service/RequestError';
import Auth from '@aws-amplify/auth';

type RequestHeaders = { [key: string]: string };
type RequestOptions = { headers?: RequestHeaders, body?: any };

// noinspection JSMethodCanBeStatic
class RequestService {
    private readonly baseUrl: string | null;

    private readonly defaultHeaders: RequestHeaders;

    constructor(baseUrl: string, defaultHeaders: RequestHeaders) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = defaultHeaders;
    }

    async get(url: string, options?: RequestOptions) {
        return this.fetch('GET', url, options);
    }

    async delete(url: string, options?: RequestOptions) {
        return this.fetch('DELETE', url, options);
    }

    async post(url: string, body: any) {
        return await this.fetch('POST', url, { body });
    }

    async put(url: string, body: any) {
        return this.fetch('PUT', url, { body });
    }

    async patch(url: string, body: any) {
        return this.fetch('PATCH', url, { body });
    }

    /**
     * @throws RequestError
     * @return Promise<Response>
     */
    async fetch(method: string, url: string, requestOptions: RequestOptions = {}) {
        const authToken = await this.getAuthToken();
        const finalUrl = this.getUrl(url);
        const fetchOptions: RequestInit = {
            method,
            body: JSON.stringify(requestOptions.body),
            headers: {
                ...this.defaultHeaders,
                ...requestOptions.headers,
                Authorization: authToken,
            },
        };

        const response = await fetch(finalUrl, fetchOptions);
        const isSucceeded = (response.status >= 200 && response.status < 300);
        if (isSucceeded) {
            return await this.getResponseBody(response);
        }
        throw new RequestError(await this.getResponseBody(response));
    }

    private async getAuthToken() {
        const session = await Auth.currentSession();
        const token = session.getIdToken();
        return `Bearer ${token.getJwtToken()}`;
    }

    async getResponseBody(response: Response) {
        const clonedResponse = await response.clone();
        try {
            return await response.json();
        } catch (e) {
            return await clonedResponse.text();
        }
    }

    getUrl(url: string) {
        if (this.baseUrl && !this.isAbsoluteUrl(url)) {
            return this.baseUrl + url;
        }
        return url;
    }

    isAbsoluteUrl(url: string) {
        return ['//', 'http://', 'https://'].some((protocol) => url.startsWith(protocol));
    }
}

export const requestService = new RequestService(
    String(process.env.VUE_APP_CALENDAR_API_URL),
    {
        'Content-Type': 'application/json',
    },
);
