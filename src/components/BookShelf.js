import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import update from 'immutability-helper';

import Shelf from 'components/Shelf.js'

import * as BooksAPI from 'api/BooksAPI'

/** 
 * @description Represents a bookshelf, containing a collection of shelves
*/
class BookShelf extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shelves: {
                currentlyReading: [],
                wantToRead: [],
                read: []
            },
            ready: false
        };
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            books.forEach(book => {
                this.add(book.shelf, book);
            });

            this.setState(
                {
                    ready: true
                }
            );
        })
    }

    /**
     * @description Moves a book between shelves
     * @param {object} book - The book to move between shelves
     * @param {string} fromShelf - The current shelf of the book
     * @param {string} toShelf - The shelf to move to the book to
     */
    move(book, fromShelf, toShelf) {
        BooksAPI.update(book, toShelf).then(() => {
            this.remove(fromShelf, book);
            toShelf !== 'none' && this.add(toShelf, book);
        });
    }

    /**
     * @description Adds a book to the specified shelf
     * @param {string} shelf - The shelf
     * @param {object} book - The book to be added to the shelf
     */
    add(shelf, book) {
        this.setState((prevState) => ({
            shelves: update(prevState.shelves, {
                [shelf]: { $push: [book] }
            })
        }));
    }

    /**
     * @description Removes a book from the specified shelf
     * @param {string} shelf - The shelf
     * @param {object} book - The book to remove from the shelf
     */
    remove(shelf, book) {
        this.setState((prevState) => ({
            shelves: update(prevState.shelves, {
                [shelf]: { $splice: [[ (prevState.shelves[shelf].findIndex((b) => b.id === book.id)), 1]] }
            })
        }));
    }

    render() {
        return (
            <div className="list-books-content">
                {
                    this.state.ready
                        ?
                        (
                            <div>
                                <Shelf title="Currently Reading" shelf="currentlyReading" books={this.state.shelves.currentlyReading} onChange={(book, fromShelf, toShelf) => this.move(book, "currentlyReading", toShelf)} />
                                <Shelf title="Want to Read" shelf="wantToRead" books={this.state.shelves.wantToRead} onChange={(book, fromShelf, toShelf) => this.move(book, "wantToRead", toShelf)} />
                                <Shelf title="Read" shelf="read" books={this.state.shelves.read} onChange={(book, fromShelf, toShelf) => this.move(book, "read", toShelf)} />
                            </div>
                        )
                        :
                        (
                            <div className="loading">
                                <ReactLoading type="bars" color="#444" width="150px" />
                            </div>
                        )
                }
            </div>
        );
    }
}

export default BookShelf