import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, selectMovie } from "../redux/moviesSlice";
import '../style/components/MoviesList.scss'
import { StartRating } from "./StartRating";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  const handleClick = (id) => {
    dispatch(selectMovie(id))
  }

  const romanize = (num) => {
    if (isNaN(num)) return "";
    const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let roman = "";
    for (let i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  };

  if (status === "loading") return <p>Loading movies...</p>;
  if (status === "failed") return <p>Failed to load movies.</p>;

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li
          key={movie.episode_id}
          onClick={() => handleClick(movie.episode_id)}
          className="movie-item"
        >
          <span style={{textTransform: 'uppercase'}}>{`Episode ${movie.episode_id}`}</span>
          <span>{`Episode ${romanize(movie.episode_id)} - ${movie.title}`}</span>
          <StartRating rating={movie.ratings[0]?.Value} starsize="15px" starspace="1px" />
          <span>{movie.release_date}</span>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
