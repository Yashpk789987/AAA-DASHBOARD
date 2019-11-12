import React from 'react';
import { baseurl, endurl } from '../../../baseurl';
import { Form, Input, Button, Select, Spin } from 'antd';

import Alert from '../../Alert.js';
const Option = Select.Option;

export default class AddSubCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
      english_name: '',
      hindi_name: '',
      all_categories: [],
      category_id: 0,
      logo: null,
      showModal: false,
      modal_title: '',
      modal_message: '',
      UploadingData: false
    };
  }

  handleFile = e => {
    this.setState({ logo: e.target.files[0] });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSelectChange = value => {
    this.setState({ category_id: value });
  };
  componentDidMount() {
    fetch(
      `${baseurl}categories_and_sub_categories/fetch_all_categories/${endurl}`
    )
      .then(res => res.json())
      .then(data => this.setState({ all_categories: data }))
      .catch(err => console.log(err));
  }

  makeShowModalFalse = () => {
    this.setState({ showModal: false, UploadingData: false });
  };

  handleSubmit = () => {
    if (this.state.english_name === '') {
      this.setState({
        showModal: true,
        modal_title: 'Requirements',
        modal_message: 'Category Name In English Is Required'
      });
    } else if (this.state.category_id === 0) {
      this.setState({
        showModal: true,
        modal_title: 'Requirements',
        modal_message: 'Please Choose Category'
      });
    } else if (this.state.logo === null) {
      this.setState({
        showModal: true,
        modal_title: 'Requirements',
        modal_message: 'Please Upload Logo'
      });
    } else {
      this.setState({ UploadingData: true });
      let formData = new FormData();
      formData.append('SendData', JSON.stringify(this.state));
      formData.append('sub_category_image', this.state.logo);
      fetch(
        baseurl + `categories_and_sub_categories/add_sub_category/${endurl}`,
        {
          method: 'POST',
          body: formData
        }
      )
        .then(res => res.json())
        .then(data =>
          this.setState({
            english_name: '',
            hindi_name: '',
            category_id: 0,
            showModal: true,
            modal_title: 'Confirmation',
            modal_message: 'Sub Category Added Successfully... '
          })
        )
        .catch(err => {
          this.setState({
            showModal: true,
            modal_title: 'Server Error',
            modal_message: 'Please Contact Technical Team'
          });
          console.log(err);
        });
    }
  };

  render() {
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : null;
    const buttonItemLayout =
      formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : null;
    return (
      <div>
        <center>
          <h1>Add Sub Category </h1>{' '}
        </center>
        <Form layout={formLayout}>
          <Form.Item label='Select Category' {...formItemLayout}>
            {this.state.all_categories.length === 0 ? (
              <>
                <Spin /> Loading Categories ...{' '}
              </>
            ) : (
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder='Select Category '
                optionFilterProp='children'
                onChange={this.handleSelectChange}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.all_categories.map(category => {
                  return (
                    <Option value={`${category._id}`} key={category._id}>
                      {category.english_name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label='Sub Category Name(English)' {...formItemLayout}>
            <Input
              placeholder='Enter Sub Category In English'
              value={this.state.english_name}
              onChange={this.handleChange}
              name='english_name'
            />
          </Form.Item>
          <Form.Item
            label='Sub Category Name(Hindi)'
            {...formItemLayout}
            value={this.state.hindi_name}
            onChange={this.handleChange}
            name='hindi_name'
          >
            <Input
              placeholder='Enter Sub  Category In English'
              value={this.state.hindi_name}
              onChange={this.handleChange}
              name='hindi_name'
            />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            Attach Logo ( &nbsp;Required &nbsp;) &nbsp; : &nbsp;&nbsp;&nbsp;
            <Button type='primary'>
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
            <Button
              type='primary'
              loading={this.state.UploadingData}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        {this.state.showModal === true ? (
          <Alert
            makeShowModalFalse={this.makeShowModalFalse}
            title={this.state.modal_title}
            message={this.state.modal_message}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}
