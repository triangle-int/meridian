/**
 * Session lineage verification.
 *
 * Pure functions for hashing messages and classifying mutations
 * (continuation, compaction, undo, diverged).
 */
/** Minimum suffix overlap (stored messages found at the end of incoming)
 *  required to classify a mutation as compaction rather than a branch. */
export declare const MIN_SUFFIX_FOR_COMPACTION = 2;
export interface SessionState {
    claudeSessionId: string;
    lastAccess: number;
    messageCount: number;
    /** Hash of messages[0..messageCount-1] for fast-path lineage verification.
     *  When the full prefix matches, the conversation is a strict continuation
     *  and we skip the per-message diff entirely. */
    lineageHash: string;
    /** Per-message content hashes from the last stored request.
     *  Used for precise diff-based mutation classification when the aggregate
     *  lineageHash mismatches. */
    messageHashes?: string[];
    /** SDK assistant message UUIDs indexed by message position.
     *  Only assistant messages have UUIDs (user messages are null).
     *  Used to find the rollback point for undo. */
    sdkMessageUuids?: Array<string | null>;
}
/**
 * Result of lineage verification — classifies the mutation and provides
 * the information needed to take the correct SDK action.
 */
export type LineageResult = {
    type: "continuation";
    session: SessionState;
} | {
    type: "compaction";
    session: SessionState;
} | {
    type: "undo";
    session: SessionState;
    prefixOverlap: number;
    rollbackUuid: string | undefined;
} | {
    type: "diverged";
};
/**
 * Compute a lineage hash of an ordered message array.
 * Used as a fast-path check: if the aggregate hash matches, the messages
 * are an exact prefix-extension and we skip the per-message diff.
 */
export declare function computeLineageHash(messages: Array<{
    role: string;
    content: any;
}>): string;
/**
 * Compute a content hash for a single message (role + normalised content).
 * Used to build per-message hash arrays for precise diff-based verification.
 */
export declare function hashMessage(message: {
    role: string;
    content: any;
}): string;
/**
 * Compute per-message hashes for an entire message array.
 */
export declare function computeMessageHashes(messages: Array<{
    role: string;
    content: any;
}>): string[];
/**
 * Measure how many stored hashes match from the START of the stored array
 * against the incoming hashes (order-preserving).
 *
 * Prefix overlap means the beginning of the conversation is intact (undo
 * changes the end but preserves the beginning).
 */
export declare function measurePrefixOverlap(storedHashes: string[], incomingSet: Set<string>): number;
/**
 * Measure how many stored hashes match from the END of the stored array
 * against the incoming hashes (order-preserving).
 *
 * Suffix overlap means the recent conversation is intact (compaction
 * changes the beginning but preserves the end).
 */
export declare function measureSuffixOverlap(storedHashes: string[], incomingSet: Set<string>): number;
/** Cache-like interface for verifyLineage — only needs get/set/delete */
export interface SessionCacheLike {
    delete(key: string): boolean;
}
/**
 * Verify that incoming messages are a valid continuation of a cached session.
 * Uses per-message hash comparison to deterministically classify mutations.
 *
 * Decision matrix:
 *   Full prefix match (fast-path)          → continuation (resume normally)
 *   Suffix overlap >= MIN_SUFFIX           → compaction   (resume normally)
 *   Prefix overlap > 0, no suffix          → undo         (fork at rollback point)
 *   No overlap                             → diverged     (start fresh)
 */
export declare function verifyLineage(cached: SessionState, messages: Array<{
    role: string;
    content: any;
}>, cacheKey: string, cache: SessionCacheLike): LineageResult;
//# sourceMappingURL=lineage.d.ts.map