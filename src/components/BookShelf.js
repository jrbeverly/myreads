import React, { Component } from 'react';
import * as BooksAPI from 'api/BooksAPI'
import Shelf from 'components/Shelf.js'

class BookShelf extends Component {

    state = {
        shelves: {
            currentlyReading: [],
            wantToRead: [],
            read: []
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            books.forEach(book => {
                this.add(book.shelf, book);
            });
        })
    }

    /**
     * Moves a book to a shelf.
     *
     * @param {object} book
     * @param {string} fromShelf
     * @param {string} toShelf     
     * @public
     */
    move(book, fromShelf, toShelf) {
        this.remove(fromShelf, book);
        this.add(toShelf, book);
    }

    /**
     * Adds a book to a shelf.
     *
     * @param {string} shelf
     * @param {object} book
     * @public
     */
    add(shelf, book) {
        const shelves = this.state.shelves;
        (shelves[shelf] = shelves[shelf] || []).push(book);

        this.setState(
            {
                shelves: shelves
            }
        );
    }

    /**
     * Removes a book from a shelf.
     *
     * @param {string} shelf
     * @param {object} book
     * @public
     */
    remove(shelf, book) {
        const shelves = this.state.shelves;
        shelves[shelf] = (shelves[shelf] || []).filter((b) => b.id !== book.id);

        this.setState(
            {
                shelves: shelves
            }
        );
    }

    render() {
        return (
            <div className="list-books-content">
                <div>
                    <Shelf title="Currently Reading" shelf="currentlyReading" books={this.state.shelves.currentlyReading} onChange={ (book, fromShelf, toShelf) => this.move(book, "currentlyReading", toShelf) } />
                    <Shelf title="Want to Read" shelf="wantToRead" books={this.state.shelves.wantToRead} onChange={ (book, fromShelf, toShelf) => this.move(book, "wantToRead", toShelf) } />
                    <Shelf title="Read" shelf="read" books={this.state.shelves.read} onChange={ (book, fromShelf, toShelf) => this.move(book, "read", toShelf) } />
                </div>
            </div>
        )
    }
}

export default BookShelf