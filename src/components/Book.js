import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        title: PropTypes.string,
        url: PropTypes.string,
        authors: PropTypes.string,
        onChange: PropTypes.func.isRequired
    }

    render() {
        const { title, url, authors, onChange } = this.props

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ backgroundImage: `url(${url})` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={ e => onChange(title, e.target.value) }>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{ authors }</div>
                </div>
            </li>
        )
    }
}

export default Book
