export default function useDebounce(callback, timeout, delay) {
    return function(...args) {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(() => {
            callback(...args);
            timeout.current = null;
        }, delay)
    }
}
