import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
    font-family: ${({theme}) => theme.font};
    font-size: ${({size}) => size}px;
    line-height: ${({size, lineHeight}) => lineHeight ? lineHeight : size * 1.25}px;
    font-weight: ${({weight}) => weight};
    max-width: ${({maxWidth}) => maxWidth ? `${maxWidth}px` : "none"};
    margin: 0;
    padding: 0;
    color: ${({secondary, theme}) => secondary ? theme.gray200 : "inherit"};
    background-color: transparent;
    overflow: inherit;
    white-space: inherit;
    text-overflow: inherit;
`;

export const Typography = ({size, variant, lineHeight, secondary, maxWidth, children}) => {
    let weight = 400;

    if (variant === "extraLight") {
        weight = 200;
    } else if (variant === "light") {
        weight = 300;
    } else if (variant === "medium") {
        weight = 500;
    } else if (variant === "bold") {
        weight = 700;
    }

    return (
        <Wrapper
            size={size}
            lineHeight={lineHeight}
            weight={weight}
            secondary={secondary}
            maxWidth={maxWidth}
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
    variant: PropTypes.oneOf(["extraLight", "light", "semiBold", "bold"]),

    /** If you font to break sentence into multiple rows max width is useful */
    maxWidth: PropTypes.number

};

Typography.defaultProps = {
    size: 16
};
