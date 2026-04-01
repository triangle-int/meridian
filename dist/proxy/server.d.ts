import type { ProxyConfig, ProxyInstance, ProxyServer } from "./types";
export type { ProxyConfig, ProxyInstance, ProxyServer };
import { computeLineageHash, hashMessage, computeMessageHashes, type LineageResult } from "./session/lineage";
import { clearSessionCache, getMaxSessionsLimit } from "./session/cache";
export { computeLineageHash, hashMessage, computeMessageHashes };
export { clearSessionCache, getMaxSessionsLimit };
export type { LineageResult };
export declare function createProxyServer(config?: Partial<ProxyConfig>): ProxyServer;
export declare function startProxyServer(config?: Partial<ProxyConfig>): Promise<ProxyInstance>;
//# sourceMappingURL=server.d.ts.map