import RequestError from "@/services/request-service/RequestError";

type RequestHeaders = { [key: string]: string };
type RequestOptions = { headers?: RequestHeaders, body?: any };

class RequestService {
    private readonly baseUrl: string | null;
    private readonly defaultHeaders: RequestHeaders;

    constructor(baseUrl: string, defaultHeaders: RequestHeaders) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = defaultHeaders;
    }

    async get(url: string, options?: RequestOptions) {
        const response = await this.fetch('GET', url, options);
        return await this.getResponseBody(response);
    }

    async delete(url: string, options?: RequestOptions) {
        const response = await this.fetch('DELETE', url, options);
        return await this.getResponseBody(response);
    }

    async post(url: string, body: any) {
        const response = await this.fetch('POST', url, {body});
        return await this.getResponseBody(response);
    }

    async put(url: string, body: any) {
        const response = await this.fetch('PUT', url, {body});
        return await this.getResponseBody(response);
    }

    async patch(url: string, body: any) {
        const response = await this.fetch('PATCH', url, {body});
        return await this.getResponseBody(response);
    }

    /**
     * @throws RequestError
     * @return Promise<Response>
     */
    async fetch(method: string, url: string, requestOptions: RequestOptions = {}) {
        const finalUrl = this.getUrl(url);
        const fetchOptions: RequestInit = {
            body: requestOptions.body,
            headers: {
                ...this.defaultHeaders,
                ...requestOptions.headers,
            },
        }
        const response = await fetch(finalUrl, fetchOptions);
        const isSucceeded = (response.status >= 200 && response.status < 300);
        if (isSucceeded) {
            return response;
        }
        throw new RequestError(await this.getResponseBody(response));
    }

    async getResponseBody(response: Response) {
        let clonedResponse = await response.clone();
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
        return ['//', 'http://', 'https://'].some(protocol => url.startsWith(protocol));
    }
}

export const requestService = new RequestService(
    String(process.env.VUE_APP_CALENDAR_API_URL),
    {
        'Content-Type': 'application/json',
    },
);
