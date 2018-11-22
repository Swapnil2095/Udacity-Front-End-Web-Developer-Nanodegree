import React from "react";

const Book = (props) => {

    const { book, currentShelf, moveShelf } = props;

    let displayThumbnail = book.imageLinks ? book.imageLinks.thumbnail : "";

    let displayAuthors = book.authors ? book.authors : "No Author Mentioned.";

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${displayThumbnail})`
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={event => moveShelf(book, event.target.value)}
              value={currentShelf}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{displayAuthors}</div>
      </div>
    );
  
}

export default Book;
