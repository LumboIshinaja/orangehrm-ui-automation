import { Locator, Page } from "@playwright/test";
import { handleError } from "../utils/error-handler";

/**
 * BaseActions provides wrapped Playwright interactions with
 * built-in waiting, logging, and centralized error handling.
 *
 * This class is intended to be composed by BasePage and reused
 * across all page objects to ensure consistent behavior.
 */
export class BaseActions {
    constructor(protected readonly page: Page) {}

    /**
     * Clicks on an element after ensuring it is visible.
     *
     * This method waits for the element to become visible,
     * optionally allows UI animations to settle, and then performs the click.
     *
     * @param locator - Locator of the element to be clicked.
     * @param elementName - Human-readable name of the element for logging.
     * @param timeout - Maximum time to wait for the element to become visible.
     */
    async click(locator: Locator, elementName: string, timeout = 5000): Promise<void> {
        try {
            console.log(`➡️ Clicking on [${elementName}]`);

            await this.waitForVisibility(locator, timeout);
            await this.page.waitForTimeout(200); // allow UI animations to settle
            await locator.click();

            console.log(`✅ Clicked on [${elementName}]`);
        } catch (error) {
            handleError(error, `Failed to click on element [${elementName}]`);
        }
    }

    /**
     * Fills an input field with the provided value after ensuring it is visible.
     *
     * This method is typically used for text inputs and textareas
     * and guarantees the element is interactable before filling.
     *
     * @param locator - Locator of the input element.
     * @param value - Value to be entered into the input field.
     * @param elementName - Human-readable name of the element for logging.
     * @param typingDelay - Delay between keystrokes (default: 30ms).
     * @param timeout - Max time to wait for element visibility (default: 10000ms).
     */
    async fill(
        locator: Locator,
        value: string,
        elementName: string,
        typingDelay: number = 30,
        timeout: number = 5000,
    ): Promise<void> {
        try {
            console.log(`➡️ Filling [${elementName}]`);

            await this.waitForVisibility(locator, timeout);

            await locator.click({ force: true });
            await locator.clear();

            await locator.pressSequentially(value, { delay: typingDelay });

            console.log(`✅ Filled [${elementName}]`);
        } catch (error) {
            handleError(error, `Failed to fill [${elementName}]`);
        }
    }

    /**
     * Hovers over an element after ensuring it is visible.
     *
     * This method is commonly used for triggering tooltips,
     * dropdown menus, or hover-based UI interactions.
     *
     * @param locator - Locator of the element to hover over.
     * @param elementName - Human-readable name of the element for logging.
     * @param timeout - Maximum time to wait for the element to become visible.
     */
    async hover(locator: Locator, elementName: string, timeout = 5000): Promise<void> {
        try {
            console.log(`➡️ Hovering over [${elementName}]`);

            await this.waitForVisibility(locator, timeout);
            await locator.hover();

            console.log(`✅ Hovered over [${elementName}]`);
        } catch (error) {
            handleError(error, `Failed to hover over element [${elementName}]`);
        }
    }

    /**
     * Waits until the specified element becomes visible.
     *
     * This method is intended to be used as a prerequisite
     * before interacting with elements to reduce flakiness.
     *
     * @param locator - Locator of the element to wait for.
     * @param timeout - Maximum time to wait for the element to become visible.
     */
    async waitForVisibility(locator: Locator, timeout = 10000): Promise<void> {
        try {
            await locator.waitFor({ state: "visible", timeout });
            await locator.waitFor({ state: "attached", timeout });
        } catch (error) {
            handleError(error, `Element did not become visible within ${timeout}ms`);
        }
    }

    /**
     * Retrieves and returns the trimmed text content of an element.
     *
     * Ensures the element is visible before attempting to read its content.
     * Returns an empty string if the element has no text.
     *
     * @param locator - Locator of the element whose text is retrieved.
     * @param elementName - Human-readable name of the element for logging.
     * @param timeout - Maximum time to wait for the element to become visible.
     * @returns Trimmed text content of the element.
     */
    async getText(locator: Locator, elementName: string, timeout = 5000): Promise<string> {
        try {
            console.log(`➡️ Getting text from [${elementName}]`);

            await this.waitForVisibility(locator, timeout);
            const text = (await locator.textContent())?.trim() ?? "";

            console.log(`📄 Text from [${elementName}]: "${text}"`);
            return text;
        } catch (error) {
            handleError(error, `Failed to get text from element [${elementName}]`);
        }
    }
}
