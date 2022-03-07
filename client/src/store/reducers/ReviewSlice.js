import { createSlice } from '@reduxjs/toolkit'

export const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviews: [],
        selectedReview: {},
        displayFilters: "none",
        createdReview: {
            title: "",
            category: "",
            tags: "",
            authorScore: "",
            text: "",
            images: []
        },
        editedReview: {},
        newestReviews: []
    },
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload
        },
        setDisplayFilters: (state, action) => {
            state.displayFilters = action.payload
        },
        setSelectedReview: (state, action) => {
            state.selectedReview = action.payload
        },
        setCreatedReview: (state, action) => {
            state.createdReview = action.payload
        },
        setEditedReview: (state, action) => {
            state.editedReview = action.payload
        },
        setNewestReviews: (state, action) => {
            state.newestReviews = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const {
    setReviews,
    setDisplayFilters,
    setSelectedReview,
    setCreatedReview,
    setEditedReview,
    setNewestReviews

} = reviewSlice.actions

export default reviewSlice.reducer