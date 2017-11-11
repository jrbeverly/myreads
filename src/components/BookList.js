import React, { Component } from 'react';
import Title from './Title.js'
import BookShelf from './BookShelf.js'
import OpenSearch from './OpenSearch.js'

class BookList extends Component {

    render() {
        return (
            <div className="list-books">
                <Title />
                <BookShelf />
                <OpenSearch />
            </div>
        )
    }
}

export default BookList