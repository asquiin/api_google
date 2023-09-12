import React from "react";
import { NavLink } from 'react-router-dom';
import "./Header.css";
import { useDispatch, useSelector } from 'react-redux';
import { pushSearchButton, selectedCategory, sortingSelection, updateSearchText } from '../../redux/headerReducer';

const Header = () => {

  const newSearchStringBody = useSelector(state => state.header.newSearchString);
  const dispatch = useDispatch();

  let onUpdateSearchText = (e) => {
      let text = e.target.value;
      dispatch(updateSearchText(text));
  }

  let onCategorySelection = (e) => {
      let category = e.target.value;
      dispatch(selectedCategory(category));
  }

  let onSortingSelection = (e) => {
      let orderBy = e.target.value;
      dispatch(sortingSelection(orderBy));
  }

  let onPushSearchButton = () => {
      dispatch(pushSearchButton());
  }
  let onPushEnter = (e) => {
      if (e.key === "Enter") {
          dispatch(pushSearchButton());
      }
  }


  return (
    <div className="headerBooks">
      <h1>Search for books</h1>

      <div className="searchBar">
        <input placeholder="Enter Your Book Name" onChange={onUpdateSearchText} onKeyPress={onPushEnter} autoFocus={true} value={newSearchStringBody} />
        <NavLink to='/results'>  <button className="searchBtn" onClick={onPushSearchButton} >Search</button> </NavLink>
      </div>


      <div className="categories-sorting">
      <div className="categories">
      Categories
        <select onChange={onCategorySelection}>
          <option>all</option>
          <option>art</option>
          <option>biography</option>
          <option>computers</option>
          <option>history</option>
          <option>medical</option>
          <option>poetry</option>
        </select>

        </div> 
        <div className="sorting">
        Sorting by
        <select onChange={onSortingSelection}>
          <option selected>relevance</option>
          <option>newest</option>
        </select>
      </div>
      </div>

    </div>
  );
};

export default Header;

