import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shelf from 'components/Shelf.js'

/** 
 * @description Represents a bookshelf, containing a collection of shelves
*/
class BookShelf extends Component {

    static propTypes = {
        shelves: PropTypes.object.isRequired,
        onStateChanged: PropTypes.func.isRequired
    }

    render() {
        const { shelves, onStateChanged } = this.props;

        return (
            <div className="list-books-content">
                <div>
                    <Shelf title="Currently Reading" shelf="currentlyReading" books={shelves.currentlyReading} onChange={(book, fromShelf, toShelf) => onStateChanged(book, "currentlyReading", toShelf)} />
                    <Shelf title="Want to Read" shelf="wantToRead" books={shelves.wantToRead} onChange={(book, fromShelf, toShelf) => onStateChanged(book, "wantToRead", toShelf)} />
                    <Shelf title="Read" shelf="read" books={shelves.read} onChange={(book, fromShelf, toShelf) => onStateChanged(book, "read", toShelf)} />
                </div>
            </div>
        );
    }
}

export default BookShelf