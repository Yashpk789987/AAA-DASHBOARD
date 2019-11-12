import React from 'react';
import { baseurl, endurl } from '../baseurl';
import { Button } from 'antd';

export default class UpdatePaymentStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: false
    };
  }

  handleUpdate = () => {
    this.setState({ updating: true });
    fetch(`${baseurl}students/update_payment_status/${endurl}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ updating: false });
        if (data.code === 'success') {
          alert('Payment Status Is Updated .');
        } else {
          alert('Payment Status Is Not Updated Due To Any Technical Reason .');
        }
      })
      .catch(err => alert('Technical Error'));
  };

  render() {
    if (this.state.updating === true) {
      return (
        <Button type='primary' size={'large'} loading style={{ width: '100%' }}>
          Updating Payment Status
        </Button>
      );
    } else {
      return (
        <Button
          type='primary'
          size={'large'}
          onClick={this.handleUpdate}
          style={{ width: '100%' }}
        >
          Click To Update Payment Status
        </Button>
      );
    }
  }
}
