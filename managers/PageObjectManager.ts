import { Page } from "@playwright/test";

export class PageObjectManager {
    private readonly pageInstances = new Map<Function, unknown>();

    constructor(readonly page: Page) {}

    /**
     * Lazily instantiates and returns a page object.
     * Reuses the instance on subsequent calls.
     */
    getPage<T>(pageClass: new (page: Page) => T): T {
        if (!this.pageInstances.has(pageClass)) {
            this.pageInstances.set(pageClass, new pageClass(this.page));
        }
        return this.pageInstances.get(pageClass) as T;
    }

    /**
     * Clears cached page instances (optional utility).
     */
    reset(): void {
        this.pageInstances.clear();
    }
}
