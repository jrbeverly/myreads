import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired
    }

    render() {
        const { book, children } = this.props;

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
        )
    }
}

export default Book
