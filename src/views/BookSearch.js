import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

    static propTypes = {
        books: PropTypes.array.isRequired,
        onStateChanged: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: [],
            books: props.books,
            state: "none"
        };
    }

    /**
    * @description Performs a search with the specified query
    * @param {string} query - The search criteria
    */
    search = (query) => {
        if (!query) {
            this.setState({
                results: [],
                state: "none"
            });
            return;
        }

        const self = this;

        BooksAPI
            .search(query, 20)
            .then((books) => {
                if (books.error === "empty query") {
                    self.setState({
                        results: [],
                        state: "success"
                    });
                    return;
                }

                if (books.error) {
                    self.setState({
                        results: [],
                        state: "error"
                    });
                    return;
                }

                const shelfBooks = self.state.books;

                const result = books.map((book) => {
                    const match = (shelfBooks.find((b) => b.id === book.id));
                    match && (book.shelf = match.shelf);
                    return book;
                });

                self.setState({
                    results: result,
                    state: "success"
                });
            });
    }

    /**
    * @description Receives notification that the search input's state has changed
    * @param {object} e - An object that contains text input event data
    */
    onQueryChange = (event) => {
        const query = event.target.value.trim();

        this.setState({
            query: query,
            state: "searching"
        });

        this.search(query);
    }

    render() {
        const { query, results, state } = this.state;
        const { onStateChanged } = this.props;

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
                            state === "success" && results.length > 0 ?
                                (
                                    <div>
                                        <div>
                                            <h3>Search returned {results.length} books </h3>
                                        </div>
                                        <ol className="books-grid">
                                            {
                                                results.map((book, index) => (
                                                    <Book key={index} book={book}>
                                                        <ShelfChanger value={book.shelf} onChange={(fromShelf, toShelf) => onStateChanged(book, fromShelf, toShelf)} />
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