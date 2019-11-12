import React from 'react';

import { Switch, Input, Button, Row, Col, TimePicker, DatePicker } from 'antd';

import { baseurl, endurl } from '../../../baseurl';
import Alert from '../../Alert.js';
import moment from 'moment';
import AllQuestionsByTestId from './AllQuestionsByTestId';

export default class UpdateTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: 'horizontal',
      english_title: props.test.english_title,
      hindi_title: props.test.hindi_title,
      UploadingData: false,
      showModal: false,
      modal_title: '',
      modal_message: '',
      test_duration_in_seconds: props.test.test_allowed_time_in_seconds,
      test_commence_date: props.test.test_commence_date,
      test_commence_time: props.test.test_commence_time,
      open_test_duration: false,
      open_commence_time: false,
      open_end_time: false,
      end_time: props.test.end_time,
      set_password: props.test.set_password === 'true',
      shuffle_required: props.test.shuffle_required === 'true',
      test_created: false,
      created_test: {},
      test_id: props.test._id
    };
  }

  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    if (nextProps !== this.props) {
      this.setState({
        formLayout: 'horizontal',
        english_title: nextProps.test.english_title,
        hindi_title: nextProps.test.hindi_title,
        UploadingData: false,
        showModal: false,
        modal_title: '',
        modal_message: '',
        test_duration_in_seconds: nextProps.test.test_allowed_time_in_seconds,
        test_commence_date: nextProps.test.test_commence_date,
        test_commence_time: nextProps.test.test_commence_time,
        open_test_duration: false,
        open_commence_time: false,
        open_end_time: false,
        end_time: nextProps.test.end_time,
        set_password: nextProps.test.set_password === 'true',
        shuffle_required: nextProps.test.shuffle_required === 'true',
        test_created: false,
        created_test: {},
        test_id: nextProps.test._id
      });
    }
  }

  /////////////////  Handling Fields /////////////////////

  handleTime = (time, timeString, field) => {
    switch (field) {
      case 'test_duration_in_seconds':
        this.setState({
          test_duration_in_seconds: moment
            .duration(timeString)
            .asSeconds()
            .toString()
        });
        break;
      case 'test_commence_time':
        this.setState({ test_commence_time: timeString });
        break;
      case 'end_time':
        this.setState({ end_time: timeString });
        break;
      default:
        console.log('Default');
    }
  };

  handleDate = (date, dateString) => {
    this.setState({ test_commence_date: dateString });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /////////////////  Handling Fields /////////////////////

  handleOpenChange = (open, field) => {
    switch (field) {
      case 'test_commence_time':
        this.setState({ open_commence_time: open });
        break;
      case 'test_duration':
        this.setState({ open_test_duration: open });
        break;
      case 'end_time':
        this.setState({ open_end_time: open });
        break;
      default:
        console.log('Default');
    }
  };

  handleClose = field => {
    switch (field) {
      case 'test_commence_time':
        this.setState({ open_commence_time: false });
        break;
      case 'test_duration':
        this.setState({ open_test_duration: false });
        break;
      case 'end_time':
        this.setState({ open_end_time: false });
        break;
      default:
        console.log('Default....');
    }
  };

  makeShowModalFalse = () => {
    this.setState({ showModal: false, UploadingData: false });
  };

  ///////////////////// UPLOAD DATA ///////////////////////////////////////////////

  handleCreateTest = () => {
    const sendData = this.state;
    if (sendData.english_title === '') {
      this.setState({
        showModal: true,
        title: 'Requirements',
        modal_message: 'Title Is Required ...'
      });
    } else if (sendData.test_commence_date === '') {
      this.setState({
        showModal: true,
        title: 'Requirements',
        modal_message: 'Commence Date Is Required ...'
      });
    } else if (sendData.test_commence_time === '') {
      this.setState({
        showModal: true,
        title: 'Requirements',
        modal_message: 'Commence Time Is Required ...'
      });
    } else if (sendData.test_duration_in_seconds === '') {
      this.setState({
        showModal: true,
        title: 'Requirements',
        modal_message: 'Test Duration Is Required ..'
      });
    } else if (sendData.end_time === '') {
      this.setState({
        showModal: true,
        title: 'Requirements',
        modal_message: 'Please Enter Test End Time'
      });
    } else {
      this.setState({ UploadingData: true });
      fetch(baseurl + `tests/update/` + endurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...sendData, _id: this.props.test._id })
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            showModal: true,
            title: 'Confirmation',
            modal_message: data.message,
            test_created: true,
            created_test: data.test
          });
        })
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

  ///////////////////// UPLOAD DATA ///////////////////////////////////////////////

  render() {
    return (
      <div style={{ padding: '3%' }}>
        <center>
          <h1> Update Test </h1>
        </center>
        <br />
        <Row>
          <Col span={10}>
            <h3> Test Title In English</h3>
            <Input
              placeholder='Ex.  Time And Work , Speed And Distance , Profit And Loss'
              value={this.state.english_title}
              onChange={this.handleChange}
              name='english_title'
            />
          </Col>
          <Col offset={2} span={10}>
            <h3> Test Title In Hindi</h3>
            <Input
              placeholder='Ex.  Time And Work , Speed And Distance , Profit And Loss'
              value={this.state.hindi_title}
              onChange={this.handleChange}
              name='hindi_title'
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={10}>
            <h3> Test Commence Date </h3>
            <DatePicker
              onChange={this.handleDate}
              value={moment(this.state.test_commence_date)}
            />
          </Col>
          <Col span={10} offset={2}>
            <h3>Test Commence Time</h3>
            <TimePicker
              defaultValue={moment(this.state.test_commence_time, 'HH:mm:ss')}
              open={this.state.open_commence_time}
              onOpenChange={open =>
                this.handleOpenChange(open, 'test_commence_time')
              }
              onChange={(time, timeString) =>
                this.handleTime(time, timeString, 'test_commence_time')
              }
              addon={() => (
                <Button
                  size='small'
                  type='primary'
                  onClick={() => this.handleClose('test_commence_time')}
                >
                  Ok
                </Button>
              )}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={10}>
            <h3>Test Duration</h3>
            <TimePicker
              defaultValue={moment.utc(
                this.state.test_duration_in_seconds * 1000
              )}
              open={this.state.open_test_duration}
              onOpenChange={open =>
                this.handleOpenChange(open, 'test_duration')
              }
              onChange={(time, timeString) =>
                this.handleTime(time, timeString, 'test_duration_in_seconds')
              }
              addon={() => (
                <Button
                  size='small'
                  type='primary'
                  onClick={() => this.handleClose('test_duration')}
                >
                  Ok
                </Button>
              )}
            />
          </Col>
          <Col span={10} offset={2}>
            <h3>Test End Time </h3>
            <TimePicker
              defaultValue={moment(this.state.end_time, 'HH:mm:ss')}
              open={this.state.open_end_time}
              onOpenChange={open => this.handleOpenChange(open, 'end_time')}
              onChange={(time, timeString) =>
                this.handleTime(time, timeString, 'end_time')
              }
              addon={() => (
                <Button
                  size='small'
                  type='primary'
                  onClick={() => this.handleClose('end_time')}
                >
                  Ok
                </Button>
              )}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={10}>
            <h3> Set Password For Test (Yes/No) </h3>
            <Switch
              defaultChecked={this.state.set_password}
              onChange={value => {
                this.setState({ set_password: value });
              }}
            />
          </Col>
          <Col offset={2} span={10}>
            <h3> Do You Want To Shuffle Questions(Yes/No) </h3>
            <Switch
              defaultChecked={this.state.shuffle_required}
              onChange={value => {
                this.setState({ shuffle_required: value });
              }}
            />
          </Col>
        </Row>
        <br />
        <br />
        <br />
        {this.state.UploadingData === true ? (
          <Button
            size={'large'}
            type='primary'
            loading={this.state.UploadingData}
          >
            Updating Test .
          </Button>
        ) : (
          <Button
            width='100%'
            type='primary'
            size={'large'}
            onClick={this.handleCreateTest}
          >
            Update Test
          </Button>
        )}
        {this.state.showModal === true ? (
          <Alert
            makeShowModalFalse={this.makeShowModalFalse}
            title={this.state.modal_title}
            message={this.state.modal_message}
          />
        ) : (
          <></>
        )}
        <AllQuestionsByTestId test_id={this.state.test_id} />
      </div>
    );
  }
}
