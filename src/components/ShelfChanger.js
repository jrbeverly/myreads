import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** 
 * @description Represents an element responsible for moving a book between shelves
*/
class ShelfChanger extends Component {
    
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            select: this.props.value || 'none'
        };
    }    

    /**
    * @description Receives notification that the dropdown's state has changed
    * @param {object} e - An object that contains event data
    * @param {func} onChange - A function that is notified that the dropdown's state has changed
    */
    onStateChange(e, onChange) {
        const value = e.target.value;
        onChange(this.state.select, value);

        this.setState({
            select: value,
        })
    }

    render() {
        const { onChange } = this.props;

        return (
            <select onChange={(e) => this.onStateChange(e, onChange)} value={this.state.select}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        );
    }
}

export default ShelfChanger