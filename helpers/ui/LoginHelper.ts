import { Page } from "@playwright/test";
import { PageObjectManager } from "../../managers/PageObjectManager";
import { LoginPage } from "../../pages/LoginPage";
import { DashboardPage } from "../../pages/DashboardPage";

export class LoginHelper {
    private readonly pm: PageObjectManager;
    private readonly loginPage: LoginPage;
    private readonly dashboardPage: DashboardPage;

    constructor(page: Page) {
        this.pm = new PageObjectManager(page);
        this.loginPage = this.pm.getPage(LoginPage);
        this.dashboardPage = this.pm.getPage(DashboardPage);
    }

    /**
     * This method executes the login flow.
     */
    async loginUser(username: string, password: string): Promise<void> {
        console.log(`🔐 Starting login flow for user: ${username}`);

        await this.loginPage.navigateToLogin();
        await this.loginPage.fillUsername(username);
        await this.loginPage.fillPassword(password);
        await this.loginPage.clickLogin();

        console.log(`➡️ Login form submitted for user: ${username}`);
    }

    /**
     * Validates that the user has successfully logged in.
     */
    async validateUserLogin(): Promise<void> {
        console.log("🔎 Validating successful user login");
        await this.dashboardPage.isAt();
        console.log("✅ User successfully logged in");
    }
}
