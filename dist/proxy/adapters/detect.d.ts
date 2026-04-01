/**
 * Agent adapter detection.
 *
 * Inspects the incoming request to select the appropriate AgentAdapter.
 * Falls back to the OpenCode adapter for backward compatibility.
 */
import type { Context } from "hono";
import type { AgentAdapter } from "../adapter";
/**
 * Detect which agent adapter to use based on request headers.
 *
 * Detection rules (evaluated in order):
 * 1. User-Agent starts with "factory-cli/"  → Droid adapter
 * 2. User-Agent starts with "Charm-Crush/"  → Crush adapter
 * 3. Default                                → OpenCode adapter (backward compatible)
 */
export declare function detectAdapter(c: Context): AgentAdapter;
//# sourceMappingURL=detect.d.ts.map