import React from 'react'
import { Route } from 'react-router-dom'

import BookSearch from './components/BookSearch.js'
import BookList from './components/BookList.js'

import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BookList} />
        <Route path="/search" component={BookSearch} />
      </div>
    )
  }
}

export default BooksApp