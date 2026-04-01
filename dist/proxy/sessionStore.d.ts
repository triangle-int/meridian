/**
 * File-based session store for cross-proxy session resume.
 *
 * When running per-terminal proxies (each on a different port),
 * sessions need to be shared so you can resume a conversation
 * started in one terminal from another. This stores session
 * mappings in a JSON file that all proxy instances read/write.
 *
 * Format: { [key]: { claudeSessionId, createdAt, lastUsedAt } }
 * Keys are either OpenCode session IDs or conversation fingerprints.
 */
export interface StoredSession {
    claudeSessionId: string;
    createdAt: number;
    lastUsedAt: number;
    messageCount: number;
    /** Hash of messages[0..messageCount-1] for conversation lineage verification */
    lineageHash?: string;
    /** Per-message content hashes for precise diff-based compaction detection */
    messageHashes?: string[];
    /** Per-message SDK assistant UUIDs for undo rollback (null for user messages) */
    sdkMessageUuids?: Array<string | null>;
}
/** Set an explicit session store directory. Takes priority over env var.
 *  Pass null to clear. For testing only.
 *  @param opts.skipLocking — skip file locking (default true for test isolation) */
export declare function setSessionStoreDir(dir: string | null, opts?: {
    skipLocking?: boolean;
}): void;
export declare function lookupSharedSession(key: string): StoredSession | undefined;
export declare function storeSharedSession(key: string, claudeSessionId: string, messageCount?: number, lineageHash?: string, messageHashes?: string[], sdkMessageUuids?: Array<string | null>): void;
/** Remove a single session from the shared file store.
 *  Used when a session is detected as stale (e.g. expired upstream). */
export declare function evictSharedSession(key: string): void;
export declare function clearSharedSessions(): void;
//# sourceMappingURL=sessionStore.d.ts.map