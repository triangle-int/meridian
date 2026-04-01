/**
 * Create a fresh MCP server instance per request.
 *
 * SDK ≥0.2.81 enforces "one Protocol per transport connection". The internal
 * McpServer holds a Protocol whose connect() throws if reused:
 *   "Already connected to a transport. Call close() before connecting to a
 *    new transport, or use a separate Protocol instance per connection."
 *
 * Each query() call connects its own transport to the MCP server, so sharing
 * a singleton across requests triggers this guard on the second request.
 * Creating a fresh instance avoids the conflict entirely — the same pattern
 * used by createPassthroughMcpServer().
 */
export declare function createOpencodeMcpServer(): import("@anthropic-ai/claude-agent-sdk").McpSdkServerConfigWithInstance;
//# sourceMappingURL=mcpTools.d.ts.map