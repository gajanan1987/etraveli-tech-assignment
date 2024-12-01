import React from "react";
import { useDispatch } from "react-redux";
import { filterMovies } from "../redux/moviesSlice";

const FilterInput = () => {
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      placeholder="Filter by title..."
      onChange={(e) => dispatch(filterMovies(e.target.value))}
      className="search-input"
    />
  );
};

export default FilterInput;
