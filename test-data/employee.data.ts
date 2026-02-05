import { DataGenerator } from "../utils/DataGenerator";

export type EmployeeData = {
    firstName: string;
    middleName?: string;
    lastName: string;
    username: string;
    password: string;
};

export function createEmployeeData() {
    return {
        firstName: DataGenerator.firstName(),
        lastName: DataGenerator.lastName(),
        username: DataGenerator.username(),
        password: DataGenerator.password(),
    };
}
