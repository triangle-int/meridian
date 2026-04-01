/**
 * File change tracking for both internal and passthrough modes.
 *
 * Internal mode: PostToolUse hooks capture MCP tool executions (write/edit).
 * Passthrough mode: Scans body.messages for client-side tool_use blocks.
 *
 * This is a leaf module — no imports from server.ts or session/.
 */
/** A recorded file operation from an MCP tool execution. */
export interface FileChange {
    /** The operation type: "wrote" or "edited" */
    operation: "wrote" | "edited";
    /** The file path from the tool input */
    path: string;
}
/**
 * Extract a FileChange from a PostToolUse hook input, if applicable.
 *
 * Only tracks write and edit operations — read/glob/grep are read-only.
 * Returns undefined for non-file-changing tools.
 *
 * @param toolName - The full MCP tool name (e.g. "mcp__opencode__write")
 * @param toolInput - The tool's input parameters
 * @param mcpPrefix - The MCP prefix to match (e.g. "mcp__opencode__")
 */
export declare function extractFileChange(toolName: string, toolInput: unknown, mcpPrefix: string): FileChange | undefined;
/**
 * Create a PostToolUse hook matcher that captures file changes.
 *
 * The hook pushes FileChange entries into the provided array.
 * The caller (server.ts) reads this array after the SDK completes
 * to inject a summary into the response.
 *
 * @param changes - Mutable array to push changes into (shared with caller)
 * @param mcpPrefix - The MCP prefix for this adapter (e.g. "mcp__opencode__")
 */
export declare function createFileChangeHook(changes: FileChange[], mcpPrefix: string): {
    matcher: string;
    hooks: ((input: {
        tool_name: string;
        tool_input: unknown;
        tool_response: unknown;
        tool_use_id: string;
    }) => Promise<{}>)[];
};
/**
 * Extract file paths from a bash command string by detecting output redirects
 * and common file-mutating commands (sed -i, tee, cp, mv).
 *
 * This is a best-effort heuristic — it won't catch every possible way bash
 * can write files, but it handles the patterns coding agents use most often.
 *
 * @param command - The bash command string
 */
export declare function extractFileChangesFromBash(command: string): FileChange[];
/**
 * Extract file changes from conversation history (passthrough mode).
 *
 * In passthrough mode the SDK doesn't execute tools — the client does.
 * The conversation history in body.messages contains assistant tool_use
 * blocks from completed tool loops. We scan these to build the file
 * change list.
 *
 * Only scans tool_use blocks that have a corresponding tool_result
 * (i.e., the tool was actually executed, not just proposed).
 *
 * @param messages - The body.messages array from the request
 * @param extractFn - Adapter's extractFileChangesFromToolUse method
 */
export declare function extractFileChangesFromMessages(messages: Array<{
    role: string;
    content: unknown;
}>, extractFn: (toolName: string, toolInput: unknown) => FileChange[]): FileChange[];
/**
 * Format file changes into a human-readable summary string.
 *
 * Deduplicates by path+operation and returns a newline-separated list.
 * Returns undefined if no changes to report.
 *
 * @param changes - Array of recorded file changes
 */
export declare function formatFileChangeSummary(changes: FileChange[]): string | undefined;
//# sourceMappingURL=fileChanges.d.ts.map