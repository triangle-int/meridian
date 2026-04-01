/**
 * Tool blocking lists and MCP tool configuration.
 *
 * NOTE: These lists are currently OpenCode-specific. When the adapter pattern
 * is implemented, these will move into the OpenCode adapter and become
 * configurable per-agent. See DEFERRED.md.
 */
/**
 * Block SDK built-in tools so Claude only uses MCP tools
 * (which have correct param names for the calling agent).
 */
export declare const BLOCKED_BUILTIN_TOOLS: string[];
/**
 * Claude Code SDK tools that have NO equivalent in the calling agent (OpenCode).
 * Only block these — everything else either has an agent equivalent
 * or is handled by the agent's own tool system.
 *
 * Tools where the agent has an equivalent but with a DIFFERENT name/schema
 * are blocked so Claude uses the agent's version instead of the SDK's.
 */
export declare const CLAUDE_CODE_ONLY_TOOLS: string[];
/** MCP server name used by the calling agent */
export declare const MCP_SERVER_NAME = "opencode";
/** MCP tools that are allowed through the proxy's tool filter */
export declare const ALLOWED_MCP_TOOLS: string[];
//# sourceMappingURL=tools.d.ts.map