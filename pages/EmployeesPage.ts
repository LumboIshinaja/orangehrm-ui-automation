import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { routes } from "../config/routes";
import { pageTitleValues } from "../constants/AppConstants";

export class EmployeesPage extends BasePage {
    private readonly employeeNameField: Locator;
    private readonly addEmployeeButton: Locator;
    private readonly searchButton: Locator;
    private readonly tableFirstMiddleNameCell: Locator;
    private readonly tableLastNameCell: Locator;

    constructor(page: Page) {
        super(page);
        this.employeeNameField = page.locator(".oxd-autocomplete-text-input input").first();
        this.addEmployeeButton = page.locator("button.oxd-button--secondary[type='button']");
        this.searchButton = page.locator("//button[contains(., 'Search')]");
        this.tableFirstMiddleNameCell = page.locator(".oxd-table-cell.oxd-padding-cell").nth(2);
        this.tableLastNameCell = page.locator(".oxd-table-cell.oxd-padding-cell").nth(3);
    }

    /**
     * This method verifies if user is on correct page
     */
    async isAt(): Promise<void> {
        await this.waitForLoaderToDisappear();
        await this.isAtPageWithTitle(pageTitleValues.employeesTitle);
    }

    /**
     * Navigates the user to the Employee List page.
     */
    async navigateToEmployeeList(): Promise<void> {
        await super.navigate(routes.pim.employeeList);
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

    /**
     * Clicks the Search employee button.
     */
    async clickSearchEmployee(): Promise<void> {
        await this.actions.click(this.searchButton, "Search employee button");
        await this.waitForLoaderToDisappear();
    }

    async getEmployeeMiddleNameFromResult(): Promise<string> {
        return await this.actions.getText(
            this.tableFirstMiddleNameCell,
            "Employee middle name cell",
        );
    }

    async getEmployeeLastNameFromResult(): Promise<string> {
        return await this.actions.getText(this.tableLastNameCell, "Employee last name cell");
    }
}
