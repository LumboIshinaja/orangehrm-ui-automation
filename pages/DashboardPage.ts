import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { pageTitleValues } from "../constants/AppConstants";

export class DashboardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * This method verifies if user is on correct page
     */
    async isAt(): Promise<void> {
        await this.waitForLoaderToDisappear();
        await this.isAtPageWithTitle(pageTitleValues.dashboardTitle);
    }
}
