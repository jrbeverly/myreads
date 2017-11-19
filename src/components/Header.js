import React from 'react';

/** 
 * @description Represents the titlebar of the webpage
*/
Header = () => {
    const title = "MyReads";

    return (
        <div className="list-books-title">
            <h1>{title}</h1>
        </div>
    );
}

export default Header