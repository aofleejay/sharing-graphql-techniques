import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import logo from './logo.svg'
import './App.css'

const fetchBooks = gql`
  query fetchBooks {
    books {
      id
      title
      author {
        name
      }
    }
  }
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <Query query={fetchBooks}>
            {({ loading, error, data }) => {
              if (loading) return <p>loading...</p>
              if (error) return <p>error...</p>

              return data.books.map((book) => (
                <p key={book.id}>{book.title}</p>
              ))
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default App
