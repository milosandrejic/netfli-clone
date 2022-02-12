import React, {useState, useEffect} from "react";
import {
    useHistory,
    useLocation
} from "react-router-dom";

import {
    Navigation
} from "common/components";

const navItems = [
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
    const location = useLocation();

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const index = navItems.findIndex(s => s.route === location.pathname);

        setSelectedIndex(index);
    }, [location.pathname]);

    const onNavItemSelect = (index) => {
        setSelectedIndex(index);
        history.push(navItems[index].route);
    };

    return (
        <Navigation
            items={navItems}
            selected={selectedIndex}
            onChange={onNavItemSelect}
        />
    );
};
