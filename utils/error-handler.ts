/**
 * Handles unknown errors in a consistent and type-safe way.
 *
 * Logs contextual information and rethrows the original error
 * to preserve the original stack trace.
 *
 * Intended for use inside catch blocks.
 */
export function handleError(error: unknown, contextMessage: string): never {
    if (error instanceof Error) {
        console.error(`❌ ${contextMessage}`);
        console.error(error);

        // Preserve original error & stack
        throw error;
    }

    console.error(`❌ ${contextMessage}`);
    console.error("Unknown error type:", error);

    throw new Error(`${contextMessage}. Unknown error: ${safeToString(error)}`);
}

function safeToString(value: unknown): string {
    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
}
