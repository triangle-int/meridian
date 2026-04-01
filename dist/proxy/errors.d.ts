/**
 * Error classification for SDK errors.
 * Maps raw error messages to structured HTTP error responses.
 */
export interface ClassifiedError {
    status: number;
    type: string;
    message: string;
}
/**
 * Detect specific SDK errors and return helpful messages to the client.
 */
export declare function classifyError(errMsg: string): ClassifiedError;
/**
 * Detect errors caused by stale session/message UUIDs.
 * These happen when the upstream Claude session no longer contains
 * the referenced message (expired, compacted server-side, etc.).
 */
export declare function isStaleSessionError(error: unknown): boolean;
/**
 * Quick check whether an error message indicates a rate limit.
 * Used by server.ts to decide whether to retry with a smaller context window.
 */
export declare function isRateLimitError(errMsg: string): boolean;
//# sourceMappingURL=errors.d.ts.map