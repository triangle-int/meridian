/**
 * Message parsing and normalization utilities.
 */

/**
 * Strip cache_control from a content block (or nested blocks).
 * cache_control is ephemeral metadata that agents add/remove between requests;
 * it must not affect content hashing or lineage verification.
 */
function stripCacheControlForHashing(obj: any): any {
  if (!obj || typeof obj !== "object") return obj
  if (Array.isArray(obj)) return obj.map(stripCacheControlForHashing)
  const { cache_control, ...rest } = obj
  return rest
}

/**
 * Normalize message content to a string for hashing and comparison.
 * Handles both string content and array content (Anthropic content blocks).
 * Strips cache_control metadata to ensure hash stability across requests.
 *
 * NOTE: OpenCode sends content as a string on the first request but as
 * an array on subsequent ones. This normalizer handles both formats.
 * Other agents may behave differently — this will move to the adapter pattern.
 */
export function normalizeContent(content: any): string {
  if (typeof content === "string") return content
  if (Array.isArray(content)) {
    return content.map((block: any) => {
      if (block.type === "text" && block.text) return block.text
      if (block.type === "tool_use") return `tool_use:${block.id}:${block.name}:${JSON.stringify(block.input)}`
      if (block.type === "tool_result") {
        const inner = block.content
        if (typeof inner === "string") return `tool_result:${block.tool_use_id}:${inner}`
        // Strip cache_control from nested content blocks before serializing
        return `tool_result:${block.tool_use_id}:${JSON.stringify(stripCacheControlForHashing(inner))}`
      }
      // Unknown block types: strip cache_control before serializing
      return JSON.stringify(stripCacheControlForHashing(block))
    }).join("\n")
  }
  return String(content)
}

/**
 * Extract only the last user message (for session resume — SDK already has history).
 */
export function getLastUserMessage(messages: Array<{ role: string; content: any }>): Array<{ role: string; content: any }> {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i]?.role === "user") return [messages[i]!]
  }
  return messages.slice(-1)
}
