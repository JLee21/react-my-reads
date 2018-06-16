import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import * as BooksAPI from './utils/BooksAPI'
import Book from './Book'

class Search extends Component {
  state = {
    query: '',
    books: []
  }
  onInputChange = query => {
    this.updateQuery(query);
    this.searchBooks(query);
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }
  searchBooks = query => (
    BooksAPI.search(query)
      .then(books => {
        this.setState({books})
      })
  )
  hideSelectedBook = book => {
    const books = this.state.books;
    const showBooks = books.filter( _book => _book.id !== book.id)
    this.setState({books: showBooks})
  }
  handleShelfChangeWrapper = (book, event) => {
    this.hideSelectedBook(book);
    this.props.handleShelfChange(book, event);
  }
  render() {
    const { query, books } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to='/'>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={this.onInputChange}
              placeholder="Search by title or author"
              onChange={(event) => this.onInputChange(event.target.value)}
              autoFocus
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query.length > 0 && books.length > 0 && (
              books.map((book) => (
                <li key={book.id}>
                  <Book
                    book={book}
                    handleShelfChange={this.handleShelfChangeWrapper}
                  />
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  handleShelfChange: PropTypes.func.isRequired,
};

export default Search