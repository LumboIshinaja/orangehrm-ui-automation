import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export class LoginHelper {
    private readonly loginPage: LoginPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
    }

    /**
     * Performs user login using provided credentials.
     *
     * This method only executes the login flow.
     * Validation of successful login should be handled by the caller.
     */
    async loginUser(username: string, password: string): Promise<void> {
        console.log(`🔐 Starting login flow for user: ${username}`);

        await this.loginPage.navigateToLogin();
        await this.loginPage.fillUsername(username);
        await this.loginPage.fillPassword(password);
        await this.loginPage.clickLogin();

        console.log(`➡️ Login form submitted for user: ${username}`);
    }
}
