import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { API_KEY } from '../utils/api-key';

import axios from 'axios';

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};
const TMDB_BASE_URL = "https://api.themoviedb.org/3/";

export const getGenres = createAsyncThunk('sembene/genres', async () => {
    const { data: { genres },
    } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    console.log(genres);
    return genres;
});

const SembeneSlice = createSlice({
    name: 'sembene',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        })
    },
});

export const store = configureStore({
    reducer: {
        sembene: SembeneSlice.reducer,
    },
});