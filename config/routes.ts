const WEB_ROOT = "/web/index.php";

export const routes = {
    auth: {
        login: `${WEB_ROOT}/auth/login`,
    },
} as const;
