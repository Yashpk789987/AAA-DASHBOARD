import React from 'react';
import { baseurl, endurl } from '../../../baseurl';

import { Row, Col, Select, Button } from 'antd';

const { Option } = Select;

export default class setDemoTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pdf_categories: [],
      updating_data: false,
      selected_demo_pdf_categories: []
    };
  }

  componentDidMount() {
    fetch(
      `${baseurl}categories_and_sub_categories/fetch_all_sub_categories/${endurl}`
    )
      .then(res => res.json())
      .then(data => this.setState({ pdf_categories: data }))
      .catch(err => console.log(err));
  }

  onSelectTest = async _id_array => {
    this.setState({ selected_demo_pdf_categories: _id_array });
  };

  handleSave = () => {
    this.setState({ updating_data: true });
    fetch(
      `${baseurl}categories_and_sub_categories/set_demo_pdf_category/${endurl}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.selected_demo_pdf_categories)
      }
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
            <h3>Choose PDFS For Demo PDF </h3>
            <Select
              mode='multiple'
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
              {this.state.pdf_categories.map((item, key) => {
                return (
                  <Option key={item._id} value={item._id}>
                    {item.english_name}
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
