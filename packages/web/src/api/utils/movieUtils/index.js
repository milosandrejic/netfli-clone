import api from "api";

export const getMovieList = async (type, page = 1) => {
    const response = await api.get(`/movie/${type}?page=${page}`);

    return response.data;
};

export const movieListType = {
    NOW_PLAYING: "now_playing",
    POPULAR: "popular",
    TOP_RATED: "top_rated",
    UPCOMING: "upcoming"
};
