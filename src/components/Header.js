import React from 'react';

/**
 * The header for the application bookshelf.
 */
function Header() {
    const title = "MyReads";

    return (
        <div className="list-books-title">
            <h1>{ title }</h1>
        </div>
    )
}

export default Header