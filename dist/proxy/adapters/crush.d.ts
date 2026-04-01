/**
 * Crush (Charm) agent adapter.
 *
 * Provides Crush-specific behavior for session tracking, content normalization,
 * and tool configuration.
 *
 * Crush connects via a provider entry in ~/.config/crush/crush.json using
 * type "anthropic" with base_url pointing at this proxy. No special auth
 * or BYOK mechanism — just a base_url override.
 *
 * Key characteristics:
 * - User-Agent: Charm-Crush/<version>
 * - Always streams (stream: true)
 * - 19 lowercase tool names (bash, edit, write, grep, ls, etc.)
 * - No session header: relies on fingerprint-based session cache
 * - No CWD in request body: falls back to CLAUDE_PROXY_WORKDIR or process.cwd()
 * - Manages its own tool execution loop: passthrough mode is appropriate
 * - System prompt sent as a list in the `system` field (not embedded in messages)
 */
import type { AgentAdapter } from "../adapter";
export declare const crushAdapter: AgentAdapter;
//# sourceMappingURL=crush.d.ts.map