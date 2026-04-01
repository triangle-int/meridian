/**
 * Telemetry API routes.
 *
 * GET /telemetry            — HTML dashboard
 * GET /telemetry/requests   — Recent request metrics (JSON)
 * GET /telemetry/summary    — Aggregate statistics (JSON)
 * GET /telemetry/logs       — Diagnostic logs (JSON)
 */
import { Hono } from "hono";
export declare function createTelemetryRoutes(): Hono<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/">;
//# sourceMappingURL=routes.d.ts.map