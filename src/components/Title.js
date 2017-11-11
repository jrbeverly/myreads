import React, { Component } from 'react';

class Title extends Component {

    render() {
        const title = "MyReads";

        return (
            <div className="list-books-title">
                <h1>{ title }</h1>
            </div>
        )
    }
}

export default Title
