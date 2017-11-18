import React, { Component } from 'react';

import Header from 'components/Header.js'
import BookShelf from 'components/BookShelf.js'
import OpenSearch from 'components/OpenSearch.js'

/** 
 * @description Represents the bookshelf and all connected elements
*/
class BookList extends Component {

    render() {
        return (
            <div className="list-books">
                <Header />
                <BookShelf />
                <OpenSearch />
            </div>
        );
    }
}

export default BookList