import { Page } from "@playwright/test";
import { BaseActions } from "../utils/BaseActions";

export abstract class BasePage {
    protected readonly page: Page;
    protected readonly actions: BaseActions;

    constructor(page: Page) {
        this.page = page;
        this.actions = new BaseActions(page);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState("domcontentloaded");
    }

    getCurrentUrl(): string {
        return this.page.url();
    }
}
