import React from 'react';

import { Row, Col, Select } from 'antd';

import { baseurl, endurl } from '../../../baseurl';
import UpdateTest from './UpdateTest';

const Option = Select.Option;

export default class EditTest extends React.Component {
  state = {
    all_tests: [],
    filtered_tests: [],
    selected_test_id: '',
    test: {}
  };

  componentDidMount() {
    fetch(`${baseurl}tests/fetch_all_test/${endurl}`)
      .then(res => res.json())
      .then(data => this.setState({ all_tests: data, filtered_tests: data }))
      .catch(err => console.log(err));
  }

  load_test = _id => {
    fetch(`${baseurl}tests/fetch_test_by_id/${_id}/${endurl}`)
      .then(res => res.json())
      .then(async data => {
        await this.setState({ test: data, selected_test_id: _id });
      })
      .catch(err => console.log(err));
  };

  onSelectTest = async _id => {
    this.load_test(_id);
  };

  render() {
    return (
      <div style={{ paddingTop: '5%' }}>
        <Row style={{ paddingLeft: '0%' }}>
          <Col span={10} offset={1}>
            <h3>Choose Test</h3>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder='Select a Test'
              optionFilterProp='children'
              onChange={this.onSelectTest}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.filtered_tests.map((item, key) => {
                return (
                  <Option key={item._id} value={item._id}>
                    {item.english_title}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        {this.state.selected_test_id === '' ? (
          <></>
        ) : (
          <UpdateTest test={this.state.test} />
        )}
      </div>
    );
  }
}
