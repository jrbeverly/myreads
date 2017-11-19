import React from 'react';

import Header from 'components/Header.js'
import BookShelf from 'components/BookShelf.js'
import OpenSearch from 'components/OpenSearch.js'

/** 
 * @description Represents the bookshelf and all connected elements
*/
const BookList = () => {
    return (
        <div className="list-books">
            <Header />
            <BookShelf />
            <OpenSearch />
        </div>
    );
}

export default BookList