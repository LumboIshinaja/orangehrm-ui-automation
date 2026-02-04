import { Page } from "@playwright/test";
import { PageObjectManager } from "../../managers/PageObjectManager";
import { EmployeesPage } from "../../pages/EmployeesPage";
import { CreateEmployeePage } from "../../pages/CreateEmployeePage";

export type CreateEmployeeData = {
    firstName: string;
    middleName?: string;
    lastName: string;
    username: string;
    password: string;
};

export class EmployeeHelper {
    private readonly pm: PageObjectManager;
    private readonly employeesPage: EmployeesPage;
    private readonly createEmployeePage: CreateEmployeePage;

    constructor(page: Page) {
        this.pm = new PageObjectManager(page);
        this.employeesPage = this.pm.getPage(EmployeesPage);
        this.createEmployeePage = this.pm.getPage(CreateEmployeePage);
    }

    /**
     * Creates a new employee by completing the full UI flow.
     */
    async createEmployee(data: CreateEmployeeData): Promise<void> {
        console.log("👤 Starting create employee flow");

        // Navigate to employee list
        await this.employeesPage.navigateToEmployeeList();
        await this.employeesPage.isAt();

        // Open create employee form
        await this.employeesPage.clickAddEmployee();

        // Fill personal details
        await this.createEmployeePage.fillFirstName(data.firstName);

        if (data.middleName) {
            await this.createEmployeePage.fillMiddleName(data.middleName);
        }

        await this.createEmployeePage.fillLastName(data.lastName);

        // Enable login details
        await this.createEmployeePage.clickDetailsCheckbox();

        // Fill login credentials
        await this.createEmployeePage.fillUsername(data.username);
        await this.createEmployeePage.fillPassword(data.password);
        await this.createEmployeePage.fillConfirmPassword(data.password);

        // Save employee
        await this.createEmployeePage.clickSave();

        console.log("✅ Employee creation flow completed");
    }
}
