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
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
    background-size: ${({animate}) => animate ? "100% 700%" : "100% 100%"};
    transition: all 500ms ease;
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

export const Navigation = ({sections, onChange, selected}) => {
    const {scrolled} = useScroll(70);
    const [query, setQuery] = useState("");

    return (
        <Wrapper animate={scrolled}>
            <NavLeft>
                <Logo
                    src={logo}
                    onClick={() => onChange(0)}
                />

                {
                    sections.map((section, index) =>
                        <NavItem
                            key={section.title}
                            title={section.title}
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

    /** Array of sections which will be rendered as navigation items */
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,

    /** Function which will be triggered when user clicks on one of navigation items */
    onChange: PropTypes.func.isRequired,

    /** Index of selected item which will be higlighted */
    selected: PropTypes.number.isRequired,

    /** If true navigation will be position: sticky; top: 0; */
    sticky: PropTypes.bool
};

Navigation.defaultProps = {
    sticky: false
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
