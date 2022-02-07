import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

import {
    Navigation
} from "common/components";

const sections = [
    {
        title: "Home",
        route: "/"
    },
    {
        title: "TV Shows",
        route: "/tv-shows"
    },
    {
        title: "Movies",
        route: "/movies"
    },
    {
        title: "New & Popular",
        route: "/new&popular"
    },
    {
        title: "My List",
        route: "/favorites"
    }
];

export default () => {
    const history = useHistory();

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        history.push(sections[selectedIndex].route);
    }, [selectedIndex]);

    return (
        <Navigation
            sections={sections}
            selected={selectedIndex}
            onChange={setSelectedIndex}
        />
    );
};
