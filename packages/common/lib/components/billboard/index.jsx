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
            rgba(20, 20, 20, 0.3) 0%,
            rgba(20, 20, 20, 0.3) 50%,
            rgba(20, 20, 20, 0.9) 90%,
            ${theme.background} 95%,
            ${theme.background} 100%
        ),
        url(${url})
        `};
    background-size: cover;
`;

const MovieInfo = styled.div`
    margin-top: -50px;
    max-width: 600px;
    color: ${({theme}) => theme.foreground};
`;

export const Billboard = ({movie, onMoreInfo}) =>
    <Wrapper url={movie?.url}>
        <MovieInfo>
            <Typography
                variant="bold"
                size={50}
            >
                {movie?.title}
            </Typography>

            <Spacer size={30} />

            <Typography
                size={16}
                lineHeight={30}
                letterSpacing={1}
            >
                {movie?.description}
            </Typography>
        </MovieInfo>
    </Wrapper>;
