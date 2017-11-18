import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Book from 'components/Book.js'

import * as BooksAPI from 'api/BooksAPI'

class BookSearch extends Component {

    state = {
        query: '',
        books: []
    }

    getBooks(query) {
        BooksAPI
            .search(query, 10)
            .then((books) => {
                this.setState({ books: books })
            });
    }

    onQueryChange = (e) => {
        const query = e.target.value.trim();
        this.setState({
            query: query
        });

        this.getBooks(query);
    }

    render() {
        const { query, books } = this.state

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
                    <div>
                        <div className=''>
                            <h3>Search returned {books.length} books </h3>
                        </div>
                        <ol className="books-grid">
                            {
                                (books || []).map((book, index) => (
                                    <Book
                                        key={index}
                                        book={book}
                                    />
                                ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookSearch