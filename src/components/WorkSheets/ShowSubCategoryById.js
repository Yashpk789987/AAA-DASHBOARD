import React from 'react';
import { baseurl, endurl } from '../../baseurl';
import { Spin, Row, Col, Input, Select, Button } from 'antd';
import Alert from '../Alert';

const Option = Select.Option;

export default class ShowSubCategoryById extends React.Component {
  state = {
    _id: '',
    loading: false,
    english_name: '',
    hindi_name: '',
    category_id: '',
    logo: '',
    categories: [],
    UploadingData: false,
    showModal: false,
    modal_title: '',
    modal_message: '',
    uploading_logo: null
  };

  makeShowModalFalse = () => {
    this.setState({ showModal: false, UploadingData: false });
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ loading: true, _id: id });
    fetch(
      `${baseurl}categories_and_sub_categories/fetch_sub_category_by_id/${id}/${endurl}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          english_name: data.english_name,
          hindi_name: data.hindi_name,
          category_id: data.category_id,
          logo: data.logo
        });
        fetch(
          `${baseurl}categories_and_sub_categories/fetch_all_categories/${endurl}`
        )
          .then(res => res.json())
          .then(data => {
            this.setState({ categories: data, loading: false });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  handleChange = value => {
    this.setState({ category_id: value });
  };

  handleChooseImage = e => {
    this.setState({ uploading_logo: e.target.files[0] });
  };

  handleUpdateLogo = () => {
    if (this.state.uploading_logo === null) {
      alert('Please Choose Image ....');
    } else {
      this.setState({ UploadingData: true });
      let sendData = new FormData();
      sendData.append('_id', this.state._id);
      sendData.append('logo', this.state.uploading_logo);
      this.setState({ UploadingData: true });
      fetch(
        baseurl +
          `categories_and_sub_categories/update_sub_category_image/${endurl}`,
        {
          method: 'POST',
          body: sendData
        }
      )
        .then(res => res.json())
        .then(data =>
          this.setState({
            showModal: true,
            title: 'Confirmation',
            modal_message: data.message,
            logo: data.image_url
          })
        )
        .catch(err => {
          this.setState({
            showModal: true,
            title: 'Server Error ',
            modal_message: 'Please Contact To Technical Team '
          });
          console.log(err);
        });
    }
  };

  handleDataUpdate = () => {
    if (this.state.english_name === '') {
      alert('English Name Cannot Be Empty');
    } else {
      this.setState({ UploadingData: true });
      fetch(
        baseurl +
          `categories_and_sub_categories/update_sub_category_data/${endurl}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state)
        }
      )
        .then(res => res.json())
        .then(data =>
          this.setState({
            showModal: true,
            title: 'Confirmation',
            modal_message: data.message
          })
        )
        .catch(err => {
          this.setState({
            showModal: true,
            title: 'Server Error ',
            modal_message: 'Please Contact To Technical Team '
          });
          console.log(err);
        });
    }
  };

  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ padding: '15%', paddingLeft: '50%' }}>
          <Spin size='large' />
        </div>
      );
    } else {
      return (
        <div style={{ padding: '5%' }}>
          <Row>
            <Col span={6}>
              <b>Category</b>
              <br />
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder='Select Category'
                optionFilterProp='children'
                labelInValue
                defaultValue={{ key: this.state.category_id }}
                onChange={this.handleChange}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.categories.map((item, index) => {
                  return (
                    <Option key={item._id} value={item._id}>
                      {item.english_name}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={6} offset={1}>
              <b>Sub Category Name (English)</b>
              <Input
                value={this.state.english_name}
                onChange={e => {
                  this.setState({ english_name: e.target.value });
                }}
                size='large'
                placeholder='large size'
              />
            </Col>
            <Col span={6} offset={1}>
              <b>Sub Category Name (Hindi)</b>
              <Input
                value={this.state.hindi_name}
                size='large'
                placeholder='large size'
                onChange={e => {
                  this.setState({ hindi_name: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={18}>
              <br />
              <Button
                type='primary'
                loading={this.state.UploadingData}
                onClick={() => this.handleDataUpdate()}
                size={'large'}
              >
                Update
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <img
                height='300px'
                width='400px'
                src={`${baseurl}uploads/sub_category/${this.state.logo}`}
                alt={'Not Available'}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <h4>Choose Image To Upload</h4>
              <label for='upload-photo' style={{ paddingTop: '5%' }}>
                Browse File
              </label>
              <input
                type='file'
                id='upload-photo'
                onChange={this.handleChooseImage}
                style={{
                  opacity: 0,
                  position: 'absolute',
                  zIndex: -1
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <Button
                type='primary'
                loading={this.state.UploadingData}
                onClick={this.handleUpdateLogo}
                size={'large'}
              >
                Update
              </Button>
            </Col>
          </Row>
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
}
