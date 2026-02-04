import { test as base } from "@playwright/test";
import { LoginHelper } from "../helpers/ui/LoginHelper";
import { DashboardPage } from "../pages/DashboardPage";

type AuthFixtures = {
    loggedInAdmin: void;
};

export const test = base.extend<AuthFixtures>({
    loggedInAdmin: async ({ page }, use) => {
        const loginHelper = new LoginHelper(page);
        const dashboardPage = new DashboardPage(page);

        console.log("🔐 Logging in as admin (fixture)");

        await loginHelper.loginUser(process.env.ORANGE_USERNAME!, process.env.ORANGE_PASSWORD!);

        await dashboardPage.isAt();

        console.log("✅ User logged in and dashboard is ready");

        await use();
    },
});
