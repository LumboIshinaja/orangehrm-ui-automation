import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { pageTitleValues } from "../constants/AppConstants";

export class EmployeePersonalDetailsPage extends BasePage {
    // required fields
    private readonly driverLicenceNumberField: Locator;
    private readonly licenceExpiryDate: Locator;
    private readonly nationalityDropdown: string;
    private readonly maritalStatusDropdown: string;
    private readonly dateOfBirthField: Locator;
    private readonly genderMaleCheckbox: Locator;
    private readonly genderFemaleCheckbox: Locator;
    private readonly requiredSaveButton: Locator;
    // custom fields
    private readonly bloodTypeDropdown: string;
    private readonly testField: Locator;
    private readonly customsaveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.driverLicenceNumberField = page.locator(
            "//label[contains(normalize-space(), 'Driver')]/ancestor::div[2]//input[contains(@class,'oxd-input--active')]",
        );
        this.licenceExpiryDate = page.locator(
            "//label[contains(normalize-space(), 'Expiry')]/ancestor::div[2]//input[contains(@class,'oxd-input--active')]",
        );
        this.nationalityDropdown = "Nationality";
        this.maritalStatusDropdown = "Marital Status";
        this.dateOfBirthField = page.locator(
            "//label[contains(normalize-space(), 'Birth')]/ancestor::div[2]//input[contains(@class,'oxd-input--active')]",
        );
        this.genderMaleCheckbox = page.locator(".oxd-radio-wrapper").first();
        this.genderFemaleCheckbox = page.locator("input[type='radio']").last();
        this.requiredSaveButton = page.locator("//button[normalize-space()='Save']").first();
        this.bloodTypeDropdown = "Blood Type";
        this.testField = page.locator(
            "//label[contains(normalize-space(), 'Test')]/ancestor::div[2]//input[contains(@class,'oxd-input--active')]",
        );
        this.customsaveButton = page.locator("//button[normalize-space()='Save']").last();
    }

    /**
     * This method verifies if user is on correct page
     */
    async isAt(): Promise<void> {
        await this.waitForPageReady({
            readyLocator: this.genderMaleCheckbox,
        });
        await this.isAtPageWithTitle(pageTitleValues.employeesTitle);
    }

    getInputByLabel(label: string) {
        return this.page.locator(
            `//label[normalize-space()="${label}"]/ancestor::div[2]/*[2]/*/*/input`,
        );
    }

    /**
     * Fills the Drivers licence input field.
     */
    async fillDriverLicence(driversLicence: string): Promise<void> {
        await this.waitForPageReady({ readyLocator: this.customsaveButton, timeout: 10000 });
        await this.actions.fill(
            this.driverLicenceNumberField,
            driversLicence,
            "Drivers licence input",
        );
    }

    /**
     * Fills the Licence expiry date input field.
     */
    async fillLicenceExpiryDate(licenceExpiryDate: string): Promise<void> {
        await this.actions.fill(
            this.licenceExpiryDate,
            licenceExpiryDate,
            "Licence expiry date input",
        );
    }

    /**
     * Selects option from the Nationality dropdown
     */
    async selectNationality(option: string): Promise<void> {
        await this.selectOptionsFromDropdown(this.nationalityDropdown, option);
    }

    /**
     * Selects option from the Marital Status dropdown
     */
    async selectMaritalStatus(option: string): Promise<void> {
        await this.selectOptionsFromDropdown(this.maritalStatusDropdown, option);
    }

    /**
     * Fills the Date of birth input field.
     */
    async fillDateOfBirth(dateOfBirth: string): Promise<void> {
        await this.actions.fill(this.dateOfBirthField, dateOfBirth, "Date of birth input");
    }

    /**
     * Clicks the Gender Male checkbox.
     */
    async clickMaleCheckbox(): Promise<void> {
        await this.actions.click(this.genderMaleCheckbox, "Gender Male checkbox");
    }

    /**
     * Clicks the Gender Female checkbox.
     */
    async clickFemaleCheckbox(): Promise<void> {
        await this.actions.click(this.genderFemaleCheckbox, "Gender Female checkbox");
    }

    /**
     * Clicks the Required section Save button.
     */
    async clickRequiredSave(): Promise<void> {
        await this.actions.click(this.requiredSaveButton, "Required Save button");
    }

    /**
     * Selects option from the Blood type dropdown
     */
    async selectBloodType(option: string): Promise<void> {
        await this.selectOptionsFromDropdown(this.bloodTypeDropdown, option);
    }

    /**
     * Fills the Test_field input field.
     */
    async fillTestField(testField: string): Promise<void> {
        await this.actions.fill(this.testField, testField, "Test_field input");
    }

    /**
     * Clicks the Custom section Save button.
     */
    async clickCustomSave(): Promise<void> {
        await this.actions.click(this.customsaveButton, "Custom Save button");
    }
}
