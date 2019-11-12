import React from 'react';
import Main from './components/Main.js';
import './App.css';
//import Login from './components/Login.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <Main />
      // <Login />
    );
  }
}
