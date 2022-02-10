import React, {useState} from "react";
import styled from "styled-components";

import {
    Billboard
} from "common/components";

import {
    Spacer
} from "common/widgets";

const Wrapper = styled.div`
    margin-top: -68px;
`;

export default () => {
    const [movie, setMovie] = useState({
        title: "Spider-Man: No Way Home",
        description: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
        url: "https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
    });

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
