import React from "react";
import styled from "styled-components";

import {
    Typography,
    Spacer
} from "widgets";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding-left: 80px;
    width: 100%;
    height: 100vh;
    background: ${({theme, url}) => `
        linear-gradient(
            transparent 0%,
            transparent 70%,
            ${theme.background} 95%,
            ${theme.background} 100%
        ),
        url(${url})
        `};
    background-size: cover;
`;

const MovieInfo = styled.div`
    margin-top: -50px;
    color: ${({theme}) => theme.foreground};
`;

export const Billboard = ({movie, onMoreInfo}) =>
    <Wrapper url={movie?.url}>
        <MovieInfo>
            <Typography
                variant="bold"
                size={32}
            >
                {movie?.title}
            </Typography>

            <Spacer size={20} />

            <Typography
                size={24}
                variant="semiBold"
            >
                {movie?.description}
            </Typography>
        </MovieInfo>
    </Wrapper>;
