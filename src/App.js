


import React from 'react'
import Main from './components/Main.js'
import './App.css';

export default class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log(new Date())
  }
  render() {
    return (
      <Main />  
    );
  }
}

