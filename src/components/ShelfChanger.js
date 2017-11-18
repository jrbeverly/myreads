import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShelfChanger extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired
    }

    state = {
        select: this.props.value || 'none'
    }

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
            <select onChange={(e) => this.onStateChange(e, onChange) } value={this.state.select}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        )
    }
}

export default ShelfChanger