import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import update from 'immutability-helper';

import BookSearch from 'views/BookSearch.js'
import BookList from 'views/BookList.js'

import * as BooksAPI from 'api/BooksAPI'

import 'App.css'

/**
 * @description The entrypoint on the application.
*/
class BooksApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shelves: {
        currentlyReading: [],
        wantToRead: [],
        read: []
      },
      ready: false
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  /**
  * @description Gets the current state of the bookshelf
  */
  getBooks() {
    BooksAPI.getAll().then(books => {
      books.forEach(book => {
        this.add(book.shelf, book);
      });

      this.setState(
        {
          ready: true
        }
      );
    });
  }


  /**
  * @description Get a list of all books on the bookshelf
  */
  getAll() {
    let books = [];
    for (var shelf in this.state.shelves) {
      if (this.state.shelves.hasOwnProperty(shelf)) {
        books = books.concat(this.state.shelves[shelf]);
      }
    }
    return books;
  }

  /**
  * @description Moves a book between shelves
  * @param {object} book - The book to move between shelves
  * @param {string} fromShelf - The current shelf of the book
  * @param {string} toShelf - The shelf to move to the book to
  */
  move(book, fromShelf, toShelf) {
    BooksAPI
      .update(book, toShelf)
      .then(() => {
        if (fromShelf !== 'none' && toShelf !== 'none') {
          this.remove(fromShelf, book, () => this.add(toShelf, book));
        } else if (fromShelf !== 'none') {
          this.remove(fromShelf, book);
        } else if (toShelf !== 'none') {
          this.add(toShelf, book);
        }
      });
  }

  /**
   * @description Adds a book to the specified shelf
   * @param {string} shelf - The shelf
   * @param {object} book - The book to be added to the shelf
   * @param {object} callback - Calls a function after altering the state
   */
  add(shelf, book, callback) {
    book.shelf = shelf;

    this.setState((prevState) => ({
      shelves: update(prevState.shelves, {
        [shelf]: { $push: [book] }
      })
    }), callback);
  }

  /**
   * @description Removes a book from the specified shelf
   * @param {string} shelf - The shelf
   * @param {object} book - The book to remove from the shelf
   * @param {object} callback - Calls a function after altering the state
   */
  remove(shelf, book, callback) {
    book.shelf = 'none';

    this.setState((prevState) => ({
      shelves: update(prevState.shelves, {
        [shelf]: { $splice: [[(prevState.shelves[shelf].findIndex((b) => b.id === book.id)), 1]] }
      })
    }), callback);
  }

  render() {
    const { shelves, ready } = this.state;

    return (
      <div className="app">
        <Route exact path="/"
          render={(routeProps) => (
            <BookList
              {...routeProps}
              shelves={shelves}
              isReady={ready}
              onStateChanged={(book, fromShelf, toShelf) => this.move(book, fromShelf, toShelf)}
            />
          )} />
        <Route path="/search"
          render={(routeProps) => (
            <BookSearch
              {...routeProps}
              books={this.getAll()}
              onStateChanged={(book, fromShelf, toShelf) => this.move(book, fromShelf, toShelf)}
            />
          )} />
      </div>
    )
  }
}

export default BooksApp