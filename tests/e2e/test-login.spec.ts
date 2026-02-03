import { test } from "@playwright/test";
import { LoginHelper } from "../../helpers/ui/LoginHelper";

let loginHelper: LoginHelper;

test.beforeEach(async ({ page }) => {
    loginHelper = new LoginHelper(page);
});

test.describe("Login test", () => {
    test("@smoke Login user with valid data", async () => {
        await test.step("Navigate user to login page and fill the login form with valid data", async () => {
            await loginHelper.loginUser(process.env.ORANGE_USERNAME!, process.env.ORANGE_PASSWORD!);
        });

        await test.step("Validate user login", async () => {
            await loginHelper.validateUserLogin();
        });
    });
});
