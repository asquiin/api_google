import { useDispatch, useSelector } from "react-redux";
import { getBookCard } from "../../redux/resultReducer";
import React, { useEffect } from "react";
import "./styles.css";

const BookCardWithHooks = (props) => {
  const dispatch = useDispatch();
  const bookCard = useSelector((state) => state.searchResult.bookCard);

  useEffect(() => {
    dispatch(getBookCard(props.userId));
  }, []);

  if (!bookCard) {
    return <h1> loading... </h1>;
  }

  return (
    <div className="book_card_row">
      <div className="book_card">
        <div className="book_card_img">
          <img
            src={
              bookCard.volumeInfo.imageLinks != null
                ? bookCard.volumeInfo.imageLinks.thumbnail
                : ""
            }
          ></img>
        </div>
        <div className="book_card_info">
          <h1 className="book_categories">
            Category:
            {bookCard.volumeInfo.categories != null
              ? bookCard.volumeInfo.categories
              : "Неизвестно"}
          </h1>
          <h2 className="book_name">
            {" "}
            Title:{" "}
            {bookCard.volumeInfo.title != null
              ? bookCard.volumeInfo.title
              : "Not given"}{" "}
          </h2>
          <h2 className="book_authors">
            {" "}
            Автор:{" "}
            {bookCard.volumeInfo.authors != null
              ? bookCard.volumeInfo.authors
              : "Неизвестно"}
          </h2>
          <p className="book_description">
            {bookCard.volumeInfo.description != null
              ? bookCard.volumeInfo.description
              : "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCardWithHooks;
