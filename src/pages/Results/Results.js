import React, { useEffect, useState } from "react";
import noImage from "../../img/noImage.jpg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadMoreBooks,
  startSearchBook,
} from "../../redux/resultReducer";
import Error from "../Error/Error";
import "./Results.css";

const Results = () => {
  const dispatch = useDispatch();
  const searchString = useSelector((state) => state.header.newSearchString);
  const orderBy = useSelector((state) => state.header.orderBy);
  const category = useSelector((state) => state.header.category);
  const results = useSelector((state) => state.searchResult.results);
  const totalItems = useSelector((state) => state.searchResult.totalItems);
  const isFetching = useSelector((state) => state.searchResult.isFetching);
  const isFetchError = useSelector((state) => state.searchResult.isFetchError);

  let [booksCount, increaseBooksCount] = useState(30);

  useEffect(() => {
    dispatch(startSearchBook(searchString, orderBy, category));
  }, [searchString, orderBy, category]);

  let onLoadMoreButton = () => {
    dispatch(loadMoreBooks(booksCount, results, searchString));
    increaseBooksCount(booksCount + 30);
  };

  return (
    <>
      {isFetching ? (
        <div className="forLoader">
          <span className="loader"></span>
        </div>
      ) : null}

      <div className="books_container">
        <div>
          <h2 className="how_much_found">Found {totalItems} results</h2>
        </div>
        <div className="books_row">
          {results.map((b) => (
            <div className="books_items">
              <NavLink to={"/bookCard/" + b.id} className="navbar">
                <div className="book_item">
                  <div className="book_img">
                    <img
                      src={
                        b.volumeInfo.imageLinks != null
                          ? b.volumeInfo.imageLinks.smallThumbnail
                          : noImage
                      }
                    ></img>
                  </div>
                  <div className="book_info">
                    <h5>
                      Category:
                      <span className="book_category">
                        {b.volumeInfo.categories != null
                          ? b.volumeInfo.categories[0]
                          : "Неизвестно"}
                      </span>
                    </h5>
                    <h1 className="book_name"> {b.volumeInfo.title} </h1>
                    <p>
                      Author:
                      <span className="book_authors"> 
                      {b.volumeInfo.authors != null
                        ? b.volumeInfo.authors
                        : "Неизвестно"}
                        </span>
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
        <div className="button">
          {totalItems > results.length ? (
            <button
              className="load_more_button"
              onClick={() => {
                onLoadMoreButton();
              }}
            >
              Load more
            </button>
          ) : (
            booksCount == 0
          )}
        </div>
      </div>

      {isFetchError ? <Error /> : null}
    </>
  );
};

export default Results;
