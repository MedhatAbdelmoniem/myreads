import React, { Component } from 'react'
import Books from './Books'
import * as BooksAPI from './BooksAPI'

class MainLists extends Component{
    state = {
        allBooks: [],
        currentBooks:[],
        wantBooks:[],
        readBooks:[]
      }
     
      changedValue = (e)=>{
          var bookChanged = {
              id:e.target.id
          }
            BooksAPI.update(bookChanged,e.target.value).then(()=>{
                BooksAPI.getAll().then((data)=>{
                    var tempallBooks = []
                    var tempcurrentBooks = []
                    var tempwantBooks = []
                    var tempreadBooks = []
        
                    data.forEach(book => {
                        tempallBooks.push(book)
                        if(book.shelf === 'currentlyReading'){
                        tempcurrentBooks.push(book)
                        }else if(book.shelf === 'wantToRead'){
                        tempwantBooks.push(book)
                        }else{
                        tempreadBooks.push(book)
                        }
                    })
                  this.setState(()=>({
                  allBooks: tempallBooks,
                  currentBooks: tempcurrentBooks,
                  wantBooks: tempwantBooks,
                  readBooks: tempreadBooks
                  }))
                }).catch((e)=>{
                  console.log(e)
                })
            })
        
      }
    componentDidMount(){

       
        BooksAPI.getAll().then((data)=>{
            var tempallBooks = []
            var tempcurrentBooks = []
            var tempwantBooks = []
            var tempreadBooks = []

            data.forEach(book => {
                tempallBooks.push(book)
                if(book.shelf === 'currentlyReading'){
                tempcurrentBooks.push(book)
                }else if(book.shelf === 'wantToRead'){
                tempwantBooks.push(book)
                }else{
                tempreadBooks.push(book)
                }
            })
          this.setState(()=>({
          allBooks: tempallBooks,
          currentBooks: tempcurrentBooks,
          wantBooks: tempwantBooks,
          readBooks: tempreadBooks
          }))
        }).catch((e)=>{
          console.log(e)
        })

      }

    render(){
        return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <Books booksList= { this.state.currentBooks } changedValue= {this.changedValue}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <Books booksList= { this.state.wantBooks } changedValue= {this.changedValue}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Books booksList= {this.state.readBooks} changedValue= {this.changedValue}/>  
                </div>
              </div>
            </div>
        </div>
        )
    }
}

export default MainLists