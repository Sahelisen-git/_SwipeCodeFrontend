import { createSlice } from "@reduxjs/toolkit";

// Feed slice to manage feed state
const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload, // Set the feed data
        removeUserFromFeed: (state, action) => {
            const index = state.findIndex(user => user._id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;