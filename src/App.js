import React from "react";
import "./style/App.scss";
import MovieList from "./components/MovieList";
import FilterInput from "./components/FilterInput";
import SortFilterBar from "./components/SortFilterBar";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <div className="movies-app">
      <div className="header">
        <SortFilterBar />
        <FilterInput />
      </div>
      <div className="movies-wrapper">
        <MovieList />
        <MovieDetails />
      </div>
    </div>
  );
}

export default App;
