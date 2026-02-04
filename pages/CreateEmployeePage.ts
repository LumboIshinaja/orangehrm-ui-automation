import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { routes } from "../config/routes";

export class CreateEmployeePage extends BasePage {
    private readonly firstNameField: Locator;
    private readonly middleNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly createLoginDetailsCheckbox: Locator;
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly confirmPasswordField: Locator;
    private readonly saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameField = page.locator("input[name='firstName']");
        this.middleNameField = page.locator("input[name='middleName']");
        this.lastNameField = page.locator("input[name='lastName']");
        this.createLoginDetailsCheckbox = page.locator(".oxd-switch-input");
        this.usernameField = page.locator("input.oxd-input--active[autocomplete='off']").first();
        this.passwordField = page
            .locator("input.oxd-input--active[autocomplete='off'][type='password']")
            .first();
        this.confirmPasswordField = page
            .locator("input.oxd-input--active[autocomplete='off'][type='password']")
            .last();
        this.saveButton = page.locator("//button[normalize-space()='Save']");
    }

    /**
     * Navigates the user to the Add New Employee page.
     */
    async navigateToAddEmployee(): Promise<void> {
        await super.navigate(routes.addEmployee.pim, {
            readyLocator: this.firstNameField,
            expectUrl: /pim\/addEmployee/,
        });
    }

    /**
     * Fills the First Name input field.
     */
    async fillFirstName(firstName: string): Promise<void> {
        await this.actions.fill(this.firstNameField, firstName, "First Name input");
    }

    /**
     * Fills the Middle Name input field.
     */
    async fillMiddleName(middleName: string): Promise<void> {
        await this.actions.fill(this.middleNameField, middleName, "Middle Name input");
    }

    /**
     * Fills the Last Name input field.
     */
    async fillLastName(lastName: string): Promise<void> {
        await this.actions.fill(this.lastNameField, lastName, "Last Name input");
    }

    /**
     * Clicks the Create Login Details checkbox.
     */
    async clickDetailsCheckbox(): Promise<void> {
        await this.actions.click(this.createLoginDetailsCheckbox, "Create Login Details checkbox");
    }

    /**
     * Fills the Username input field.
     */
    async fillUsername(username: string): Promise<void> {
        await this.actions.fill(this.usernameField, username, "Username input");
    }

    /**
     * Fills the Password input field.
     */
    async fillPassword(password: string): Promise<void> {
        await this.actions.fill(this.passwordField, password, "Password input");
    }

    /**
     * Fills the Confirm Password input field.
     */
    async fillConfirmPassword(confirmPassword: string): Promise<void> {
        await this.actions.fill(this.passwordField, confirmPassword, "Password input");
    }

    /**
     * Clicks the Save button.
     */
    async clickSave(): Promise<void> {
        await this.actions.click(this.saveButton, "Save button");
    }
}
