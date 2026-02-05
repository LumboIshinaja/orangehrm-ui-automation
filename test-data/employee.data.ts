import { DataGenerator } from "../utils/DataGenerator";

export type EmployeeData = {
    // Step 1 – basic info
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    password: string;

    // Step 2 – personal details
    driverLicenceNumber: string;
    licenceExpiryDate: string;
    dateOfBirth: string;

    // Step 3 – custom fields
    testField: string;
};

export function createEmployeeData() {
    return {
        firstName: DataGenerator.firstName(),
        middleName: DataGenerator.firstName(),
        lastName: DataGenerator.lastName(),
        username: DataGenerator.username(),
        password: DataGenerator.password(),
        driverLicenceNumber: DataGenerator.numericString(8),
        licenceExpiryDate: "2030-31-12", // yyyy-dd-mm
        dateOfBirth: "1995-20-05", // yyyy-dd-mm

        testField: DataGenerator.sentence(3),
    };
}
