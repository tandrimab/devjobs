import { useLayoutEffect, useState } from "react";


export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateSize() {
            setWindowSize([window.innerWidth, window.innerHeight]);
        }
        updateSize();

        window.addEventListener('resize', updateSize);
        
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return windowSize;
}