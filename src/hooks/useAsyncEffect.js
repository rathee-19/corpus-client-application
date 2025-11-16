import { useEffect } from 'react';
/**
 * hook that wraps a callback function inside
 * useEffect hook, triggered everytime dependencies change
 * @param callback callback
 * @param deps dependences
 */
export default function useAsyncEffect(callback, deps = []) {
    useEffect(() => {
        callback().catch(e => console.log('useAsyncEffect error:', e));
    }, deps);
}
