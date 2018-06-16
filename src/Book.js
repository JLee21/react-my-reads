import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactResponsiveSelect from 'react-responsive-select';


// Will be a functional stateless Component.
// Props will contain object data about the book and also a handler for selecting
// the which bookshelf it belongs to.

// Only a single book object will be passed.

class Book extends Component {
  state = {
    selectedOption: ''
  }
  truncateTitle = title => {
    const maxLength = 30
    let toReturn = ''
    title.length < maxLength ? (
      toReturn  = title
    ) : (
      toReturn = `${title.slice(0,maxLength)}...`
    )
    return toReturn
  }
  render() {
    const { book, handleShelfChange } = this.props
    const { selectedOption } = this.state;
    const id = book.id
    const title = this.truncateTitle(book.title)
    const coverImageLink = book.imageLinks.thumbnail
    const authors = book.authors

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={
              { width: 128,
                height: 193,
                backgroundImage: `url(${coverImageLink})` }
            }>
          </div>
          <div className="book-shelf-changer">
            <select onChange={(event) => (handleShelfChange(book, event))}>
              <option value="move" selected disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Finished Reading</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {authors ? (
            authors.map((author, index) => (
              <div>{author}</div>
            ))
          ) : (
            <p>Author Unknown</p>
          )}
        </div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  handleShelfChange: PropTypes.func.isRequired,
}

export default Book