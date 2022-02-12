import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
    useScroll
} from "helpers";

import {
    Search
} from "widgets";

import logo from "netflix.svg";

const Wrapper = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 68px;
    width:  100%;
    padding: 0 60px;
    background: linear-gradient(
        to bottom,
        rgb(20, 20, 20) 0%,
        rgb(20, 20, 20) 10%, 
        transparent 100%
    );
    background-size: ${({scrolled}) => scrolled ? "100% 700%" : "100% 100%"};
    transition: all 400ms;
    transition-delay: 100ms;
    letter-spacing: 0.8px;
`;

const NavLeft = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    width: 92px;
    margin-right: 25px;
    cursor: pointer;
    user-select: none;
`;

export const Navigation = ({items, onChange, selected}) => {
    const {scrolled} = useScroll(10);
    const [query, setQuery] = useState("");

    return (
        <Wrapper scrolled={scrolled}>
            <NavLeft>
                <Logo
                    src={logo}
                    onClick={() => onChange(0)}
                />

                {
                    items.map((item, index) =>
                        <NavItem
                            key={item.title}
                            title={item.title}
                            onChange={onChange}
                            selected={selected === index}
                            index={index}
                        />
                    )
                }
            </NavLeft>

            <Search
                value={query}
                onChange={setQuery}
            />
        </Wrapper>
    );
};

Navigation.propTypes = {

    /** Array of navigation items which will be rendered as navigation items */
    items: PropTypes.arrayOf(PropTypes.object).isRequired,

    /** Function which will be triggered when user clicks on one of navigation items */
    onChange: PropTypes.func.isRequired,

    /** Index of selected item which will be higlighted */
    selected: PropTypes.number.isRequired
};

const NavItemWrapper = styled.p`
    position: relative;
    font-family: ${({theme}) => theme.font};
    font-size: 13px;
    font-weight: ${({selected}) => selected ? 600 : 300};
    color: ${({selected, theme}) => selected ? theme.foreground : theme.gray700};
    cursor: pointer;
    user-select: none;
    margin-left: 20px;
    transition: color .4s;

    &::after {
        display: block;
        content: attr(title);
        font-weight: bold;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }

    &:hover {
        color: ${({theme}) => theme.gray500};
    }
`;

const NavItem = ({title, onChange, selected, index}) =>
    <NavItemWrapper
        title={title}
        selected={selected}
        onClick={() => onChange(index)}
    >
        {title}
    </NavItemWrapper>;
