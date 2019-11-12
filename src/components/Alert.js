import React from 'react';
import { Modal } from 'antd';

export default class Alert extends React.Component {
  state = { visible: false };
  componentDidMount() {
    this.setState({ visible: true });
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.props.makeShowModalFalse();
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.props.makeShowModalFalse();
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.props.message}</p>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}
