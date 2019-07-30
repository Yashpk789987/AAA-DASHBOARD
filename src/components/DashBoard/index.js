import React from 'react';
import WorkSheets from '../WorkSheets/index';
import PdfManaging from '../PdfManaging/index';
import UpdateAuthorize from '../UpdateAuthorize';
import Test from '../Test/index';
import ManageStudents from '../ManageStudents/index';

import {
  Redirect,
  Link,
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';
import './index.css';
import Enquiry from '../Enquiry';

const { Header } = Layout;

export default class DashBoard extends React.Component {
  componentWillMount() {
    if (this.props.match.url === '/') {
      this.props.history.push('/dashboard');
    }
  }
  render() {
    if (localStorage.getItem('authenticated') === 'true') {
      let match = this.props.match;
      return (
        <Router basename={process.env.PUBLIC_URL}>
          <Layout>
            <Header className='header'>
              <div className='logo' />
              <Menu
                theme='dark'
                mode='horizontal'
                style={{ lineHeight: '64px', paddingLeft: '18%' }}
              >
                <Menu.Item key='1'>
                  <Link to={`${match.url}/worksheets`}>
                    <Icon type='file-sync' />
                    Manage Worksheets
                  </Link>
                </Menu.Item>
                <Menu.Item key='2'>
                  <Link to={`${match.url}/tests`}>
                    <Icon type='reconciliation' />
                    Manage Tests
                  </Link>
                </Menu.Item>
                <Menu.Item key='3'>
                  <Link to={`${match.url}/updates`}>
                    <Icon type='sync' />
                    Manage Updates
                  </Link>
                </Menu.Item>
                <Menu.Item key='4'>
                  <Link to={`${match.url}/pdfs`}>
                    <Icon type='sync' />
                    Manage Pdf Files
                  </Link>
                </Menu.Item>
                <Menu.Item key='5'>
                  <Link to={`${match.url}/students`}>
                    <Icon type='sync' />
                    Manage Students
                  </Link>
                </Menu.Item>
                <Menu.Item key='6'>
                  <Link to={`${match.url}/enquiry`}>
                    <Icon type='sync' />
                    Enquiries
                  </Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Switch>
              <Route
                path={`${match.url}/worksheets`}
                render={props => <WorkSheets {...props} />}
              />
              <Route
                path={`${match.url}/tests`}
                render={props => <Test {...props} />}
              />
              <Route
                path={`${match.url}/updates`}
                render={props => <UpdateAuthorize {...props} />}
              />
              <Route
                path={`${match.url}/pdfs`}
                render={props => <PdfManaging {...props} />}
              />
              <Route
                path={`${match.url}/students`}
                render={props => <ManageStudents {...props} />}
              />
              <Route
                path={`${match.url}/enquiry`}
                render={props => <Enquiry {...props} />}
              />
            </Switch>
          </Layout>
        </Router>
      );
    } else {
      return <Redirect to={{ pathname: '/login' }} />;
    }
  }
}
