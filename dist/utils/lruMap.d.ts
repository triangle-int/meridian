/**
 * A Map with LRU (Least Recently Used) eviction.
 *
 * Entries are evicted oldest-first when the map exceeds maxSize.
 * Both get() and set() refresh an entry's recency.
 * An optional onEvict callback fires when entries are automatically evicted.
 *
 * Note: delete() does NOT fire onEvict — only automatic eviction from set() does.
 */
export declare class LRUMap<K, V> implements Iterable<[K, V]> {
    private readonly maxSize;
    private readonly onEvict?;
    private readonly map;
    constructor(maxSize: number, onEvict?: ((key: K, value: V) => void) | undefined);
    get size(): number;
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    has(key: K): boolean;
    delete(key: K): boolean;
    clear(): void;
    entries(): MapIterator<[K, V]>;
    keys(): MapIterator<K>;
    values(): MapIterator<V>;
    forEach(callbackfn: (value: V, key: K, map: LRUMap<K, V>) => void): void;
    [Symbol.iterator](): MapIterator<[K, V]>;
    private evictOldest;
}
//# sourceMappingURL=lruMap.d.ts.map