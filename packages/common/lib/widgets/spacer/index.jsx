import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    min-width: ${({size}) => size}px;
    min-height: ${({size}) => size}px;
    max-width: ${({size}) => size}px;
    max-height: ${({size}) => size}px;
`;

export const Spacer = ({size}) =>
    <Wrapper size={size} />;

Spacer.propTypes = {

    /** Size (width and height) in pixels */
    size: PropTypes.number.isRequired
};

Spacer.defaultProps = {
    size: 10
};
