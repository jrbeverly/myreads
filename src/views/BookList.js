import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

import Header from 'components/Header.js'
import BookShelf from 'components/BookShelf.js'
import OpenSearch from 'components/OpenSearch.js'

/**
 * @description Represents the bookshelf and all connected elements
*/
class BookList extends Component {

    static propTypes = {
        shelves: PropTypes.object.isRequired,
        onStateChanged: PropTypes.func.isRequired,
        isReady: PropTypes.bool.isRequired
    }

    render() {
        const { shelves, onStateChanged, isReady } = this.props;

        return (
            <div className="list-books">
                <Header />
                {
                    isReady
                        ?
                        (
                            <BookShelf shelves={shelves} onStateChanged={onStateChanged} isReady={isReady} />
                        )
                        :
                        (
                            <div className="loading">
                                <ReactLoading type="bars" color="#444" width="150px" />
                            </div>
                        )
                }

                <OpenSearch />
            </div>
        );
    }
}

export default BookList