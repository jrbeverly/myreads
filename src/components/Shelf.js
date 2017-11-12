import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Books from './Books.js'

class Shelf extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    }

    render() {
        const { title, books, onChange } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ title }</h2>
                <Books books={ books } onChange={ onChange }/>
            </div>
        )
    }
}

export default Shelf