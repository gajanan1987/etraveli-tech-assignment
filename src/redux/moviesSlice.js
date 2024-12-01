import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SWAPI_URL = "https://swapi.dev/api/films/?format=json";
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

// Async thunk to fetch movies
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(SWAPI_URL);
  const films = response.data.results;

  const moviesWithDetails = await Promise.all(
    films.map(async (film) => {
      const title = film.title;
      const omdbResponse = await axios.get(
        `https://www.omdbapi.com/?t=${title.replace(/ /g, "+")}&apikey=${OMDB_API_KEY}`
      );

      return {
        ...film,
        poster: omdbResponse.data.Poster,
        ratings: omdbResponse.data.Ratings,
      };
    })
  );
  return moviesWithDetails;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    allMovies: [],
    movies: [],
    selectedMovie: null,
    status: "idle",
    error: null,
  },
  reducers: {
    selectMovie(state, action) {
      state.selectedMovie = state.movies.find((movie) => movie.episode_id === action.payload);
    },
    sortMovies(state, action) {
      const sortKey = action.payload;
      state.movies.sort((a, b) => {
        if (sortKey === "year") {
          return new Date(a.release_date) - new Date(b.release_date);
        }
        if (sortKey === "episode") {
          return a.episode_id - b.episode_id;
        }
        if (sortKey === "rating") {
          const getAverageRating = (movie) => {
            const imdbRating = movie.ratings?.find(
              (rating) => rating.Source === "Internet Movie Database"
            );
            return imdbRating ? parseFloat(imdbRating.Value.split("/")[0]) : 0;
          };
          return getAverageRating(b) - getAverageRating(a);
        }
        return 0;
      });
    },
    filterMovies(state, action) {
      const searchText = action.payload.toLowerCase();
      state.movies = state.allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchText)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
        state.allMovies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { selectMovie, sortMovies, filterMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
