import React from 'react'

import {
    Form, Input, Button
} from 'antd';

import { baseurl , endurl} from '../../../baseurl'
import Alert from '../../Alert.js'


export default class AddCategory extends React.Component {
    constructor() {
      super();
      this.state = {
        formLayout: 'horizontal',
        english_name : '',
        hindi_name : '',
        UploadingData : false,
        showModal : false,
        modal_title : '',
        modal_message : ''
      };
    }
  
    makeShowModalFalse = () => {
      this.setState({ showModal : false , UploadingData : false,})
    }

    handleChange = (event) => {
        this.setState({ [event.target.name] : event.target.value })
    }
    
    handleSubmit = () => {
        if(this.state.english_name === ''){
            this.setState( { showModal : true , title : 'Requirements' , modal_message : "Category Name In English Is Required"})
        }
        else {
            this.setState({ UploadingData : true })
            fetch(baseurl+`categories_and_sub_categories/add_category/${endurl}` , {
                method : 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(this.state)
            })
            .then((res) => res.json())
            .then((data) => this.setState( { english_name : '' , hindi_name : '' , showModal : true , title : 'Confirmation' , modal_message : data.message}))
            .catch(err => { this.setState( { showModal : true , title : 'Server Error ' , modal_message : "Please Contact To Technical Team "}); console.log(err)})
        }
    }

    render() {
      const { formLayout } = this.state;
      const formItemLayout = formLayout === 'horizontal' ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      } : null;
      const buttonItemLayout = formLayout === 'horizontal' ? {
        wrapperCol: { span: 14, offset: 4 },
      } : null;
      return (
        <div>
          <center><h1>Add Category </h1>  </center>
          <Form layout={formLayout}>
            <Form.Item
              label="Category Name(English)"
              {...formItemLayout}
            >
            <Input placeholder="Enter Category In English" 
                value = {this.state.english_name}
                onChange = {this.handleChange}
                name = 'english_name'
            />
            </Form.Item>
            <Form.Item
              label="Category Name(Hindi)"
              {...formItemLayout}
              value = {this.state.hindi_name}
              onChange = {this.handleChange}
              name = 'hindi_name'
            >
            <Input placeholder="Enter Category In English" 
              value = {this.state.hindi_name}
              onChange = {this.handleChange}
              name = 'hindi_name'
            />  
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
                <Button type="primary" loading={this.state.UploadingData} onClick={this.handleSubmit}>
                  Submit
                </Button>
            </Form.Item>
          </Form>
          {this.state.showModal === true ? <Alert makeShowModalFalse = {this.makeShowModalFalse} title = {this.state.modal_title} message = {this.state.modal_message} /> : <></>}
        </div>
      );
    }
  } 
