import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { routes } from "../config/routes";

export class EmployeesPage extends BasePage {
    private readonly employeeNameField: Locator;
    private readonly addEmployeeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.employeeNameField = page.locator(".oxd-autocomplete-text-input").first();
        this.addEmployeeButton = page.locator("button.oxd-button--secondary[type='button']");
    }

    /**
     * Navigates the user to the Employee List page.
     */
    async navigateToEmployeeList(): Promise<void> {
        await super.navigate(routes.employeeList.pim, {
            readyLocator: this.employeeNameField,
            expectUrl: /employeeList\/pim/,
        });
    }

    /**
     * Fills the Employee Name input search field.
     */
    async fillEmployeeName(employeeName: string): Promise<void> {
        await this.actions.fill(this.employeeNameField, employeeName, "Employee Name input");
    }

    /**
     * Clicks the Add employee button.
     */
    async clickAddEmployee(): Promise<void> {
        await this.actions.click(this.addEmployeeButton, "Add employee button");
    }
}
