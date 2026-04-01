/**
 * Model mapping and Claude executable resolution.
 */
export type ClaudeModel = "sonnet" | "sonnet[1m]" | "opus" | "opus[1m]" | "haiku";
export interface ClaudeAuthStatus {
    loggedIn?: boolean;
    subscriptionType?: string;
    email?: string;
}
export declare function mapModelToClaudeModel(model: string, subscriptionType?: string | null): ClaudeModel;
/**
 * Strip the [1m] suffix from a model, returning the base variant.
 * Used for fallback when the 1M context window is rate-limited.
 */
export declare function stripExtendedContext(model: ClaudeModel): ClaudeModel;
/**
 * Check whether a model is using extended (1M) context.
 */
export declare function hasExtendedContext(model: ClaudeModel): boolean;
export declare function getClaudeAuthStatusAsync(): Promise<ClaudeAuthStatus | null>;
/**
 * Resolve the Claude executable path asynchronously (non-blocking).
 *
 * Uses a three-tier cache:
 * 1. cachedClaudePath — resolved path, returned immediately on subsequent calls
 * 2. cachedClaudePathPromise — deduplicates concurrent calls during resolution
 * 3. Falls through to resolution logic (SDK cli.js → system `which claude`)
 *
 * The promise is cleared in `finally` to allow retry on failure while
 * cachedClaudePath prevents re-resolution on success.
 */
export declare function resolveClaudeExecutableAsync(): Promise<string>;
/** Reset cached path — for testing only */
export declare function resetCachedClaudePath(): void;
/** Reset cached auth status — for testing only */
export declare function resetCachedClaudeAuthStatus(): void;
/** Expire the auth status cache without clearing lastKnownGoodAuthStatus — for testing only.
 *  This simulates the TTL expiring so the next call re-executes `claude auth status`,
 *  while preserving the "last known good" fallback state. */
export declare function expireAuthStatusCache(): void;
/**
 * Check if an error is a "Controller is already closed" error.
 * This happens when the client disconnects mid-stream.
 */
export declare function isClosedControllerError(error: unknown): boolean;
//# sourceMappingURL=models.d.ts.map