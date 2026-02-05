import { test } from "../../fixtures/auth.fixture";
import { EmployeeHelper } from "../../helpers/ui/EmployeeHelper";
import { createEmployeeData } from "../../test-data/employee.data";

test.describe("Employee management", () => {
    test("@smoke Create employee", async ({ page, loggedInAdmin }) => {
        void loggedInAdmin;
        const employeeHelper = new EmployeeHelper(page);

        const employee = createEmployeeData();

        await employeeHelper.createEmployee(employee);
    });
});
