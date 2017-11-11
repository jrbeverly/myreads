import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Books from './Books.js'

class Shelf extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    }

    render() {
        const { title, books } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ title }</h2>
                <Books books={ books } />
            </div>
        )
    }
}

export default Shelf