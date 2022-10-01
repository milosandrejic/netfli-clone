import React, {useState, useEffect} from "react";
import styled from "styled-components";
import api from "api";

import {
    Billboard,
    Slider
} from "common/components";

import {
    Spacer
} from "common/widgets";

import {
    getMovieList,
    movieListType,
    getTvShowList,
    tvListType,
    generateRandomMovie
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
    const [genres, setGenres] = useState([]);

    useEffect(async () => {
        const movieResponse = await generateRandomMovie();

        const [movieGenreResponse, tvShowGenreREsponse] = await Promise.all([
            api.get("/genre/movie/list"),
            api.get("/genre/tv/list")
        ]);

        setGenres([...movieGenreResponse.data.genres, ...tvShowGenreREsponse.data.genres]);

        setMovie({
            title: movieResponse.title,
            description: movieResponse.description,
            url: movieResponse.url
        });
    }, []);

    return (
        <Wrapper>
            <Billboard movie={movie}/>

            {
                genres.length > 0 &&
                <MovieRowWrapper>
                    <MovieRow
                        fetchMovies={() => getMovieList(movieListType.POPULAR, 1)}
                        genres={genres}
                        title="Popular"
                    />

                    <Spacer size={50} />

                    <MovieRow
                        fetchMovies={() => getMovieList(movieListType.NOW_PLAYING, 2)}
                        genres={genres}
                        title="Now Playing"
                    />

                    <Spacer size={50} />

                    <MovieRow
                        fetchMovies={() => getMovieList(movieListType.UPCOMING)}
                        genres={genres}
                        title="Upcoming"
                    />

                    <Spacer size={50} />

                    <MovieRow
                        fetchMovies={() => getMovieList(movieListType.TOP_RATED)}
                        genres={genres}
                        title="Top Rated"
                    />

                    <Spacer size={50} />

                    <MovieRow
                        fetchMovies={() => getTvShowList(tvListType.ON_THE_AIR, 2)}
                        genres={genres}
                        title="On the Air"
                    />
                    <Spacer size={50} />

                    <MovieRow
                        fetchMovies={() => getTvShowList(tvListType.POPULAR)}
                        genres={genres}
                        title="Popular Shows"
                    />

                    <Spacer size={50} />

                    <MovieRow
                        fetchMovies={() => getTvShowList(tvListType.TOP_RATED)}
                        genres={genres}
                        title="Top Rated Shows"
                    />

                    <Spacer size={150} />
                </MovieRowWrapper>
            }
        </Wrapper>
    );
};

const MovieRow = React.memo(({title, genres, onExploreAll, fetchMovies}) => {
    const [movies, setMovies] = useState([]);

    useEffect(async () => {
        const movieResponse = await fetchMovies();

        setMovies(movieResponse.results);
    }, []);

    return (
        <Slider
            movies={movies}
            title={title}
            genres={genres}
            onExploreAll={onExploreAll}
        />
    );
});
