import { expect } from "@playwright/test";

export class Assertions {
    /**
     * Normalizes text by trimming, collapsing whitespace,
     * and removing non-printable symbols.
     */
    static normalizeText(text: string): string {
        return text
            .replace(/\s+/g, " ")
            .replace(/[^\p{L}\p{N}\p{P}\p{Zs}]/gu, "")
            .trim();
    }

    /**
     * Asserts that two strings match after normalization.
     */
    static expectNormalizedText(actual: string, expected: string): void {
        const normalizedActual = this.normalizeText(actual);

        expect(normalizedActual).toBe(expected);
    }
}
