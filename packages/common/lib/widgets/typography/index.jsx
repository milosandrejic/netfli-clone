import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
    font-family: ${({theme}) => theme.font};
    font-size: ${({size}) => size}px;
    line-height: ${({size, lineHeight}) => lineHeight ? lineHeight : size * 1.25}px;
    font-weight: ${({weight}) => weight};
    margin: 0;
    padding: 0;
    color: ${({secondary, theme}) => secondary ? theme.gray200 : "inherit"};
    background-color: transparent;
    overflow: inherit;
    white-space: inherit;
    text-overflow: inherit;
`;

export const Typography = ({size, variant, lineHeight, secondary, children}) => {
    let weight = 400;

    if (variant === "extraLight") {
        weight = 200;
    } else if (variant === "light") {
        weight = 300;
    } else if (variant === "semiBold") {
        weight = 600;
    } else if (variant === "bold") {
        weight = 700;
    }

    console.log(weight)

    return (
        <Wrapper
            size={size}
            lineHeight={lineHeight}
            weight={weight}
            secondary={secondary}
        >
            {children}
        </Wrapper>
    );
};

Typography.propTypes = {

    /** Font size in pixels */
    size: PropTypes.number.isRequired,

    /** Line height in pixels. If not set, line height is 125% of text size */
    lineHeight: PropTypes.number,

    /** Typography variant */
    variant: PropTypes.oneOf(["extraLight, light, semiBold, bold"]),

};

Typography.defaultProps = {
    size: 16
};
