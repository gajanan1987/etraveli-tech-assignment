import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sortMovies } from "../redux/moviesSlice";
import '../style/components/SortFilterBar.scss'

const SortFilterBar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sort by...");

  const handleSort = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    dispatch(sortMovies(option.toLowerCase()));
  };

  return (
    <div className="sort-filter-bar">
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => handleSort("Episode")}>Episode</li>
          <li onClick={() => handleSort("Year")}>Year</li>
          <li onClick={() => handleSort("Rating")}>Rating</li>
        </ul>
      )}
    </div>
  );
};

export default SortFilterBar;