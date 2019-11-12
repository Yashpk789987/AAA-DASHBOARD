import React from 'react';
import { Row, Col, DatePicker, Select, Spin, Button } from 'antd';
import { baseurl, endurl } from '../../../baseurl';
import moment from 'moment';
const { Option } = Select;

function CustomRow(props) {
  return (
    <tr>
      {Object.values(props.row).map((item, key) => {
        return <td key={key}>{item}</td>;
      })}
    </tr>
  );
}

function ResultTable(props) {
  if (props.loading === true) {
    return (
      <div style={{ padding: '20%', paddingLeft: '50%' }}>
        <Spin size='large' />
      </div>
    );
  } else if (props.selected_test_id === '') {
    return (
      <div style={{ padding: '35%', paddingTop: '5%' }}>
        <h5>Results Will Be Displayed Here </h5>
      </div>
    );
  } else if (props.results.length === 0) {
    return (
      <div style={{ padding: '35%', paddingTop: '5%' }}>
        <h5>No Results Found Yet</h5>
      </div>
    );
  } else if (props.results.length !== 0) {
    return (
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            {Object.keys(props.results[0]).map((item, key) => {
              return (
                <th
                  key={key}
                  style={{ position: 'sticky', top: 0, zIndex: 10 }}
                  scope='col'
                >
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.results.map((item, key) => {
            return <CustomRow row={item} key={key} />;
          })}
        </tbody>
      </table>
    );
  }
}

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_test_date: '',
      all_tests: [],
      filtered_tests: [],
      results: [],
      selected_test_id: '',
      loading_results: false
    };
  }

  handle_refresh = () => {
    if (this.state.selected_test_id === '') {
      alert('Please Choose Test ....');
    } else {
      this.refreshResult();
    }
  };

  refreshResult = () => {
    this.setState({ loading_results: true });
    fetch(`${baseurl}tests/results/${this.state.selected_test_id}/${endurl}`)
      .then(res => res.json())
      .then(data => this.setState({ results: data, loading_results: false }))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    fetch(`${baseurl}tests/fetch_all_test/${endurl}`)
      .then(res => res.json())
      .then(data => this.setState({ all_tests: data, filtered_tests: data }))
      .catch(err => console.log(err));
  }

  filter_tests_by_date = date => {
    let filtered_tests = this.state.all_tests.filter(item => {
      return item.test_commence_date === moment(date).format('YYYY-MM-DD');
    });
    if (filtered_tests.length !== 0) {
      this.setState({ filtered_tests: filtered_tests });
    } else {
      this.setState({ filtered_tests: this.state.all_tests });
    }
  };

  handle_date_change = date => {
    this.setState({ test_date: date });
    this.filter_tests_by_date(date);
  };

  onSelectTest = async _id => {
    await this.setState({ selected_test_id: _id });
    this.refreshResult();
  };

  render() {
    return (
      <div style={{ paddingTop: '5%' }}>
        <Row style={{ paddingLeft: '10%' }}>
          <Col span={10} offset={2}>
            <h3>Select Date </h3>
            <DatePicker onChange={this.handle_date_change} />
          </Col>
          <Col span={10} offset={2}>
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
        <br />
        <Row style={{ paddingLeft: '10%' }}>
          <Col span={10} offset={2}>
            <h3>Test Results Found</h3>
            <br />
            <h5>{this.state.results.length}</h5>
          </Col>
          <Col span={10} offset={2}>
            <h3>Click To Refresh</h3>
            <br />
            <Button type='primary' onClick={this.handle_refresh}>
              Refresh
            </Button>
          </Col>
        </Row>
        <br />
        <ResultTable
          results={this.state.results}
          loading={this.state.loading_results}
          selected_test_id={this.state.selected_test_id}
        />
      </div>
    );
  }
}
