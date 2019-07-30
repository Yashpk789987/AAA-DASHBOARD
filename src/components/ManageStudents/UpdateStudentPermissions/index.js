import React from 'react';
import { baseurl, endurl } from '../../../baseurl';
import { Spin, Row, Col, Button, Switch } from 'antd';

export default class UpdateStudentPermissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      student_data: {},
      uploading_data: false
    };
  }

  handleSave = () => {
    this.setState({ uploading_data: true });
    let sendData = this.state.student_data;
    fetch(`${baseurl}students/update_permission/${endurl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ updating: false });
        if (data.code === 'success') {
          alert('Updated Successfully ....');
          this.props.history.goBack();
        }
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    let student_id = this.props.match.params.student_id;
    this.setState({ loading: true });
    fetch(`${baseurl}students/show_by_id/${student_id}/${endurl}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ student_data: data, loading: false });
      })
      .catch(err => console.log(err));
  }

  handleChange = (switch_type, value) => {
    let student_data = this.state.student_data;
    let new_student_data = {};
    switch (switch_type) {
      case 'pdf_allowed':
        new_student_data = Object.assign(student_data, {
          pdf_allowed: value.toString()
        });
        break;
      case 'online_test_allowed':
        new_student_data = Object.assign(student_data, {
          online_test_allowed: value.toString()
        });
        break;
      case 'offline_test_allowed':
        new_student_data = Object.assign(student_data, {
          offline_test_allowed: value.toString()
        });
        break;
      default:
        break;
    }
    this.setState({ student_data: new_student_data });
  };

  render() {
    const data = this.state.student_data;
    if (this.state.loading === true) {
      return (
        <div style={{ padding: '15%', paddingLeft: '50%' }}>
          <Spin size='large' />
        </div>
      );
    } else {
      return (
        <div style={{ paddingTop: '5%' }}>
          <center>
            <h1>{}</h1>
          </center>
          <Row style={{ paddingLeft: '10%' }}>
            <Col span={10} offset={2}>
              <h3>Name </h3> &nbsp;<h5>{data.name}</h5>
            </Col>
            <Col span={10} offset={2}>
              <h3>Email Id </h3>&nbsp;<h5>{data.email_id}</h5>
            </Col>
          </Row>
          <br />
          <Row style={{ paddingLeft: '10%' }}>
            <Col span={10} offset={2}>
              <h3>Pdf Allowed(No/Yes)</h3> &nbsp;
              <Switch
                onChange={value => this.handleChange('pdf_allowed', value)}
                defaultChecked={data.pdf_allowed === 'true'}
              />
            </Col>
            <Col span={10} offset={2}>
              <h3>Online Test Allowed(No/Yes)</h3> &nbsp;
              <Switch
                onChange={value =>
                  this.handleChange('online_test_allowed', value)
                }
                defaultChecked={data.online_test_allowed === 'true'}
              />
            </Col>
          </Row>
          <br />
          <Row style={{ paddingLeft: '10%' }}>
            <Col span={10} offset={2}>
              <h3>Offline Tes Allowed(No/Yes)</h3> &nbsp; {}
              <Switch
                defaultChecked={data.offline_test_allowed === 'true'}
                onChange={value =>
                  this.handleChange('offline_test_allowed', value)
                }
              />
            </Col>
            <Col span={10} offset={2}>
              <Button
                type='primary'
                shape='round'
                icon='save'
                size={'large'}
                onClick={this.handleSave}
              >
                Save Permissions
              </Button>
            </Col>
          </Row>
          <br />
          <br />
        </div>
      );
    }
  }
}
