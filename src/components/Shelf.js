import React from 'react';
import PropTypes from 'prop-types'

import Book from 'components/Book.js'
import ShelfChanger from 'components/ShelfChanger.js'

/** 
 * @description Represents a single shelf on a bookshelf
*/
const Shelf = props => {
    const { title, books, shelf, onChange } = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                {
                    (
                        <ol className="books-grid">
                            {
                                books.map((book, index) =>
                                    (
                                        <Book key={index} book={book}>
                                            <ShelfChanger value={shelf} onChange={(fromShelf, toShelf) => onChange(book, fromShelf, toShelf)} />
                                        </Book>
                                    ))
                            }
                        </ol>
                    )
                }
            </div>
        </div>
    );

}

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Shelf