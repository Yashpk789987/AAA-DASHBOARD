import React from 'react';

import { Form, Button, Progress, Carousel, Spin } from 'antd';

import axios from 'axios';

import { baseurl, endurl, fileurl } from '../../baseurl';

export default class AdsUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: false,
      uploading: false,
      ads_array: [],
      upper_adds_array: [],
      lower_adds_array: [],
      image: null,
      fileprogress: 0,
      category: ''
    };
  }

  componentDidMount() {
    this.loadImageArray();
  }

  uploadImage = category => {
    if (this.state.image === null) {
      alert('Please Choose Image ');
    } else {
      this.setState({ uploading: true, fileprogress: 0 });
      let formData = new FormData();
      formData.append(
        'SendData',
        JSON.stringify({ ...this.state, category: category })
      );
      formData.append('image', this.state.image);
      axios
        .request({
          method: 'post',
          url: baseurl + `ads/upload_ad_image/${endurl}`,
          data: formData,
          onUploadProgress: p => {
            this.setState({
              fileprogress: p.loaded / p.total
            });
          }
        })
        .then(data => {
          alert('Image Uploaded ... ');
          this.setState({
            uploading: false,
            fileprogress: 0
          });
          this.loadImageArray();
        })
        .catch(err => {
          alert('Technical error');
          console.log(err);
        });
    }
  };

  handleFile = e => {
    let class_ref = this;
    e.persist();

    let img = new Image();
    img.onload = function() {
      if (this.width === 384 && this.height === 272) {
        class_ref.setState({ image: e.target.files[0] });
      } else {
        alert('Image Must Have Dimensions Of 384 * 272 ');
      }
    };

    var reader = new FileReader();
    reader.onloadend = function(ended) {
      img.src = ended.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  deleteImage = () => {};

  loadImageArray = async () => {
    this.setState({ downloading: true });
    fetch(`${baseurl}ads/load_all_ads/${endurl}`)
      .then(res => res.json())
      .then(data => {
        let upper_adds_array = data.filter(item => {
          return item.category === 'upper';
        });

        let lower_adds_array = data.filter(item => {
          return item.category === 'lower';
        });

        this.setState({
          ads_array: data,
          upper_adds_array: upper_adds_array,
          lower_adds_array: lower_adds_array,
          downloading: false
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div style={{ paddingTop: '5%' }}>
        {this.state.downloading ? (
          <div style={{ padding: '20%', paddingLeft: '50%' }}>
            <Spin size='large' />
          </div>
        ) : (
          <div
            style={{
              paddingTop: '5%',
              paddingLeft: '25%'
            }}
          >
            <Carousel autoplay autoplaySpeed={2000} effect='fade'>
              {this.state.upper_adds_array.map((item, index) => {
                return (
                  <div key={index}>
                    <img
                      width='70%'
                      height='300'
                      alt={'Failed To Load'}
                      src={`${baseurl}${fileurl}/ads/${item.image_url}`}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        )}
        <div
          style={{
            paddingLeft: '25%'
          }}
        >
          <Form>
            <Form.Item>
              Attach Pdf File ( &nbsp;Required &nbsp;) &nbsp; :
              &nbsp;&nbsp;&nbsp;
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
            <Form.Item>
              <Button
                type='primary'
                loading={this.state.uploading}
                onClick={() => this.uploadImage('upper')}
              >
                Upload
              </Button>
            </Form.Item>
          </Form>
        </div>
        {this.state.downloading ? (
          <div style={{ padding: '20%', paddingLeft: '50%' }}>
            <Spin size='large' />
          </div>
        ) : (
          <div
            style={{
              paddingLeft: '25%'
            }}
          >
            <Carousel autoplay autoplaySpeed={2000} effect='fade'>
              {this.state.lower_adds_array.map((item, index) => {
                return (
                  <div key={index}>
                    <img
                      width='70%'
                      height='300'
                      alt={'Failed To Load'}
                      src={`${baseurl}${fileurl}/ads/${item.image_url}`}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        )}
        <div
          style={{
            paddingLeft: '25%'
          }}
        >
          <Form>
            <Form.Item>
              Attach Pdf File ( &nbsp;Required &nbsp;) &nbsp; :
              &nbsp;&nbsp;&nbsp;
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
            <Form.Item>
              <Button
                type='primary'
                loading={this.state.uploading}
                onClick={() => this.uploadImage('lower')}
              >
                Upload
              </Button>
            </Form.Item>
          </Form>
        </div>
        <br />
        <br />
      </div>
    );
  }
}
