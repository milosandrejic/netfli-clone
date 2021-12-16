import React, {Fragment} from "react";
import styled from "styled-components";

import {
    Spacer,
    Typography
} from "widgets";

import netflixLogo from "./netflix.svg";

const NavWrapper = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    height: 68px;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.1)
    );
`;

const NavStart = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    width: 92px;
    height: 25px;
`;

const NavItem = styled.div`
    margin-left: 20px;
`;

export const Navigation = ({onRouteClick}) => {
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

    return (
        <NavWrapper>
            <NavStart>
                <Logo src={netflixLogo} />

                <Spacer size={25} />

                {
                    sections.map(section =>
                        <Fragment key={section.title}>
                            <NavItem onClick={() => onRouteClick(section.route)}>
                                <Typography>
                                    {
                                        section.title
                                    }
                                </Typography>
                            </NavItem>
                        </Fragment>
                    )
                }
            </NavStart>
        </NavWrapper>
    );
};
