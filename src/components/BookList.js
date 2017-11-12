import React, { Component } from 'react';
import Header from './Header.js'
import BookShelf from './BookShelf.js'
import OpenSearch from './OpenSearch.js'

class BookList extends Component {

    render() {
        return (
            <div className="list-books">
                <Header />
                <BookShelf />
                <OpenSearch />
            </div>
        )
    }
}

export default BookList