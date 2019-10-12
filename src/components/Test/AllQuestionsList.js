import React from 'react';
import { Collapse, Icon } from 'antd';
import { baseurl, endurl } from '../../baseurl';

const { Panel } = Collapse;
export default class AllQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      questions: []
    };
  }

  makeQuestions;

  componentDidMount() {
    let test_id = this.props.test_id;
    fetch(`${baseurl}tests/fetch_test_questions_by_test_id/${test_id}/p`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ questions: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <></>
      //   <Collapse
      //     bordered={false}
      //     defaultActiveKey={['1']}
      //     expandIcon={({ isActive }) => (
      //       <Icon type='caret-right' rotate={isActive ? 90 : 0} />
      //     )}
      //   >
      //     {/* {this.state.questions.map((index, item) => {
      //       return (
      //         <Panel
      //           header=  { item}
      //           key='1'
      //           style={customPanelStyle}
      //         ></Panel>
      //       );
      //     })} */}
      //   </Collapse>
    );
  }
}

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden'
};
