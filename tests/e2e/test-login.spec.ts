import { test } from "@playwright/test";
import { LoginHelper } from "../../helpers/LoginHelper";

test.describe("Login flow", () => {
    test("User can submit login form with valid credentials", async ({ page }) => {
        const loginHelper = new LoginHelper(page);

        await test.step("Login user with valid credentials", async () => {
            await loginHelper.loginUser(process.env.ORANGE_USERNAME!, process.env.ORANGE_PASSWORD!);
        });
    });
});
