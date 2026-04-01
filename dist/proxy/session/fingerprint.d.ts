/**
 * Conversation fingerprinting and client working directory extraction.
 *
 * NOTE: extractClientCwd is OpenCode-specific (parses <env> blocks).
 * When the adapter pattern is implemented, this will move to the
 * OpenCode adapter. getConversationFingerprint is agent-agnostic.
 */
/**
 * Extract the client's working directory from the system prompt.
 * OpenCode embeds it inside an <env> block:
 *   <env>
 *     Working directory: /path/to/project
 *     ...
 *   </env>
 *
 * Returns the path if found, or undefined to fall back to server defaults.
 */
export declare function extractClientCwd(body: any): string | undefined;
/**
 * Hash the first user message + working directory to fingerprint a conversation.
 * Used to find a cached session when no session header is present.
 * Includes workingDirectory (stable per project, unlike systemContext which
 * contains dynamic file trees/diagnostics that change every request).
 * This prevents cross-project collisions when different projects start
 * with the same first message.
 */
export declare function getConversationFingerprint(messages: Array<{
    role: string;
    content: any;
}>, workingDirectory?: string): string;
//# sourceMappingURL=fingerprint.d.ts.map