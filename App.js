import React, { Component } from 'react'
import './styles/style.css'
import Header from './components/header'
import Main from './components/main'

class App extends Component {

  render() {

    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}

export default App