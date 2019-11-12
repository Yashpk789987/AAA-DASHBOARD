import React from 'react';

import {
  Redirect,
  Link,
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom';
import AddCategory from './AddCategory/index';
import AddSubCategory from './AddSubCategory/index';
import AddQuestions from './AddQuestion/index';
import { Layout, Menu, Icon } from 'antd';
import AllSubCategory from './AllSubCategory/index';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class WorkSheets extends React.Component {
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
                      Categories
                    </span>
                  }
                >
                  <Menu.Item key='1'>
                    <Link to={`${match.url}/add_category`}>Add Category</Link>
                  </Menu.Item>
                  <Menu.Item key='2'>All Categories</Menu.Item>
                  <Menu.Item key='3'>Edit Category</Menu.Item>
                  <Menu.Item key='4'>Delete Category</Menu.Item>
                </SubMenu>
                <SubMenu
                  key='sub2'
                  title={
                    <span>
                      <Icon type='folder-open' />
                      Sub Categories
                    </span>
                  }
                >
                  <Menu.Item key='1'>
                    <Link to={`${match.url}/add_sub_category`}>
                      Add Sub Category
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='2'>
                    <Link to={`${match.url}/all_sub_categories`}>
                      All Sub Categories
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='3'>Edit Sub Category</Menu.Item>
                  <Menu.Item key='4'>Delete Sub Category</Menu.Item>
                </SubMenu>
                <SubMenu
                  key='sub3'
                  title={
                    <span>
                      <Icon type='question-circle' />
                      Questions
                    </span>
                  }
                >
                  <Menu.Item key='9'>
                    <Link to={`${match.url}/add_questions`}>
                      {' '}
                      Add Questions{' '}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='10'>All Questions</Menu.Item>
                  <Menu.Item key='11'>Edit Questions</Menu.Item>
                  <Menu.Item key='12'>Delete Questions</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content>
              <Switch>
                <Route
                  path={`${match.url}/add_category`}
                  render={props => <AddCategory {...props} />}
                />
                <Route
                  path={`${match.url}/add_sub_category`}
                  render={props => <AddSubCategory {...props} />}
                />
                <Route
                  path={`${match.url}/add_questions`}
                  render={props => <AddQuestions {...props} />}
                />
                <Route
                  path={`${match.url}/all_sub_categories`}
                  render={props => <AllSubCategory {...props} />}
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
