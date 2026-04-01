/**
 * Message parsing and normalization utilities.
 */
/**
 * Normalize message content to a string for hashing and comparison.
 * Handles both string content and array content (Anthropic content blocks).
 * Strips cache_control metadata to ensure hash stability across requests.
 *
 * NOTE: OpenCode sends content as a string on the first request but as
 * an array on subsequent ones. This normalizer handles both formats.
 * Other agents may behave differently — this will move to the adapter pattern.
 */
export declare function normalizeContent(content: any): string;
/**
 * Extract only the last user message (for session resume — SDK already has history).
 */
export declare function getLastUserMessage(messages: Array<{
    role: string;
    content: any;
}>): Array<{
    role: string;
    content: any;
}>;
//# sourceMappingURL=messages.d.ts.map