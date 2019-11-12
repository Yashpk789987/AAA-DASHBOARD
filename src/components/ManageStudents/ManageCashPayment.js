import React from 'react';
import { baseurl, endurl } from '../../baseurl';
import { Button, Modal, Row, Col, DatePicker, Select } from 'antd';

const { Option } = Select;

export default class ManageCashPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posting_data: false,
      pack_id: null,
      payment_date: '',
      message: '',
      amount: ''
    };
  }

  handlePayment = () => {
    if (
      this.state.selected_pack_id === null ||
      this.state.payment_date === ''
    ) {
      this.setState({ message: 'Please Fill All Fields ....' });
    } else {
      this.setState({ posting_data: true });
      fetch(baseurl + `payment/create_cash_payment/` + endurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...this.state, student_id: this.props._id })
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            posting_data: false
          });
          alert('Payment Created...');
          this.props.make_payment_not_visible();
        })
        .catch(err => {
          alert('Tecnical Error .. ');
          console.log(err);
        });
    }
  };

  handleDate = (date, dateString) => {
    this.setState({ payment_date: dateString });
  };

  handleChange = value => {
    this.setState({ pack_id: value });
    switch (value) {
      case 1:
        this.setState({ amount: '100' });
        break;
      case 2:
        this.setState({ amount: '300' });
        break;
      case 3:
        this.setState({ amount: '500' });
        break;
      default:
        console.log('Impossible Event ');
    }
  };

  render() {
    return (
      <Modal
        centered
        title='Create New Payment'
        style={{ top: 20 }}
        width={720}
        visible={this.props.payment_visible}
        onOk={() => this.handlePayment(this.props._id)}
        onCancel={() => this.props.make_payment_not_visible()}
      >
        <Row>
          <Col span={10}>
            <h4> Select Package </h4>
            <Select
              defaultValue='Choose Pack'
              style={{ width: 220 }}
              onChange={this.handleChange}
            >
              <Option value={1}>Silver-Pack 100 Rs (1 Month) </Option>
              <Option value={2}>Gold-Pack 300 Rs (4 Months)</Option>
              <Option value={3}>Platinum-Pack 500 Rs (6 Months)</Option>
            </Select>
          </Col>
          <Col offset={2} span={10}>
            <h4> Choose Payment Date </h4>
            <DatePicker onChange={this.handleDate} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={10}></Col>
          <Col offset={2} span={10}>
            {!this.state.posting_data ? (
              <Button onClick={this.handlePayment}>
                Click Me To Create Payment
              </Button>
            ) : (
              <Button loading>Creating Payment ...</Button>
            )}
          </Col>
        </Row>
        <br />
        <h5 style={{ color: 'red' }}>{this.state.message}</h5>
      </Modal>
    );
  }
}
