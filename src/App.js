import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './Search';
import BookShelfs from './BookShelfs';

class BooksApp extends React.Component {
    
    state = { 
        searchedBooks: [],
        books: [],
        query: ''
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => this.setState({books}))
    };

    searchBooks = (query) => { 
        query.length > 0 ? this.setState({query:query}) : this.setState({query:''});

        if(query){
            BooksAPI.search(query).then((r) => {
                r.length > 0 ?  this.setState({searchedBooks:r}) : this.setState({searchedBooks: []});
            })}
    };

    moveBooks = (book, shelf) => {
        let books;

        if(this.state.books.findIndex( b => b.id === book.id) >= 0){
            books = this.state.books.map( b => {
                if(b.id === book.id){
                    return {...book, shelf};
                } else {
                    return b;
                }
            })
        } else {
            books = [...this.state.books, {...book,shelf}];
        } 

        this.setState({books})

        BooksAPI.update(book, shelf).then((r) => {
        })

    };

    resetQuery = (query) => this.setState({query:query});

    render() {
        return (
            <div className="app">
                <Route exact path ="/search" render={() => (
                        <Search 
                            searchedBooks={this.state.searchedBooks}
                            myBooks={this.state.books}
                            onSearchBooks={query => this.searchBooks(query)}
                            clearQuery={query => this.resetQuery(query)}
                            onMovingBooks ={(book, shelf) => this.moveBooks(book,shelf)} 
                            queryValue={this.state.query}   
                            />
                    )
                                                    }
                    />
                <Route exact path="/" render={() => (
                        <BookShelfs
                            myBooks={this.state.books}
                            onMovingBooks ={(book, shelf) => this.moveBooks(book,shelf)}
                            />
                    )
                                             }
                />
            </div>
        )
    };
}

export default BooksApp
