import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: true
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
        },
        logout: (state) => {
            state.user = null
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {login, logout, setLoading} = authSlice.actions

export default authSlice.reducer