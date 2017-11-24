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
      books: [],
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
          books: books,
          ready: true
        }
      );
    });
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
        fromShelf !== 'none' && this.remove(fromShelf, book);
        toShelf !== 'none' && this.add(toShelf, book);
      });
  }

  /**
   * @description Adds a book to the specified shelf
   * @param {string} shelf - The shelf
   * @param {object} book - The book to be added to the shelf
   */
  add(shelf, book) {
    this.setState((prevState) => ({
      shelves: update(prevState.shelves, {
        [shelf]: { $push: [book] }
      })
    }));
  }

  /**
   * @description Removes a book from the specified shelf
   * @param {string} shelf - The shelf
   * @param {object} book - The book to remove from the shelf
   */
  remove(shelf, book) {
    this.setState((prevState) => ({
      shelves: update(prevState.shelves, {
        [shelf]: { $splice: [[(prevState.shelves[shelf].findIndex((b) => b.id === book.id)), 1]] }
      })
    }));
  }

  render() {
    const { shelves, books, ready } = this.state;

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
              books={books}
              onStateChanged={(book, fromShelf, toShelf) => this.move(book, fromShelf, toShelf)}
            />
          )} />
      </div>
    )
  }
}

export default BooksApp