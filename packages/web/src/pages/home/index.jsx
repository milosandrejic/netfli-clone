import React, {useState, useEffect} from "react";
import styled from "styled-components";

import {
    Billboard,
    Slider
} from "common/components";

import {
    Spacer
} from "common/widgets";

import generateRandomMovie from "utils/billboardUtils";

import {
    getMovieList,
    movieListType,
    getTvShowList,
    tvListType
} from "api/utils";

const Wrapper = styled.div`
    margin-top: -68px;
    overflow-x: hidden;
`;

const MovieRowWrapper = styled.div`
    margin-top: -10%;
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
            <Billboard movie={movie}/>

            <MovieRowWrapper>
                <MovieRow
                    fetchMovies={() => getMovieList(movieListType.POPULAR)}
                    title="Popular"
                />

                <Spacer size={50} />

                <MovieRow
                    fetchMovies={() => getMovieList(movieListType.NOW_PLAYING)}
                    title="Now Playing"
                />

                <Spacer size={50} />

                <MovieRow
                    fetchMovies={() => getMovieList(movieListType.UPCOMING)}
                    title="Upcoming"
                />

                <Spacer size={50} />

                <MovieRow
                    fetchMovies={() => getMovieList(movieListType.TOP_RATED)}
                    title="Top Rated"
                />

                <Spacer size={50} />

                <MovieRow
                    fetchMovies={() => getTvShowList(movieListType.POPULAR)}
                    title="Popular"
                />

                <Spacer size={50} />

                <MovieRow
                    fetchMovies={() => getTvShowList(tvListType.TOP_RATED)}
                    title="Top Rated"
                />

                <Spacer size={50} />

                <MovieRow
                    fetchMovies={() => getTvShowList(tvListType.POPULAR)}
                    title="Popular"
                />

                <Spacer size={50} />
            </MovieRowWrapper>

        </Wrapper>
    );
};

const MovieRow = ({title, onExploreAll, fetchMovies}) => {
    const [movies, setMovies] = useState([]);

    useEffect(async () => {
        const movieResponse = await fetchMovies();

        setMovies(movieResponse.results);
    }, []);

    return (
        <Slider
            movies={movies}
            title={title}
            onExploreAll={onExploreAll}
        />
    );
};
