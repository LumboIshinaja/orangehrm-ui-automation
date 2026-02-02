import { APIRequestContext, APIResponse, request } from "@playwright/test";

export class ApiClient {
    protected readonly apiContext: APIRequestContext;

    private constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    /**
     * Factory method to create an ApiClient instance.
     */
    static async create(baseURL: string, headers?: Record<string, string>) {
        const context = await request.newContext({
            baseURL,
            extraHTTPHeaders: headers,
        });

        return new ApiClient(context);
    }

    async get(url: string, params?: Record<string, string>): Promise<APIResponse> {
        const response = await this.apiContext.get(url, { params });
        await this.logResponse("GET", url, response);
        return response;
    }

    async post(url: string, data?: unknown): Promise<APIResponse> {
        const response = await this.apiContext.post(url, { data });
        await this.logResponse("POST", url, response);
        return response;
    }

    async put(url: string, data?: unknown): Promise<APIResponse> {
        const response = await this.apiContext.put(url, { data });
        await this.logResponse("PUT", url, response);
        return response;
    }

    async delete(url: string): Promise<APIResponse> {
        const response = await this.apiContext.delete(url);
        await this.logResponse("DELETE", url, response);
        return response;
    }

    /**
     * Logs API response details for debugging.
     */
    protected async logResponse(method: string, url: string, response: APIResponse): Promise<void> {
        console.log(`🌐 ${method} ${url}`);
        console.log(`↳ Status: ${response.status()}`);

        try {
            const body = await response.json();
            console.log("↳ Response body:", body);
        } catch {
            console.log("↳ Response body: <not JSON>");
        }
    }

    async dispose(): Promise<void> {
        await this.apiContext.dispose();
    }
}
