/**
 * In-memory ring buffer for telemetry metrics.
 *
 * Append-only, fixed capacity, oldest entries overwritten.
 * No disk I/O in the hot path. Data resets on proxy restart.
 */
import type { RequestMetric, TelemetrySummary } from "./types";
export declare class TelemetryStore {
    private buffer;
    private head;
    private count;
    private readonly capacity;
    constructor(capacity?: number);
    /** Record a completed request metric. */
    record(metric: RequestMetric): void;
    /** Get the total number of stored metrics. */
    get size(): number;
    /**
     * Retrieve recent metrics, newest first.
     * @param options.limit - Max entries to return (default: 50)
     * @param options.since - Only entries after this timestamp
     * @param options.model - Filter by model name
     */
    getRecent(options?: {
        limit?: number;
        since?: number;
        model?: string;
    }): RequestMetric[];
    /**
     * Compute aggregate statistics over a time window.
     * @param windowMs - Time window in ms (default: 1 hour)
     */
    summarize(windowMs?: number): TelemetrySummary;
    /** Clear all stored metrics. */
    clear(): void;
}
/** Singleton store instance used by the proxy. */
export declare const telemetryStore: TelemetryStore;
//# sourceMappingURL=store.d.ts.map