/**
 * Session cache management.
 *
 * Manages in-memory LRU caches for session and fingerprint lookups,
 * coordinates with the shared file store for cross-proxy session resume.
 */
import { type LineageResult } from "./lineage";
export declare function getMaxSessionsLimit(): number;
/** Clear all session caches (used in tests).
 *  Re-reads MERIDIAN_MAX_SESSIONS / CLAUDE_PROXY_MAX_SESSIONS so tests can override the limit. */
export declare function clearSessionCache(): void;
/** Evict a stale session from all caches and the shared store.
 *  Used when a resume/undo fails because the upstream Claude session is gone. */
export declare function evictSession(sessionId: string | undefined, workingDirectory?: string, messages?: Array<{
    role: string;
    content: any;
}>): void;
/** Look up a cached session by header or fingerprint.
 *  Returns a LineageResult that classifies the mutation and includes the
 *  session state needed for the correct SDK action. */
export declare function lookupSession(sessionId: string | undefined, messages: Array<{
    role: string;
    content: any;
}>, workingDirectory?: string): LineageResult;
/** Store a session mapping with lineage hash and SDK UUIDs for divergence detection.
 *  @param sdkMessageUuids — per-message SDK assistant UUIDs (null for user messages).
 *    If provided, merged with any previously stored UUIDs to build a complete map. */
export declare function storeSession(sessionId: string | undefined, messages: Array<{
    role: string;
    content: any;
}>, claudeSessionId: string, workingDirectory?: string, sdkMessageUuids?: Array<string | null>): void;
//# sourceMappingURL=cache.d.ts.map