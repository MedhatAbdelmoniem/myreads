import React from 'react'
import './App.css'
import MainLists from './Main'
import Search from './Search'
import { BrowserRouter, Link , Route} from 'react-router-dom'
class BooksApp extends React.Component {
  state = {
    values: '',
    showSearchPage: false,
  }
 
  changeValue = (e)=>{
    var value = e.target.value.trim()
    this.setState(()=>({
      values: value
    }))
  }

 

  render() {
    return (
      <BrowserRouter>
      <div className="app">
         <Route path='/search' render={
           ()=>(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className='close-search'/>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.changeValue}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                <Search bookName= {this.state.values}/> 
              </ol>
            </div>
          </div>
           )
         }/>
         
         
          <Route exact path='/' render={
            ()=>(
              <div className="list-books">
              <MainLists/> 
             <div className="open-search">
              <Link to='/search'>  Add a book</Link>
             </div>
           </div>
            )
          }/>
        
   
      </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
