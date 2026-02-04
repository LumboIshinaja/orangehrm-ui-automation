import { test } from "../../fixtures/auth.fixture";
import { EmployeeHelper } from "../../helpers/ui/EmployeeHelper";

test.describe("Employee management", () => {
    test("@smoke Create employee", async ({ page, loggedInAdmin }) => {
        void loggedInAdmin;
        const employeeHelper = new EmployeeHelper(page);

        await employeeHelper.createEmployee({
            firstName: "John",
            lastName: "Doe",
            username: "john.doe",
            password: "Password123!",
        });
    });
});
