import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
class Search extends Component {
    
    addBooks = (book, shelf) =>  this.props.onMovingBooks(book, shelf);

    updateQuery = (query) => this.props.onSearchBooks(query);
    
    resetQuery = (query) => this.props.clearQuery(query);
    
    render() {
        
        const { searchedBooks } = this.props;
        const { queryValue } = this.props;
        let shownBooks = [];
        
        if(queryValue)
        shownBooks = searchedBooks;
        
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search"  to="/" onClick={() => this.resetQuery('')}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                        type="text"
                        value={queryValue} 
                        placeholder="Search by title or author"
                        onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {shownBooks.map((searchedBook) => {
                            let shelf = "none";
                            this.props.myBooks.map(b => {b.id === searchedBook.id ? shelf = searchedBook.shelf : ""})
                            return ( 
                                <li key={searchedBook.id}>
                                    <Book 
                                        book={searchedBook}
                                        updateBook={(book,shelf) => this.addBooks(book,shelf)}
                                        currentShelf={shelf}
                                        />
                                </li>
                            )
                        }
                                       )
                        }
                    </ol>
                </div>
            </div>
        )
    };
}
export default Search