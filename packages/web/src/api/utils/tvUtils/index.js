import api from "api";

export const getTvShowList = async (type, page = 1) => {
    const response = await api.get(`tv/${type}?page=${page}`);

    return response.data;
};

export const tvListType = {
    POPULAR: "popular",
    TOP_RATED: "top_rated"
};
