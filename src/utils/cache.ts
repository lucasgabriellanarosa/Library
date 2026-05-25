export const CACHE_PREFIX = 'delta-pearl-cache-';

export const cache = {
    get: (key: string) => {
        const cached = localStorage.getItem(CACHE_PREFIX + key);
        if (!cached) return null;
        const { data, timestamp, expires } = JSON.parse(cached);
        if (Date.now() - timestamp > expires) {
            localStorage.removeItem(CACHE_PREFIX + key);
            return null;
        }
        return data;
    },
    set: (key: string, data: any, ttl: number = 1000 * 60 * 60) => {
        localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
            data,
            timestamp: Date.now(),
            expires: ttl
        }));
    }
};