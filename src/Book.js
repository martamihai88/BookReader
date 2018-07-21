import React from 'react'
import { Route } from 'react-router-dom'

class Book extends React.Component {
    
    state = {
        shelf:'none'
    }
    
    updateBook = (book, shelf) => this.props.updateBook(book,shelf);

    render() {
        const { book,id,shelf } = this.props;
        
        return (
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'http://via.placeholder.com/128x193'})` }}></div>
                        <div className="book-shelf-changer">
                            <select  onChange={(event)=> this.updateBook(book,event.target.value)} value={this.props.currentShelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors ? book.authors : " "}</div>
                </div>
        )
    }
}

export default Book