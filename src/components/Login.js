import React from 'react'

export default class Login  extends React.Component {
    handleLogin = () => {
        localStorage.setItem("authenticated" , "true")
        this.props.history.push('/dashboard')
    }
    render() {
        return(
        <div>
            <button onClick = {() => this.handleLogin()}> Click To Login </button>
        </div>
        )
    }
}