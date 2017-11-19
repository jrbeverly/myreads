import React from 'react'
import { Route } from 'react-router-dom'

import BookSearch from 'views/BookSearch.js'
import BookList from 'views/BookList.js'

import 'App.css'

/** 
 * @description The entrypoint on the application.
*/
const BooksApp = () => {
  return (
    <div className="app">
      <Route exact path="/" component={BookList} />
      <Route path="/search" component={BookSearch} />
    </div>
  )
}

export default BooksApp