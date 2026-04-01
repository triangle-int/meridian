/**
 * Dynamic MCP tool registration for passthrough mode.
 *
 * In passthrough mode, OpenCode's tools need to be real callable tools
 * (not just text descriptions in the prompt). We create an MCP server
 * that registers each tool from OpenCode's request with the exact
 * name and schema, so Claude generates proper tool_use blocks.
 *
 * Tool handlers are no-ops — the PreToolUse hook blocks execution.
 * We just need the definitions so Claude can call them.
 */
export declare const PASSTHROUGH_MCP_NAME = "oc";
export declare const PASSTHROUGH_MCP_PREFIX = "mcp__oc__";
/**
 * Create an MCP server with tool definitions matching OpenCode's request.
 */
export declare function createPassthroughMcpServer(tools: Array<{
    name: string;
    description?: string;
    input_schema?: any;
}>): {
    server: import("@anthropic-ai/claude-agent-sdk").McpSdkServerConfigWithInstance;
    toolNames: string[];
};
/**
 * Strip the MCP prefix from a tool name to get the OpenCode tool name.
 * e.g., "mcp__oc__todowrite" → "todowrite"
 */
export declare function stripMcpPrefix(toolName: string): string;
//# sourceMappingURL=passthroughTools.d.ts.map