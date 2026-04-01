/**
 * Fuzzy matching for agent names.
 *
 * When Claude sends an invalid subagent_type, this tries to map it
 * to the closest valid agent name. This is deterministic string matching,
 * not LLM guessing.
 *
 * Matching priority:
 * 1. Exact match (case-insensitive)
 * 2. Known aliases (e.g., "general-purpose" → "general")
 * 3. Prefix match (e.g., "lib" → "librarian")
 * 4. Substring match (e.g., "junior" → "sisyphus-junior")
 * 5. Suffix-stripped match (e.g., "explore-agent" → "explore")
 * 6. Semantic aliases (e.g., "search" → "explore")
 * 7. Fallback: return lowercased original
 */
export declare function fuzzyMatchAgentName(input: string, validAgents: string[]): string;
//# sourceMappingURL=agentMatch.d.ts.map