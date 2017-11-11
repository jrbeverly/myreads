import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book.js'
import Books from './Books.js'
import Shelf from './Shelf.js'
import BookShelf from './BookShelf.js'
import OpenSearch from './OpenSearch.js'

class BookList extends Component {

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <BookShelf />
                <OpenSearch />
            </div>
        )
    }
}

export default BookList