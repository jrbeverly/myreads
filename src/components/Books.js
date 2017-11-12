import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book.js'

class Books extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    }

    render() {
        const { books, onChange } = this.props;
        return (
            <div className="bookshelf-books">
                {
                    (
                        <ol className="books-grid">
                            {
                                books.map((book, index) =>
                                    (
                                        <Book key={index} title={book.title} authors={book.authors} url={book.url} onChange={ onChange } />
                                    ))
                            }
                        </ol>
                    )
                }
            </div>
        )
    }
}

export default Books