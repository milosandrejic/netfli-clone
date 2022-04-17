import ReactDOM from "react-dom";

export const batchUpdates = (updates) => {
    ReactDOM.unstable_batchedUpdates(updates);
};
