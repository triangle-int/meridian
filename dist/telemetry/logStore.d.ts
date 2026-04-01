/**
 * In-memory ring buffer for diagnostic log messages.
 *
 * Captures session management events (compaction, undo, diverged, resume)
 * and surfaces them via the telemetry API and dashboard. Replaces the need
 * for users to dig through stderr to report issues.
 */
export interface DiagnosticLog {
    /** Unix timestamp */
    timestamp: number;
    /** Log level */
    level: "info" | "warn" | "error";
    /** Log category for filtering */
    category: "session" | "lineage" | "error" | "lifecycle";
    /** Request ID (if associated with a request) */
    requestId?: string;
    /** Human-readable message */
    message: string;
}
export declare class DiagnosticLogStore {
    private buffer;
    private head;
    private count;
    private readonly capacity;
    constructor(capacity?: number);
    /** Append a log entry. */
    log(entry: Omit<DiagnosticLog, "timestamp">): void;
    /** Convenience: log a session event. */
    session(message: string, requestId?: string): void;
    /** Convenience: log a lineage event (compaction, undo, diverged). */
    lineage(message: string, requestId?: string): void;
    /** Convenience: log an error. */
    error(message: string, requestId?: string): void;
    /**
     * Retrieve recent logs, newest first.
     * @param options.limit - Max entries (default: 100)
     * @param options.since - Only entries after this timestamp
     * @param options.category - Filter by category
     */
    getRecent(options?: {
        limit?: number;
        since?: number;
        category?: string;
    }): DiagnosticLog[];
    /** Clear all stored logs. */
    clear(): void;
}
/** Singleton instance used by the proxy. */
export declare const diagnosticLog: DiagnosticLogStore;
//# sourceMappingURL=logStore.d.ts.map