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

    test("@smoke Unsuccessful login – username only", async () => {
        await test.step("Submit login form with only username provided", async () => {
            await loginHelper.enterUsername(process.env.ORANGE_USERNAME!);
        });

        await test.step("Validate credentials required error is displayed", async () => {
            await loginHelper.validateCredentialsRequiredError();
        });
    });

    test("@smoke Unsuccessful login – password only", async () => {
        await test.step("Submit login form with only password provided", async () => {
            await loginHelper.enterPassword(process.env.ORANGE_PASSWORD!);
        });

        await test.step("Validate credentials required error is displayed", async () => {
            await loginHelper.validateCredentialsRequiredError();
        });
    });
});
