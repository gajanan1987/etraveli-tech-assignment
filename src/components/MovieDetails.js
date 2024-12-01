import React from "react";
import { useSelector } from "react-redux";
import "../style/components/MoviewsDetails.scss";
import { StartRating } from "./StartRating";
// import useScreenSize from "./useScreenSize";

const MovieDetails = () => {
  // const screenSize = useScreenSize();
  const movie = useSelector((state) => state.movies.selectedMovie);
  if (!movie) return <div className="movie-details nomovie">Select a movie to see details.</div>;

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <div className="poster-wrapper">
        <img src={movie.poster} alt={movie.title} />
        <p>{movie.opening_crawl}</p>
      </div>
      <p className="director">Director: {movie.director}</p>
      {movie.ratings && (
        <div className="ratings">
          <div className="rating-wrapper">
            <p>Average rating:</p>
            {movie.ratings[0] && (
              <StartRating rating={movie.ratings[0]?.Value} />
            )}
          </div>
          <ul>
            {movie.ratings.map((rating, index) => (
              <li key={index}>
                {rating.Source}: {rating.Value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
