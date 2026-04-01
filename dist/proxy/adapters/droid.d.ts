/**
 * Droid (Factory AI) agent adapter.
 *
 * Provides Droid-specific behavior for session tracking, working directory
 * extraction, content normalization, and tool configuration.
 *
 * Authentication: Droid connects via BYOK (Bring Your Own Key) by setting
 * provider="anthropic" and baseUrl pointing to this proxy in
 * ~/.factory/settings.json customModels.
 *
 * Key differences from OpenCode:
 * - No session header: relies on fingerprint-based session caching
 * - CWD in <system-reminder> blocks inside user messages (not <env> in system)
 * - No subagent routing: Droid manages its own subagents internally
 * - MCP server name: "droid"
 */
import type { AgentAdapter } from "../adapter";
export declare const droidAdapter: AgentAdapter;
//# sourceMappingURL=droid.d.ts.map