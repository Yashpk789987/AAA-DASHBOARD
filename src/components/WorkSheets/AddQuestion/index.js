import React from 'react'
import { baseurl , endurl } from '../../../baseurl'
import {
    Form, Input, Button, Select , Row, Col , Icon ,  Spin 
} from 'antd';
 
import Alert from '../../Alert'

import { encoded_data } from '../../../encoded_data'

const { TextArea } = Input;
const Option = Select.Option;

export default class AddQuestion extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            "english_text" : '',
            "hindi_text" : '',
            "all_sub_categories" : [],
            formLayout: 'horizontal',
            options : [],
            correct_option_index : null,
            sub_category_id : 0,
            pic : null , 
            UploadingData : false,
            showModal : false,
            modal_title : '',
            modal_message : '',
            type : ''
        }
    }
    
    makeShowModalFalse = () => {
      this.setState({ showModal : false , UploadingData : false,})
    }

    validateForm = () => {
      let validateOptions = () => {
        for(let i = 0 ; i  < this.state.options.length ; i++){
          if(this.state.options[i].english_text === '' ){
            return false
          }
        }
        return true
      }
      const { sub_category_id , english_text , correct_option_index , options , type } = this.state
      if(sub_category_id === 0){
        this.setState({ showModal : true , modal_title : 'Requirements' , modal_message : 'Please Choose Category'})
        return false
      }else if(type === ''){
        this.setState({ showModal : true , modal_title : 'Requirements' , modal_message : 'Please Enter Type '})
        return false
      }else if(english_text === ''){
        this.setState({ showModal : true , modal_title : 'Requirements' , modal_message : 'Please Type The Question'})
        return false
      }else if(options.length === 0){
        this.setState({ showModal : true , modal_title : 'Requirements' , modal_message : 'Please Make Options'})
        return false
      }
      else if(validateOptions() === false){
        this.setState({ showModal : true , modal_title : 'Requirements' , modal_message : 'Please Fill All The Options'})
         return false
      }else if(correct_option_index === 0){
        this.setState({ showModal : true , modal_title : 'Requirements' , modal_message : 'Please Fill Correct Option Field'})
        return false
      }else if(correct_option_index > options.length || correct_option_index < 1){
        this.setState({ showModal : true , modal_title : 'Requirements' , modal_message : 'Invalid Option'})
        return false
      } else {
        return true
      }
    }


    handleChange = (event) => {
        let found = false ;
        for(let i = 0 ; i < encoded_data.length ; i++){
          if(event.target.value.indexOf(encoded_data[i].name) !== -1){
            found = true
            this.setState({ [event.target.name] : event.target.value.replace(encoded_data[i].name,encoded_data[i].js_code) })  
            break ;
          }
        }
        if(!found){
          this.setState({ [event.target.name] : event.target.value })  
        }
    }

    handleOptionChange = (index , event) => {
      event.persist();
      let object = {};
      let found = false ;
      for(let i = 0 ; i < encoded_data.length ; i++){
        if(event.target.value.indexOf(encoded_data[i].name) !== -1){
          found = true
          object = Object.assign(this.state.options[index] , { [event.target.name] : event.target.value.replace(encoded_data[i].name,encoded_data[i].js_code)})
          break ;
        }
      }
      if(!found){
         object = Object.assign(this.state.options[index] , { [event.target.name] : event.target.value})
      }
      this.setState(state => ({ [state.options[index]] : object}))
    }
  

    handleSelectChange = (value) => {
      this.setState({ sub_category_id : value })
    }
    
    handleSubmit = (e) => {
        if(this.validateForm() === true){
          let custome_url = `questions/add_without_image/${endurl}`
          this.setState({ UploadingData : true})
          let formData = new FormData()
          const sendData = {
            "english_text" : this.state.english_text,
            "hindi_text" : this.state.hindi_text,
            options : this.state.options,
            correct_option_index : this.state.correct_option_index,
            sub_category_id : this.state.sub_category_id,
            type : this.state.type
          }
          formData.append("SendData" , JSON.stringify(sendData))
          if(this.state.pic !== null ){
          custome_url = `questions/add_with_image/${endurl}`;  
          formData.append("question_image" , this.state.pic)}
          fetch(baseurl+custome_url , {
              method : 'POST',
              body : formData
          })
          .then((res) => res.json())
          .then((data) => {this.setState({ UploadingData : false ,
            "english_text" : '',
            "hindi_text" : '',
            formLayout: 'horizontal',
            options : [],
            correct_option_index : null,
            sub_category_id : 0,
            pic : null , 
            showModal : true,
            modal_title : 'Confirmation',
            modal_message : 'Question Added Successfully'});})
          .catch(err => {this.setState({showModal : true , modal_title : 'Server Error' , modal_message : 'Please Contact To Technical Team'});console.log(err)})
      } else {}
    }

    handleFile = (e) => {
      this.setState({ pic : e.target.files[0]})
    }

    handleAppendButton = () => {
        const newOption = {
          "english_text" : '',
          "hindi_text" : '',
          "question_id" : ''
        }
        this.setState(state => ({
          options : state.options.concat(newOption)
        }))
    }

    componentDidMount(){
        fetch(`${baseurl}categories_and_sub_categories/fetch_all_sub_categories/${endurl}`)
        .then(res => res.json())
        .then(data => this.setState({ all_sub_categories : data}))
        .catch(err => console.log(err))
    }
    render(){
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
            <center><h1>Add Question</h1></center>
            <Form layout={formLayout} action = '#' method = 'post'  encType = 'multipart/form-data'  >
              <Form.Item
                label="Select Sub Category"
                {...formItemLayout}
              >  
                {this.state.all_sub_categories.length === 0 ? (<><Spin /> Loading Sub Categories ... </>) : (<Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select Sub Category "
                optionFilterProp="children"
                onChange={this.handleSelectChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            > 
                {this.state.all_sub_categories.map(sub_category => {
                    return(
                        <Option value = {`${sub_category._id}`} key = {sub_category._id}>{sub_category.english_name}</Option>
                    )
                })}
                </Select>)}
              </Form.Item>
              <Form.Item label="Enter Type"
                {...formItemLayout}>
                  <Input size="large" name = "type" placeholder="Enter Type" onChange = {this.handleChange} />
              </Form.Item>
              <Form.Item label="Question"
                {...formItemLayout}>
                <Row>
                    <Col span={10}><TextArea name = "english_text" value = {this.state.english_text} rows={4} placeholder = "In English" onChange = {this.handleChange} /></Col>
                    <Col span={10} offset={1}><TextArea name = "hindi_text" value = {this.state.hindi_text} rows={4} placeholder = "In Hindi" onChange = {this.handleChange} /></Col>
                </Row>
              </Form.Item>
              <div style = {{ float : "right" , paddingRight : "10%"}}>
                <Button  type="primary" onClick = {this.handleAppendButton} >
                    Add Option<Icon type="plus-square" />
                </Button>
              </div>
              <br/>
              <br/>
              {this.state.options.map((option,index) => {
                return <QuestionOption key = {index} option = {option} index = {index} handleOptionChange = {this.handleOptionChange} />
              })}
              <Form.Item label="Correct Option"
                {...formItemLayout}>
                <Input type = {`number`} max = {this.state.options.length} min = {1}
                value = {this.state.correct_option_index} onChange = {this.handleChange} name = 'correct_option_index'  />
              </Form.Item>
              <Form.Item {...buttonItemLayout}  >
                Attach Image &nbsp; : &nbsp;&nbsp;&nbsp;
                <Button  type="primary" >
                <label for='upload-photo' style={{ paddingTop: '5%' }}>
                  Browse File
                </label>
                <input
                  type='file'
                  id='upload-photo'
                  onChange={e => this.handleFile(e)}
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    zIndex: -1
                  }}
                />
                </Button>
              </Form.Item>
              <Form.Item {...buttonItemLayout}>
                  <Button type="primary" loading={this.state.UploadingData} onClick={this.handleSubmit}>
                    Submit
                  </Button>
              </Form.Item>
            </Form>
            {this.state.showModal === true ? <Alert makeShowModalFalse = {this.makeShowModalFalse} title = {this.state.modal_title} message = {this.state.modal_message} /> : <></>}
          </div>
        )
    }
}



class QuestionOption extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      formLayout: 'horizontal',
      english_text : ''
    }
  }
  componentDidMount(){}
  
  render(){
    const { formLayout } = this.state;
            const formItemLayout = formLayout === 'horizontal' ? {
              labelCol: { span: 4 },
              wrapperCol: { span: 14 },
            } : null;
           
     return(
      <Form.Item label = {`Option ${this.props.index + 1}`}
      {...formItemLayout}>
      <Row>
          <Col span={10}><Input value = {this.props.option.english_text} size="large" name = "english_text" placeholder="Type In English" onChange = {(event) => this.props.handleOptionChange(this.props.index,event)} /></Col>
          <Col span={10} offset={1}><Input value = {this.props.option.hindi_text} size="large" name = "hindi_text" placeholder="Type In Hindi" onChange = {(event) => this.props.handleOptionChange(this.props.index,event)} /></Col>
      </Row>
    </Form.Item>
     )
  }
}







