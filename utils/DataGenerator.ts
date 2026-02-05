import { faker } from "@faker-js/faker";

export class DataGenerator {
    static email(): string {
        return faker.internet.email().toLowerCase();
    }

    static username(): string {
        return faker.internet.username().toLowerCase();
    }

    static password(length = 12): string {
        if (length < 4) {
            throw new Error("Password length must be at least 4");
        }

        const lower = faker.string.alpha({ length: 1, casing: "lower" });
        const upper = faker.string.alpha({ length: 1, casing: "upper" });
        const digit = faker.number.int({ min: 0, max: 9 }).toString();

        const remainingLength = length - 3;

        const remaining = faker.internet.password({
            length: remainingLength,
            memorable: false,
            pattern: /[A-Za-z!@#$%^&*]/,
        });

        const password = faker.helpers
            .shuffle([lower, upper, digit, ...remaining.split("")])
            .join("");

        return password;
    }

    static firstName(): string {
        return faker.person.firstName();
    }

    static lastName(): string {
        return faker.person.lastName();
    }

    static sentence(words = 5): string {
        return faker.lorem.words(words);
    }

    static paragraph(paragraphs = 1): string {
        return faker.lorem.paragraphs(paragraphs);
    }

    static numericString(length = 6): string {
        return faker.string.numeric(length);
    }
}
