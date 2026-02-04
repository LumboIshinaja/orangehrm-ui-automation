const WEB_ROOT = "/web/index.php";

export const routes = {
    auth: {
        login: `${WEB_ROOT}/auth/login`,
    },
    dashboard: {
        overview: `${WEB_ROOT}/dashboard/index`,
    },
    employeeList: {
        pim: `${WEB_ROOT}/pim/viewEmployeeList`,
    },
    addEmployee: {
        pim: `${WEB_ROOT}/pim/addEmployee`,
    },
} as const;
