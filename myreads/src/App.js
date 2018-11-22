import React from "react";
import * as BooksAPI from "./BooksAPI";
import MainPage from "./MainPage.js";
import SearchPage from "./SearchPage.js";
import { Route } from "react-router-dom";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  moveShelf = async (book, shelf) => {
    await BooksAPI.update(book, shelf);

    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  };

  render() {
    //console.log(this.state.books);
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <SearchPage books={this.state.books} moveShelf={this.moveShelf} />
          )}
        />

        <Route
          exact
          path="/"
          render={({ history }) => (
            <MainPage books={this.state.books} moveShelf={this.moveShelf} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
