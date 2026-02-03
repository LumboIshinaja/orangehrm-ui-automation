import { Page, Locator, expect, Response } from "@playwright/test";
import { BaseActions } from "../utils/BaseActions";
import { Assertions } from "../assertions/Assertions";

export abstract class BasePage {
    protected readonly page: Page;
    protected readonly actions: BaseActions;
    protected readonly pageTitle: Locator;
    protected readonly loaderSpinner: Locator;

    constructor(page: Page) {
        this.page = page;
        this.actions = new BaseActions(page);
        this.pageTitle = page.locator("h6.oxd-text--h6");
        this.loaderSpinner = page.locator(".oxd-loading-spinner");
    }

    getCurrentUrl(): string {
        return this.page.url();
    }

    /**
     * Validates that the current page title matches the expected value.
     */
    async isAtPageWithTitle(expectedTitle: string): Promise<void> {
        const actualTitle = await this.actions.getText(this.pageTitle, "Page title");

        Assertions.expectNormalizedText(actualTitle, expectedTitle);
    }

    /**
     * Navigates to a route or absolute URL and waits until the page is usable.
     * SPA-aware and suitable for OrangeHRM routing.
     */
    async navigate(
        pathOrUrl: string,
        options?: {
            timeout?: number;
            readyLocator?: Locator;
            expectUrl?: string | RegExp;
            checkHttpOk?: boolean;
        },
    ): Promise<Response | null> {
        const { timeout = 30000, readyLocator, expectUrl, checkHttpOk = true } = options ?? {};

        const targetUrl = this.toAbsoluteUrl(pathOrUrl);
        console.log(`➡️ Navigating to [${targetUrl}]`);

        let response: Response | null = null;

        try {
            response = await this.page.goto(targetUrl, {
                waitUntil: "commit",
                timeout,
            });

            if (checkHttpOk && response && !response.ok()) {
                throw new Error(
                    `Navigation failed with HTTP ${response.status()} at ${response.url()}`,
                );
            }

            if (expectUrl) {
                await expect(this.page).toHaveURL(expectUrl, { timeout });
            }

            if (readyLocator) {
                await expect(readyLocator).toBeVisible({ timeout });
            } else {
                await this.bestEffortSpaSettle(timeout);
            }

            console.log(`✅ Navigation complete → ${this.page.url()}`);
            return response;
        } catch (error) {
            console.error(`❌ Failed to navigate to ${targetUrl}`, error);
            throw error;
        }
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState("domcontentloaded");
    }

    async waitForLoaderToDisappear(timeout = 10000): Promise<void> {
        try {
            await this.loaderSpinner.waitFor({
                state: "hidden",
                timeout,
            });
        } catch {
            // Spinner may not appear at all — that's fine
            console.log("ℹ️ Loading spinner not present or already gone");
        }
    }

    protected toAbsoluteUrl(pathOrUrl: string): string {
        if (pathOrUrl.startsWith("http")) {
            return pathOrUrl;
        }

        const baseUrl = process.env.BASE_URL;
        if (!baseUrl) {
            throw new Error("BASE_URL is not defined");
        }

        return `${baseUrl}${pathOrUrl}`;
    }

    protected async bestEffortSpaSettle(timeout: number): Promise<void> {
        await this.page
            .waitForLoadState("networkidle", {
                timeout: Math.min(timeout, 7000),
            })
            .catch(() => {});

        await this.page
            .waitForFunction(() => document.readyState !== "loading", null, { timeout: 2000 })
            .catch(() => {});

        await this.page
            .evaluate(
                () =>
                    new Promise((resolve) =>
                        requestAnimationFrame(() => requestAnimationFrame(resolve)),
                    ),
            )
            .catch(() => {});
    }
}
