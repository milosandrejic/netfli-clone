import React, {useState, useEffect} from "react";
import styled from "styled-components";

import {
    Billboard
} from "common/components";

import {
    Spacer
} from "common/widgets";

import generateRandomMovie from "utils/billboardUtils";

const Wrapper = styled.div`
    margin-top: -68px;
`;

export default () => {
    const [movie, setMovie] = useState();

    useEffect(async () => {
        const movieData = await generateRandomMovie();

        setMovie({
            title: movieData.title,
            description: movieData.description,
            url: movieData.url
        });
    }, []);

    return (
        <Wrapper>
            <Billboard
                movie={movie}
            />

            <Spacer size={100} />
            <Spacer size={100} />
            <Spacer size={100} />
            <Spacer size={100} />
            <Spacer size={100} />
        </Wrapper>
    );
};
