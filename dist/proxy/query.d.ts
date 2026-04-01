/**
 * SDK query options builder.
 *
 * Centralizes the construction of query() options, eliminating duplication
 * between the streaming and non-streaming paths in server.ts.
 */
import type { AgentAdapter } from "./adapter";
import { createPassthroughMcpServer } from "./passthroughTools";
export interface QueryContext {
    /** The prompt to send (text or async iterable for multimodal) */
    prompt: string | AsyncIterable<any>;
    /** Resolved Claude model name */
    model: string;
    /** Client working directory */
    workingDirectory: string;
    /** System context text (may be empty) */
    systemContext: string;
    /** Path to Claude executable */
    claudeExecutable: string;
    /** Whether passthrough mode is enabled */
    passthrough: boolean;
    /** Whether this is a streaming request */
    stream: boolean;
    /** SDK agent definitions extracted from tool descriptions */
    sdkAgents: Record<string, any>;
    /** Passthrough MCP server (if passthrough mode + tools present) */
    passthroughMcp?: ReturnType<typeof createPassthroughMcpServer>;
    /** Cleaned environment variables (API keys stripped) */
    cleanEnv: Record<string, string | undefined>;
    /** SDK session ID for resume (if continuing a session) */
    resumeSessionId?: string;
    /** Whether this is an undo operation */
    isUndo: boolean;
    /** UUID to rollback to for undo operations */
    undoRollbackUuid?: string;
    /** SDK hooks (PreToolUse etc.) */
    sdkHooks?: any;
    /** The agent adapter providing tool configuration */
    adapter: AgentAdapter;
}
/**
 * Build the options object for the Claude Agent SDK query() call.
 * This is called identically from both streaming and non-streaming paths,
 * with the only difference being `includePartialMessages` for streaming.
 */
export declare function buildQueryOptions(ctx: QueryContext): {
    prompt: string | AsyncIterable<any>;
    options: {
        hooks?: any;
        resumeSessionAt?: string | undefined;
        forkSession?: boolean | undefined;
        resume?: string | undefined;
        agents?: Record<string, any> | undefined;
        plugins: never[];
        env: {
            ENABLE_CLAUDEAI_MCP_SERVERS?: string | undefined;
            ENABLE_TOOL_SEARCH: string;
        };
        allowedTools?: string[] | undefined;
        mcpServers?: {
            oc: import("@anthropic-ai/claude-agent-sdk").McpSdkServerConfigWithInstance;
        } | undefined;
        disallowedTools: string[];
        systemPrompt?: string | {
            type: "preset";
            preset: "claude_code";
            append: string;
        } | undefined;
        includePartialMessages?: boolean | undefined;
        maxTurns: number;
        cwd: string;
        model: string;
        pathToClaudeCodeExecutable: string;
    } | {
        hooks?: any;
        resumeSessionAt?: string | undefined;
        forkSession?: boolean | undefined;
        resume?: string | undefined;
        agents?: Record<string, any> | undefined;
        plugins: never[];
        env: {
            ENABLE_CLAUDEAI_MCP_SERVERS?: string | undefined;
            ENABLE_TOOL_SEARCH: string;
        };
        disallowedTools: string[];
        allowedTools: string[];
        mcpServers: {
            [x: string]: import("@anthropic-ai/claude-agent-sdk").McpSdkServerConfigWithInstance;
            oc?: undefined;
        };
        systemPrompt?: string | {
            type: "preset";
            preset: "claude_code";
            append: string;
        } | undefined;
        includePartialMessages?: boolean | undefined;
        maxTurns: number;
        cwd: string;
        model: string;
        pathToClaudeCodeExecutable: string;
    };
};
//# sourceMappingURL=query.d.ts.map