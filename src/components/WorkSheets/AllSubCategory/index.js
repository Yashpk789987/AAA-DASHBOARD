import React from 'react';
import { baseurl, endurl } from '../../../baseurl';
import { Form, Button, Select, Spin, List, Avatar } from 'antd';

import {
  Link,
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import ShowSubCategoryById from '../ShowSubCategoryById';

const Option = Select.Option;

class AllSubCategoryComponent extends React.Component {
  state = {
    loading_categories: false,
    categories: [],
    loading_subcategories: false,
    subcategories: []
  };

  componentDidMount() {
    this.setState({ loading_categories: true });
    fetch(
      `${baseurl}categories_and_sub_categories/fetch_all_categories/${endurl}`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({ categories: data, loading_categories: false })
      )
      .catch(err => console.log(err));
  }

  handleSelectChange = value => {
    this.setState({ loading_categories: true });
    fetch(
      `${baseurl}categories_and_sub_categories/sub_categories/${value}/${endurl}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ loading_subcategories: false, subcategories: data });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : null;

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div
          style={{ paddingLeft: '10%', paddingTop: '3%', paddingBottom: '3%' }}
        >
          <center>
            <h1>All SubCategories </h1>
          </center>
          <Form layout={formLayout}>
            <Form.Item label='Select Category' {...formItemLayout}>
              {this.state.categories.length === 0 ? (
                <>
                  <Spin /> Loading Categories ...{' '}
                </>
              ) : (
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder='Select Category '
                  optionFilterProp='children'
                  onChange={this.handleSelectChange}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.categories.map(category => {
                    return (
                      <Option value={`${category._id}`} key={category._id}>
                        {category.english_name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          </Form>
          {this.state.loading_subcategories === true ? (
            <Spin size='large' />
          ) : (
            <List
              itemLayout='horizontal'
              dataSource={this.state.subcategories}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<b>{item.english_name}</b>}
                    avatar={
                      <Avatar
                        shape='square'
                        size='large'
                        style={{ height: '70%', width: '80%' }}
                        src={`${baseurl}uploads/sub_category/${item.logo}`}
                      />
                    }
                  />
                  <Link
                    style={{ paddingRight: '5%', marginRight: '10%' }}
                    to={`${this.props.match.url}/${item._id}`}
                  >
                    <Button type='primary' size={'large'}>
                      Edit
                    </Button>
                  </Link>
                </List.Item>
              )}
            />
          )}
        </div>
      </Router>
    );
  }
}

export default class AllSubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (localStorage.getItem('authenticated') === 'true') {
      let match = this.props.match;
      return (
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route
              exact
              path={`${match.url}`}
              render={props => <AllSubCategoryComponent {...props} />}
            />
            <Route
              path={`${match.url}/:id`}
              render={props => <ShowSubCategoryById {...props} />}
            />
          </Switch>
        </Router>
      );
    } else {
      return <Redirect to={{ pathname: '/login' }} />;
    }
  }
}
