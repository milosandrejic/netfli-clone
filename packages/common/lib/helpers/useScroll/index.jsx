import {useEffect, useState} from "react";

export const useScroll = (distance) => {
    const [result, setResult] = useState({
        distance: 0,
        scrolled: false
    });

    const handleScroll = () => {
        setResult({
            distance: window.scrollY,
            scrolled: window.scrollY > distance
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [distance]);

    return result;
};
