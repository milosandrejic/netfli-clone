import {buildImageUrl} from "api/utils";
import api from "api";

export const generateRandomMovie = async () => {
    const movieIndex = Math.round(Math.random() * (18 - 1 + 1) + 1);
    const page = Math.round(Math.random() * (100 - 1 + 1) + 1);

    const response = await api.get(`/movie/popular?page=${page}`);

    const movieData = response.data.results[movieIndex];

    return {
        title: movieData.title,
        description: movieData.overview,
        url: buildImageUrl("original", movieData.backdrop_path)
    };
};
