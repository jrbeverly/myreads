import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading';

import Book from 'components/Book.js'
import ShelfChanger from 'components/ShelfChanger.js'
import Constants from 'utility/AppConstants.js'

import * as BooksAPI from 'api/BooksAPI'

class BookSearch extends Component {

    state = {
        query: "",
        books: [],
        shelves: [],
        state: "none",
        timeout: 0
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks() {
        BooksAPI.getAll().then(books => {
            this.setState(
                {
                    shelves: books.map((b) => b.id)
                }
            );
        })
    }

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

                this.setState({
                    books: books.filter((b) => !shelves.includes(b.id)),
                    state: "success"
                });
            });
    }

    onQueryChange(event) {
        const self = this;
        const query = event.target.value.trim();

        this.setState({
            state: "searching"
        });

        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }

        this.setState({
            query: query,
            typing: false,
            timeout: setTimeout(function () {
                self.search(query);
            }, Constants.wait_interval)
        });
    }

    onShelfChange(book, fromShelf, toShelf) {
        const self = this;

        BooksAPI.update(book, toShelf).then(function () {
            self.getBooks();
            self.search(self.state.query);
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
                            onChange={(event) => this.onQueryChange(event)} />
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
                                                        <ShelfChanger value="none" onChange={(fromShelf, toShelf) => this.onShelfChange(book, fromShelf, toShelf)} />
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
        )
    }
}

export default BookSearch