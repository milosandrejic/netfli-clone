import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
    useScroll
} from "helpers";

import {
    Typography
} from "widgets";

import logo from "netflix.svg";

const Wrapper = styled.div`
    ${({sticky}) => sticky && `
        position: sticky;
        top: 0;
    `}
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
`;

const NavLeft = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    width: 92px;
    margin-right: 25px;
`;

export const Navigation = ({sections, onSelect, selected, sticky}) => {
    const {scrolled} = useScroll(70);

    return (
        <Wrapper
            sticky={sticky}
            animate={scrolled}
        >
            <NavLeft>
                <Logo src={logo} />
                {
                    sections.map((section, index) =>
                        <NavItem
                            key={section.title}
                            title={section.title}
                            onSelect={onSelect}
                            selected={selected === index}
                            index={index}
                        />
                    )
                }
            </NavLeft>
        </Wrapper>
    );
};

Navigation.propTypes = {

    /** Array of sections which will be rendered as navigation items */
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,

    /** Function which will be triggered when user clicks on one of navigation items */
    onSelect: PropTypes.func.isRequired,

    /** Index of selected item which will be higlighted */
    selected: PropTypes.number.isRequired,

    /** If true navigation will be position: sticky; top: 0; */
    sticky: PropTypes.bool
};

Navigation.defaultProps = {
    sticky: false
};

const NavItemWrapper = styled.div`
    color: ${({selected, theme}) => selected ? theme.foreground : theme.gray700};
    cursor: pointer;
    user-select: none;
    margin-left: 20px;

    &:hover {
        color: ${({theme}) => theme.gray500};
    }
`;

const NavItem = ({title, onSelect, selected, index}) =>
    <NavItemWrapper
        onClick={() => onSelect(index)}
        selected={selected}
    >
        <Typography size={14}>{title}</Typography>
    </NavItemWrapper>;
