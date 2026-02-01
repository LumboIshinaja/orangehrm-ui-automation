import { faker } from "@faker-js/faker";

export class DataGenerator {
    static email(): string {
        return faker.internet.email().toLowerCase();
    }

    static username(): string {
        return faker.internet.username().toLowerCase();
    }

    static password(length = 12): string {
        return faker.internet.password({ length });
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
