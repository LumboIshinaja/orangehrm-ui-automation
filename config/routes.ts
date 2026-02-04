export const routes = {
    auth: {
        login: "/auth/login",
    },

    dashboard: {
        overview: "/dashboard/index",
    },

    pim: {
        employeeList: "/pim/viewEmployeeList",
        addEmployee: "/pim/addEmployee",
    },
} as const;
