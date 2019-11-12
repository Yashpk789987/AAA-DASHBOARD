import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { baseurl, endurl } from '../baseurl';
import Alert from '../components/Alert.js';

class NormalLoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    logging_in: false,
    open_modal: false,
    modal_message: '',
    modal_title: '',
    loading: false
  };

  makeShowModalFalse = () => {
    this.setState({ open_modal: false });
  };

  handleForgetPassword = e => {
    e.preventDefault();
    this.setState({
      open_modal: true,
      modal_message: 'Sending Link to Email shshagrawal05@gmail.com ',
      loading: true
    });

    fetch(`${baseurl}admin/forget_password/${endurl}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          open_modal: true,
          modal_message: 'Link Sent to Email shshagrawal05@gmail.com ',
          loading: false
        });
      })
      .catch(err => console.log(err));
  };

  handleLogin = () => {
    if (this.state.email === '' || this.state.password === '') {
      this.setState({
        open_modal: true,
        title: 'Unfilled Credientials',
        modal_message: 'Please Fill Both Fields'
      });
    } else {
      this.setState({
        open_modal: true,
        modal_message: 'Verifying ....\nPlease wait ....',
        loading: true
      });
      fetch(baseurl + `admin/check_login/` + endurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then(res => res.json())
        .then(data => {
          if (data.code === 'login_success') {
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('admin', data);
            this.setState({ open_modal: false, loading: false });
            this.props.history.push('/dashboard');
          } else {
            this.setState({
              open_modal: true,
              title: 'Invalid Credientials',
              modal_message: 'Wrong Email/Password',
              loading: false
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <body
        style={{
          backgroundImage:
            'url(' +
            'https://www.drumangle.com/sandbox/wp/21813/wp-content/uploads/2014/01/Login-Screen-Background-Wood-4.jpg' +
            ')'
        }}
      >
        <div
          style={{
            paddingTop: '15%',
            paddingLeft: '30%',
            paddingRight: '30%',
            paddingBottom: '20%'
          }}
        >
          <h1 style={{ color: 'white' }}>
            <center>ADMIN LOGIN</center>
          </h1>
          <Form className='login-form'>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='Email'
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type='password'
                  placeholder='Password'
                  onChange={e => {
                    this.setState({ password: e.target.value });
                  }}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type='default'
                htmlType='submit'
                className='login-form-button'
                style={{ width: '100%' }}
                onClick={this.handleLogin}
              >
                Log in
              </Button>
            </Form.Item>

            <a
              style={{ color: 'white', fontSize: 18 }}
              href='/#'
              onClick={e => {
                this.handleForgetPassword(e);
              }}
            >
              Forgot Password ?
            </a>
          </Form>
          {this.state.open_modal ? (
            <Alert
              makeShowModalFalse={this.makeShowModalFalse}
              title={this.state.modal_title}
              message={this.state.modal_message}
            >
              {this.state.loading === true ? <Spin /> : <></>}
            </Alert>
          ) : (
            <></>
          )}
        </div>
      </body>
    );
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);
