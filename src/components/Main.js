import React from 'react'
import DashBoard from './DashBoard/index'
import Login from './Login'
import { Switch , Route , Link  } from 'react-router-dom'

export default class Main extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {}
  }
  componentDidMount() {}
  render() {
    return (
     <>
     <Switch>
          <Route exact path = '/login' render = {(props) => <Login {...props} />} />
          <Route path = '/dashboard' render = {(props) => <DashBoard {...props} />} />
      </Switch>  
      </>
    );
  }
}

