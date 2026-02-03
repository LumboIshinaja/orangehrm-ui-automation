import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { routes } from "../config/routes";

export class LoginPage extends BasePage {
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);

        this.usernameField = page.locator("input[name='username']");
        this.passwordField = page.locator("input[type='password']");
        this.loginButton = page.locator(".orangehrm-login-button");
    }

    /**
     * Navigates the user to the Login page.
     */
    async navigateToLogin(): Promise<void> {
        await super.navigate(routes.auth.login, {
            readyLocator: this.loginButton,
            expectUrl: /auth\/login/,
        });
    }

    /**
     * Fills the username input field.
     */
    async fillUsername(username: string): Promise<void> {
        await this.actions.fill(this.usernameField, username, "Username input");
    }

    /**
     * Fills the password input field.
     */
    async fillPassword(password: string): Promise<void> {
        await this.actions.fill(this.passwordField, password, "Password input");
    }

    /**
     * Clicks the login button.
     */
    async clickLogin(): Promise<void> {
        await this.actions.click(this.loginButton, "Login button");
    }
}
