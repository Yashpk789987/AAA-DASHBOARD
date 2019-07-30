import React from 'react';
import { baseurl, endurl } from '../../../baseurl';

import { Row, Col, Select, Button } from 'antd';

const { Option } = Select;

export default class Set_Demo_Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: [],
      updating_data: false,
      selected_test_id: null
    };
  }

  componentDidMount() {
    fetch(`${baseurl}tests/fetch_all_test/${endurl}`)
      .then(res => res.json())
      .then(data => this.setState({ tests: data }))
      .catch(err => console.log(err));
  }

  onSelectTest = async _id => {
    this.setState({ selected_test_id: _id });
  };

  handleSave = () => {
    this.setState({ updating_data: true });
    fetch(
      `${baseurl}tests/set_demo_test/${this.state.selected_test_id}/${endurl}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ updating_data: false });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div style={{ paddingTop: '5%' }}>
        <Row style={{ paddingLeft: '10%' }}>
          <Col span={10} offset={2}>
            <h3>Choose Test For Demo Test </h3>
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
              {this.state.tests.map((item, key) => {
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
            {this.state.updating_data === true ? (
              <Button
                size={'large'}
                type='primary'
                loading={this.state.UploadingData}
              >
                Saving ...
              </Button>
            ) : (
              <Button
                width='100%'
                type='primary'
                size={'large'}
                onClick={this.handleSave}
              >
                Save Your Choice
              </Button>
            )}
          </Col>
        </Row>
        <br />
        <br />
      </div>
    );
  }
}
