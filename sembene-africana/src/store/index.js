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
    const {
        data: { genres },
    } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    console.log(genres);
    return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
        });
        if (movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            });
        }
    });
};

//LOOP THROUGH ONLY 10 TIMES
const getRawData = async (api, genres, paging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const {
            data: { results },
        } = await axios.get(
            `${api}${paging ? `&page=${i}` : ""}`
        );
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

//FETCH MOVIES
export const fetchMovies = createAsyncThunk(
    'sembene/trending', async ({ type }, thunkApi) => {
        const { sembene: { genres }, } = thunkApi.getState();
        //GET MOVIE TYPES TRENDING BY WEEK
        return getRawData(`${TMDB_BASE_URL}trending/${type}/week?api_key=${API_KEY}`,
            genres, true
        );
    }
);
//SORT MOVIES BY GENRE
export const fetchDataByGenre = createAsyncThunk(
    'sembene/GenreChoice', async ({ genre, type }, thunkApi) => {
        const { sembene: { genres }, } = thunkApi.getState();
        //GET MOVIE TYPES TRENDING BY WEEK
        return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
            genres
        );
    }
);

const SembeneSlice = createSlice({
    name: 'sembene',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

export const store = configureStore({
    reducer: {
        sembene: SembeneSlice.reducer,
    },
});