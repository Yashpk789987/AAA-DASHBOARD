import React from 'react';

import {
  Redirect,
  Link,
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import UploadPdf from '../PdfManaging/UploadPdf/index';
import setDemoTest from '../PdfManaging/Set_Demo_Pdf/index';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class PdfManaging extends React.Component {
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
                  key='sub3'
                  title={
                    <span>
                      <Icon type='question-circle' />
                      Pdf Files
                    </span>
                  }
                >
                  <Menu.Item key='9'>
                    <Link to={`${match.url}/upload_pdfs`}>
                      {' '}
                      Upload Pdf Files{' '}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='10'>
                    <Link to={`${match.url}/set_demo_pdf`}>
                      {' '}
                      Set Demo Pdf Files{' '}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='11'>All Pdfs </Menu.Item>
                  <Menu.Item key='12'>Edit Pdf Files</Menu.Item>
                  <Menu.Item key='13'>Delete Pdf Files</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content>
              <Switch>
                <Route
                  path={`${match.url}/upload_pdfs`}
                  render={props => <UploadPdf {...props} />}
                />
                <Route
                  path={`${match.url}/set_demo_pdf`}
                  render={props => <setDemoTest {...props} />}
                />
                <Route
                  path={`${match.url}/all_pdfs`}
                  render={props => <h1>List All Pdfs</h1>}
                />
                <Route
                  path={`${match.url}/edit_pdf`}
                  render={props => <h1>Edit List All Pdfs</h1>}
                />
                <Route
                  path={`${match.url}/delete_pdf`}
                  render={props => <h1>Delete</h1>}
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
