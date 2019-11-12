import React from 'react';
import { baseurl, endurl } from '../../../baseurl';
import { Form, Input, Button, Select, Spin, Progress } from 'antd';

import Alert from '../../Alert.js';
import axios from 'axios';

const Option = Select.Option;

export default class UploadPdf extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
      english_name: '',
      hindi_name: '',
      all_sub_categories: [],
      sub_category_id: 0,
      showModal: false,
      modal_title: '',
      modal_message: '',
      UploadingData: false,
      pdf: null,
      fileprogress: 0
    };
  }

  handleFile = e => {
    this.setState({ pdf: e.target.files[0] });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSelectChange = value => {
    for (let i = 0; i < this.state.all_sub_categories.length; i++) {
      if (this.state.all_sub_categories[i]._id === parseInt(value)) {
        this.setState({
          english_name: this.state.all_sub_categories[i].english_name
        });
        break;
      }
    }
    this.setState({ sub_category_id: value });
  };

  componentDidMount() {
    fetch(
      `${baseurl}categories_and_sub_categories/fetch_all_sub_categories/${endurl}`
    )
      .then(res => res.json())
      .then(data => this.setState({ all_sub_categories: data }))
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
    } else if (this.state.sub_category_id === 0) {
      this.setState({
        showModal: true,
        modal_title: 'Requirements',
        modal_message: 'Please Choose Sub  Category'
      });
    } else if (this.state.pdf === null) {
      this.setState({
        showModal: true,
        modal_title: 'Requirements',
        modal_message: 'Please Upload Pdf File'
      });
    } else {
      this.setState({ UploadingData: true, fileprogress: 0 });
      let formData = new FormData();
      formData.append('SendData', JSON.stringify(this.state));
      formData.append('pdf', this.state.pdf);
      axios
        .request({
          method: 'post',
          url: baseurl + `pdf/upload_pdf/${endurl}`,
          data: formData,
          onUploadProgress: p => {
            this.setState({
              fileprogress: p.loaded / p.total
            });
          }
        })
        .then(data => {
          this.setState({
            english_name: '',
            hindi_name: '',
            sub_category_id: 0,
            showModal: true,
            modal_title: 'Confirmation',
            modal_message: 'Pdf Uploaded  Successfully... '
          });
          this.setState({
            fileprogress: 1.0
          });
        })
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
          <h1>Upload Pdf</h1>{' '}
        </center>
        <Form layout={formLayout}>
          <Form.Item label='Select Sub Category' {...formItemLayout}>
            {this.state.all_sub_categories.length === 0 ? (
              <>
                <Spin /> Loading Categories ...{' '}
              </>
            ) : (
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder='Select Sub  Category '
                optionFilterProp='children'
                onChange={this.handleSelectChange}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.all_sub_categories.map(sub_category => {
                  return (
                    <Option
                      value={`${sub_category._id}`}
                      key={sub_category._id}
                    >
                      {sub_category.english_name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label='Pdf Name(English)' {...formItemLayout}>
            <Input
              placeholder='Enter Pdf In English'
              value={this.state.english_name}
              onChange={this.handleChange}
              name='english_name'
            />
          </Form.Item>
          <Form.Item
            label='Pdf  Name (Hindi)'
            {...formItemLayout}
            value={this.state.hindi_name}
            onChange={this.handleChange}
            name='hindi_name'
          >
            <Input
              placeholder='Enter Pdf Name In Hindi'
              value={this.state.hindi_name}
              onChange={this.handleChange}
              name='hindi_name'
            />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            Attach Pdf File ( &nbsp;Required &nbsp;) &nbsp; : &nbsp;&nbsp;&nbsp;
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
          <Progress percent={this.state.fileprogress * 100} status='active' />
          <Form.Item {...buttonItemLayout}>
            <Button
              type='primary'
              loading={this.state.UploadingData}
              onClick={this.handleSubmit}
            >
              Upload
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
