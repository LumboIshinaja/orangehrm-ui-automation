import { Page, Locator, Response } from "@playwright/test";
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
        this.pageTitle = page.locator("h6.oxd-text--h6").first();
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
     */
    async navigate(
        pathOrUrl: string,
        options?: {
            timeout?: number;
            readyLocator?: Locator;
            checkHttpOk?: boolean;
        },
    ): Promise<Response | null> {
        const { timeout = 30000, readyLocator, checkHttpOk = true } = options ?? {};

        const targetUrl = this.toAbsoluteUrl(pathOrUrl);
        console.log(`➡️ Navigating to [${targetUrl}]`);

        try {
            const response = await this.page.goto(targetUrl, {
                waitUntil: "commit",
                timeout,
            });

            if (checkHttpOk && response && !response.ok()) {
                throw new Error(
                    `Navigation failed with HTTP ${response.status()} at ${response.url()}`,
                );
            }

            if (readyLocator) {
                await this.actions.waitForVisibility(readyLocator, timeout);
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

    /**
     * Waits until the page is considered ready for interaction.
     *
     * Combines:
     * - loader disappearance (if present)
     * - SPA micro-settle
     * - optional deterministic ready locator
     */
    protected async waitForPageReady(options?: {
        readyLocator?: Locator;
        timeout?: number;
    }): Promise<void> {
        const timeout = options?.timeout ?? 10000;

        // 1️⃣ App-specific async (spinner)
        await this.waitForLoaderToDisappear(timeout);

        // 2️⃣ SPA noise (safe polish)
        await this.bestEffortSpaSettle(timeout);

        // 3️⃣ Deterministic signal (gold standard)
        if (options?.readyLocator) {
            await options.readyLocator.waitFor({
                state: "visible",
                timeout,
            });
        }
    }

    async waitForLoaderToDisappear(timeout = 10000): Promise<void> {
        const spinner = this.loaderSpinner;

        if (await spinner.isVisible({ timeout: 1000 }).catch(() => false)) {
            console.log("⏳ Waiting for loading spinner to disappear");
            await spinner.waitFor({ state: "hidden", timeout });
            console.log("✅ Loading spinner disappeared");
        }
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

    /**
     * Selects one or more options from a dropdown identified by its visible label text.
     *
     * The method locates the dropdown control associated with the given label,
     * opens it, selects the provided option(s), and ensures the dropdown is properly
     * closed afterward. It supports both single-select and multi-select dropdowns
     * without exposing UI-specific implementation details to callers.
     *
     * @param labelText - Visible text of the label associated with the dropdown.
     * @param options - A single option or an array of options to select.
     * @param timeout - Maximum time to wait for dropdown elements to become visible.
     */

    async selectOptionsFromDropdown(
        labelText: string,
        options: string | string[],
        timeout = 5000,
    ): Promise<void> {
        try {
            const values = Array.isArray(options) ? options : [options];

            const dropdownToggle = this.page.locator(
                `//label[normalize-space()='${labelText}']
              /ancestor::div[contains(@class,'oxd-input-group')]
              //div[contains(@class,'oxd-select-wrapper')]`,
            );

            console.log(`🖱️ Opening dropdown for label "${labelText}"`);
            await this.actions.click(dropdownToggle, `Dropdown "${labelText}"`, timeout);

            for (const value of values) {
                const option = this.page.locator(
                    `//div[@role='listbox']//span[normalize-space()='${value}']`,
                );

                await option.waitFor({ state: "visible", timeout });

                console.log(`📌 Selecting option "${value}"`);
                await option.click();
            }

            await this.closeDropdownIfNeeded(values.length > 1);
        } catch (error) {
            console.error(
                `Failed selecting option(s) "${options}" from dropdown "${labelText}"`,
                error,
            );
            throw error;
        }
    }

    /**
     * This method closes an open dropdown when multiple selections are performed.
     *
     * @param isMultiSelect - Indicates whether multiple options were selected.
     */

    private async closeDropdownIfNeeded(isMultiSelect: boolean): Promise<void> {
        if (!isMultiSelect) return;

        // OrangeHRM reliably closes on Escape
        await this.page.keyboard.press("Escape");
        await this.page.waitForTimeout(200);
    }
}
