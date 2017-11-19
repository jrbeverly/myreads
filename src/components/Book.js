import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** 
 * @description Represents a book
*/
const Book = (props) => {
    const { book, children } = props;

    const image = (book.imageLinks && (book.imageLinks.thumbnail || book.imageLinks.smallThumbnail));
    const coverClass = ['book-cover'];

    if (image === undefined) {
        coverClass.push('book-no-cover');
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className={coverClass.join(' ')}
                        style={image && { backgroundImage: `url(${image})` }}>
                    </div>
                    <div className="book-shelf-changer">
                        {children}
                    </div>
                </div>
                <div className="book-title">{book.title ? book.title : null}</div>
                <div className="book-authors">{book.authors ? book.authors.join(', ') : null}</div>
            </div>
        </li>
    );
}

Book.propTypes = {
    book: PropTypes.object.isRequired
}

export default Book
