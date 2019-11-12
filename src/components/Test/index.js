import React from 'react';

import {
  Redirect,
  Link,
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom';

import EditTest from './EditTest/index';
import TestStatus from './TestStatus/index';
import TestHistory from './TestHistory/index';
import MakeTestWrapper from './MakeTestWrapper/index';
import AllTest from './AllTest/index';
import { Layout, Menu, Icon } from 'antd';
import Results from './Results';
import setDemoTest from './Set_Demo_Test/index';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class Test extends React.Component {
  render() {
    if (localStorage.getItem('authenticated') === 'true') {
      let match = this.props.match;
      return (
        <Router basename={process.env.PUBLIC_URL}>
          <Layout style={{ paddingTop: '5%' }}>
            <Sider width={'20%'} style={{ background: '#fff' }}>
              <Menu
                theme='dark'
                mode='inline'
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu
                  key='sub1'
                  title={
                    <span>
                      <Icon type='folder-open' />
                      Manage Test
                    </span>
                  }
                >
                  <Menu.Item key='1'>
                    <Link to={`${match.url}/make_test`}>Make New Test</Link>
                  </Menu.Item>
                  <Menu.Item key='2'>
                    <Link to={`${match.url}/all_tests`}>All Tests</Link>
                  </Menu.Item>
                  <Menu.Item key='3'>
                    <Link to={`${match.url}/results`}>Results</Link>
                  </Menu.Item>
                  <Menu.Item key='4'>
                    <Link to={`${match.url}/edit_test`}>Edit Test</Link>
                  </Menu.Item>
                  <Menu.Item key='5'>
                    <Link to={`${match.url}/set_demo_test`}>
                      Set Demo Test{' '}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='6'>
                    <Link to={`${match.url}/test_status`}>Test Status</Link>
                  </Menu.Item>
                  <Menu.Item key='7'>
                    <Link to={`${match.url}/test_history`}>Tests History</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content>
              <Switch>
                <Route
                  path={`${match.url}/make_test`}
                  render={props => <MakeTestWrapper {...props} />}
                />
                <Route
                  path={`${match.url}/all_tests`}
                  render={props => <AllTest {...props} />}
                />
                <Route
                  path={`${match.url}/results`}
                  render={props => <Results {...props} />}
                />
                <Route
                  path={`${match.url}/edit_test`}
                  render={props => <EditTest {...props} />}
                />
                <Route
                  path={`${match.url}/set_demo_test`}
                  render={props => <setDemoTest {...props} />}
                />
                <Route
                  path={`${match.url}/test_status`}
                  render={props => <TestStatus {...props} />}
                />
                <Route
                  path={`${match.url}/test_history`}
                  render={props => <TestHistory {...props} />}
                />
              </Switch>
            </Content>
          </Layout>
        </Router>
      );
    } else {
      return <Redirect to={{ pathname: '/login' }} />;
    }
  }
}
