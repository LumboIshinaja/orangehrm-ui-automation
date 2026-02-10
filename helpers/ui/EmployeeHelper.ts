import { Page } from "@playwright/test";
import { PageObjectManager } from "../../managers/PageObjectManager";
import { EmployeesPage } from "../../pages/EmployeesPage";
import { CreateEmployeePage } from "../../pages/CreateEmployeePage";
import { EmployeePersonalDetailsPage } from "../../pages/EmployeePersonalDetailsPage";
import { Assertions } from "../../assertions/Assertions";

export type CreateEmployeeData = {
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    password: string;
};

export class EmployeeHelper {
    private readonly pm: PageObjectManager;
    private readonly employeesPage: EmployeesPage;
    private readonly createEmployeePage: CreateEmployeePage;
    private readonly employeePersDetPage: EmployeePersonalDetailsPage;

    constructor(page: Page) {
        this.pm = new PageObjectManager(page);
        this.employeesPage = this.pm.getPage(EmployeesPage);
        this.createEmployeePage = this.pm.getPage(CreateEmployeePage);
        this.employeePersDetPage = this.pm.getPage(EmployeePersonalDetailsPage);
    }

    /**
     * This method navigates user to Employee list page
     */
    async navigateToEmployeeList(): Promise<void> {
        await this.employeesPage.navigateToEmployeeList();
        await this.employeesPage.isAt();
    }

    /**
     * Creates a new employee via the OrangeHRM UI.
     *
     * @param data - Object containing employee creation data
     *               (names, username, password).
     */
    async createEmployee(data: CreateEmployeeData): Promise<void> {
        console.log("👤 Starting create employee flow");

        // STEP 1: Create employee
        await this.employeesPage.clickAddEmployee();

        await this.createEmployeePage.fillFirstName(data.firstName);

        await this.createEmployeePage.fillMiddleName(data.middleName);

        await this.createEmployeePage.fillLastName(data.lastName);
        await this.createEmployeePage.clickDetailsCheckbox();
        await this.createEmployeePage.fillUsername(data.username);
        await this.createEmployeePage.fillPassword(data.password);
        await this.createEmployeePage.fillConfirmPassword(data.password);
        await this.createEmployeePage.clickSave();

        // STEP 2: Personal details
        await this.employeePersDetPage.isAt();

        await this.employeePersDetPage.selectNationality("Serbian");
        await this.employeePersDetPage.selectMaritalStatus("Married");

        await this.employeePersDetPage.clickMaleCheckbox();
        await this.employeePersDetPage.clickRequiredSave();

        // STEP 3: Custom fields
        await this.employeePersDetPage.selectBloodType("B-");

        await this.employeePersDetPage.clickCustomSave();

        console.log("✅ Employee creation flow completed");
    }

    /**
     * This method validates that the employee search result matches the expected employee data.
     *
     * @param expectedFirstName - Expected employee first name (used for search).
     * @param expectedMiddleName - Expected employee middle name.
     * @param expectedLastName - Expected employee last name.
     */
    async validateEmployeeSearchResult(
        expectedFirstName: string,
        expectedMiddleName: string,
        expectedLastName: string,
    ): Promise<void> {
        console.log("🔍 Validating employee search result");

        await this.employeesPage.fillEmployeeName(expectedFirstName);
        await this.employeesPage.clickSearchEmployee();

        const actualMiddleName = await this.employeesPage.getEmployeeMiddleNameFromResult();

        console.log(
            `🔎 Middle name → expected: "${expectedMiddleName}", actual: "${actualMiddleName}"`,
        );
        Assertions.expectNormalizedText(actualMiddleName, expectedMiddleName);

        const actualLastName = await this.employeesPage.getEmployeeLastNameFromResult();

        console.log(`🔎 Last name → expected: "${expectedLastName}", actual: "${actualLastName}"`);
        Assertions.expectNormalizedText(actualLastName, expectedLastName);

        console.log("✅ Employee search result validation passed");
    }
}
