import React from 'react';
import { Modal} from 'antd';

class MentorModal extends React.Component {
  state = { visible: false };

  showModal = (props) => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
      {  /*<Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>*/}
        <Modal
          title="One on One"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    );
  }
}

export default MentorModal
