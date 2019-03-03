import React from 'react'
import MakeTest from '../MakeTest/index'
import ShowTest from '../ShowTest/index'

export default class MakeTestWrapper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            testCreated : false,
            createdTest : {}
        }
    }
    createTest = (createdTest) => {
        this.setState({ testCreated : true , createdTest : createdTest })
    }

    render(){
        if(this.state.testCreated === false){
            return <MakeTest createTest = {this.createTest} />
        } else {
            return <ShowTest test = {this.state.createdTest} />
        }
    }
}