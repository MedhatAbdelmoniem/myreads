import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Books extends Component{

  state = {
    currentBooks:[],
    wantBooks:[],
    readBooks:[]
  }
     
  componentDidMount(){

       
    BooksAPI.getAll().then((data)=>{
        var tempcurrentBooks = []
        var tempwantBooks = []
        var tempreadBooks = []

        data.forEach(book => {
            if(book.shelf === 'currentlyReading'){
            tempcurrentBooks.push(book)
            }else if(book.shelf === 'wantToRead'){
            tempwantBooks.push(book)
            }else{
            tempreadBooks.push(book)
            }
        })
      this.setState(()=>({
      currentBooks: tempcurrentBooks,
      wantBooks: tempwantBooks,
      readBooks: tempreadBooks
      }))
    }).catch((e)=>{
      console.log(e)
    })

  }

  check = (id)=>{
    var shelfOfID = 'none'
    this.state.currentBooks.forEach(book =>{
      if(book.id === id){
        shelfOfID = book.shelf
        return shelfOfID
      }
    })

    this.state.wantBooks.forEach(book =>{
      if(book.id === id){
        shelfOfID = book.shelf
        return shelfOfID
      }
    })
    this.state.readBooks.forEach(book =>{
      if(book.id === id){
        shelfOfID = book.shelf
        return shelfOfID
      }
    })

    

    return shelfOfID
  }

   
    render(){
        var {booksList, changedValue} = this.props 
        return(
            <div className="bookshelf-books">
            <ol className="books-grid">
                {booksList?  booksList.map((book)=>(
                    <li key= {book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  book.imageLinks !== undefined ? 'url('+  book.imageLinks.thumbnail + ')' : 'none'}}></div>
                        <div className="book-shelf-changer">
                          <select onChange={changedValue} value={book.shelf ? book.shelf : this.check(book.id)} id={book.id} >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors && book.authors.map((b)=>b)}</div>
                    </div>
                  </li>
                )) :
                <div></div>
            }
              
            </ol>
          </div>
        )
    }
}

export default Books