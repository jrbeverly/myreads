import React from 'react';
import { Link } from 'react-router-dom';

/** 
 * @description Represents the open search page action
*/
OpenSearch = () => {
    return (
        <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
    );
}

export default OpenSearch