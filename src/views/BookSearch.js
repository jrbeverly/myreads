import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Book from 'components/Book.js'
import Constants from 'utility/AppConstants.js'

import * as BooksAPI from 'api/BooksAPI'

class BookSearch extends Component {

    state = {
        query: "",
        books: [],
        state: "none",
        timeout: 0
    }

    getBooks(query) {
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
                if (books.error && books.error !== "empty query") {
                    this.setState({
                        books: [],
                        state: "error"
                    });
                    return;
                }

                this.setState({
                    books: books,
                    state: "success"
                });
            });
    }

    onQueryChange(e) {
        const self = this;
        const query = e.target.value.trim();

        self.setState({
            state: "searching"
        });

        if (self.state.timeout) {
            clearTimeout(self.state.timeout);
        }

        self.setState({
            query: query,
            typing: false,
            timeout: setTimeout(function () {
                self.getBooks(query);
            }, Constants.wait_interval)
        });
    }

    render() {
        const { query, books, state } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={this.onQueryChange} />
                    </div>
                </div>
                <div className="search-books-results">
                    {
                        state === "searching" || query === "" ?
                            (
                                <div></div>
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
                                                        <ShelfChanger value="none" onChange={(fromShelf, toShelf) => onShelfChange(book, fromShelf, toShelf)} />
                                                    </Book>
                                                ))}
                                        </ol>
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        <h3>Your search - '<b>{query}</b>' - did not match any books.</h3>
                                    </div>
                                )
                    }
                </div>
            </div>
        )
    }
}

export default BookSearch