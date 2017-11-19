import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading';
import { Debounce } from 'react-throttle';

import Book from 'components/Book.js'
import ShelfChanger from 'components/ShelfChanger.js'

import * as BooksAPI from 'api/BooksAPI'

/** 
 * @description Represents the search view
*/
class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: "",
            books: [],
            shelves: [],
            state: "none"
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
            this.setState(
                {
                    shelves: books
                }
            );
        });
    }

    /**
    * @description Performs a search with the specified query
    * @param {string} query - The search criteria
    */
    search(query) {
        if (!query) {
            this.setState({
                books: [],
                state: "none"
            });
            return;
        }

        BooksAPI
            .search(query, 10)
            .then((books) => {
                if (books.error === "empty query") {
                    this.setState({
                        books: [],
                        state: "success"
                    });
                    return;
                }

                if (books.error) {
                    this.setState({
                        books: [],
                        state: "error"
                    });
                    return;
                }

                const shelves = this.state.shelves;

                const result = books.map((book) => {
                    const match = (shelves.find((b) => b.id === book.id));
                    match && (book.shelf = match.shelf);
                    return book;
                });

                this.setState({
                    books: result,
                    state: "success"
                });
            });
    }

    /**
    * @description Receives notification that the search input's state has changed
    * @param {object} e - An object that contains text input event data
    */
    onQueryChange(event) {
        const self = this;
        const query = event.target.value.trim();

        this.setState({
            query: query,
            state: "searching"
        });

        self.search(query);
    }

    /**
     * @description  Receives notification that the book's shelf has changed
     * @param {object} book - The book to move
     * @param {string} fromShelf - The current shelf of the book
     * @param {string} toShelf - The new shelf of the book
     */
    onShelfChange(book, fromShelf, toShelf) {
        const self = this;

        BooksAPI.update(book, toShelf);
    }

    render() {
        const { query, books, state } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="400" handler="onChange">
                            <input type="text"
                                placeholder="Search by title or author"
                                onChange={(event) => this.onQueryChange(event)} />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    {
                        state === "searching" ?
                            (
                                <div className="loading">
                                    <ReactLoading type="bars" color="#444" width="150px" />
                                </div>
                            )
                            :
                            state === "success" && books.length > 0 ?
                                (
                                    <div>
                                        <div>
                                            <h3>Search returned {books.length} books </h3>
                                        </div>
                                        <ol className="books-grid">
                                            {
                                                books.map((book, index) => (
                                                    <Book key={index} book={book}>
                                                        <ShelfChanger value={book.shelf} onChange={(fromShelf, toShelf) => this.onShelfChange(book, fromShelf, toShelf)} />
                                                    </Book>
                                                ))}
                                        </ol>
                                    </div>
                                )
                                :
                                query !== "" && (
                                    <div>
                                        <h3>Your search - '<b>{query}</b>' - did not match any books.</h3>
                                    </div>
                                )
                    }
                </div>
            </div>
        );
    }
}

export default BookSearch