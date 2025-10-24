/*

Hash Table implementation in TypeScript
    how hash table works:
    - A hash table is a data structure that maps keys to values for highly efficient lookup.
    - It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.
    - Insertion, deletion, and lookup operations can be performed in average-case constant time O(1).
    - However, in the worst case (e.g., many collisions), these operations can degrade to O(n).

*/
export class HashTable<K, V> {
    private table: Array<Array<[K, V]>>;
    private size: number;
    private capacity: number;

    constructor(capacity: number = 16) {
        this.table = Array.from({ length: capacity }, () => []);
        this.size = 0;
        this.capacity = capacity;
    }

    private hash(key: K): number {
        const stringKey = String(key);
        let hash = 0;
        for (let i = 0; i < stringKey.length; i++) {
            hash = (hash << 5) - hash + stringKey.charCodeAt(i);
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash) % this.capacity;
    }

    public insert(key: K, value: V): void {
        const index = this.hash(key);
        if (!this.table[index]) {
            this.table[index] = [];
        }
        const bucket = this.table[index];
        
        // Check if key already exists
        const existingPair = bucket.find(pair => pair[0] === key);
        if (existingPair) {
            existingPair[1] = value; // Update value
        } else {
            bucket.push([key, value]); // Add new key-value pair
            this.size++;
        }
    }
    public get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.table[index];
        if (!bucket) return undefined;
        const pair = bucket.find(pair => pair[0] === key);
        return pair ? pair[1] : undefined;
    }
    public remove(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.table[index];
        if (!bucket) return false;
        const pairIndex = bucket.findIndex(pair => pair[0] === key);
        
        if (pairIndex !== -1) {
            bucket.splice(pairIndex, 1);
            this.size--;
            return true;
        }
        return false;
    }
    public contains(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.table[index];
        return bucket ? bucket.some(pair => pair[0] === key) : false;
    }

    public getSize(): number {
        return this.size;
    }

    public clear(): void {
        this.table = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }
}



