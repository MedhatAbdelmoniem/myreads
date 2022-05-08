import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

class Search extends Component{

    state = {
        searchedBooks: [],
        query: ''
      }
    changedValue = (e)=>
    {
        var bookChanged = {
            id:e.target.id
        }
          BooksAPI.update(bookChanged,e.target.value).catch((e)=>{
                console.log(e)
              })
          
      
         }
      componentDidUpdate(){
          this.state.query !== '' && (
            BooksAPI.search(this.state.query.trim()).then((data)=>{
                
                data.error && (
                    this.setState((old)=>({
                        searchedBooks: [],
                        query: old.query
                    }))
                )
                !data.error && (
                    this.setState((old)=>({
                        searchedBooks: data,
                        query: old.query
                    }))
                )
            })
          )
       this.props.bookName !== this.state.query && (
        this.setState(()=>({
            query: this.props.bookName
         }))
       )
      }
     
    
    render(){
        return(
            <Books booksList= {this.state.query === '' ? [] :this.state.searchedBooks } changedValue= {this.changedValue}/>   
        )
    }

}

export default Search