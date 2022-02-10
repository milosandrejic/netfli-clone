import axios from "axios";

const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json"
    },
    params: {
        api_key: process.env.API_KEY
    }
});

export default api;
