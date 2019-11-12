import React from 'react';
import { Input, Button, Row, Col, Spin } from 'antd';
import { baseurl, endurl } from '../baseurl';
export default class UpdateAuthorize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      password: '',
      loading: false,
      updating: false
    };
  }

  update = () => {
    this.setState({ updating: true });
    let sendData = this.state;
    fetch(`${baseurl}authorize/update/${endurl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
      .then(res => res.json())
      .then(data => {
        data.code === 'success'
          ? alert('Updated Sucessfully')
          : alert('Technical Error. Please Contact To Technical Team');
        this.setState({ updating: false });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch(`${baseurl}authorize/get/${endurl}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          code: data.code,
          password: data.password,
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ padding: '15%', paddingLeft: '50%' }}>
          <Spin size='large' />
        </div>
      );
    } else {
      return (
        <div style={{ padding: '5%', paddingTop: '10%' }}>
          <h2 style={{ paddingLeft: '5%' }}> Update Credentials </h2>
          <div style={{ padding: '5%' }}>
            <Row>
              <Col span={10}>
                <h3> Secret Code </h3>
                <Input
                  placeholder=''
                  value={this.state.code}
                  onChange={obj => this.setState({ code: obj.target.value })}
                  name='code'
                />
              </Col>
              <Col offset={2} span={10}>
                <h3> Password </h3>
                <Input
                  placeholder=''
                  value={this.state.password}
                  onChange={obj =>
                    this.setState({ password: obj.target.value })
                  }
                  name='password'
                />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col span={10} />
              <Col offset={2} span={10}>
                {this.state.updating === true ? (
                  <Button
                    size={'large'}
                    type='primary'
                    loading={this.state.updating}
                  >
                    Updating ...
                  </Button>
                ) : (
                  <Button
                    width='100%'
                    type='primary'
                    size={'large'}
                    onClick={this.update}
                  >
                    Click To Update
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        </div>
      );
    }
  }
}
