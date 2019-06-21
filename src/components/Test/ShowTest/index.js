import React from 'react';
import { Row, Col, Button } from 'antd';
import moment from 'moment';
import AddQuestion from '../AddQuestion/index';
export default class ShowTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      test_id: '',
      no_of_questions: 0
    };
  }

  IncrementQuestion = () => {
    this.setState(state => ({ no_of_questions: state.no_of_questions + 1 }));
  };

  handleAddQuestion = () => {
    let newQuestionItem = { test_id: this.state.test_id };
    this.setState(state => ({
      questions: state.questions.concat({ newQuestionItem })
    }));
  };

  componentDidMount() {
    this.setState({ test_id: this.props.test._id });
  }

  render() {
    let test = this.props.test;
    return (
      <>
        <div style={{ paddingTop: '5%' }}>
          <center>
            <h1>{test.english_title}</h1>
          </center>
          <Row style={{ paddingLeft: '10%' }}>
            <Col span={10} offset={2}>
              <h3>Commence Date</h3> &nbsp;&nbsp;&nbsp;&nbsp;{' '}
              {test.test_commence_date}
            </Col>
            <Col span={10} offset={2}>
              <h3>Commence Time</h3>&nbsp;&nbsp;&nbsp;&nbsp;{' '}
              {test.test_commence_time}
            </Col>
          </Row>
          <br />
          <Row style={{ paddingLeft: '10%' }}>
            <Col span={10} offset={2}>
              <h3>Time Allowed</h3> &nbsp;&nbsp;&nbsp;&nbsp;{' '}
              {moment
                .utc(parseInt(test.test_allowed_time_in_seconds * 1000))
                .format('HH:mm:ss')}
            </Col>
            <Col span={10} offset={2}>
              <h3>No Of Days For Which Test Will be Online</h3>
              &nbsp;&nbsp;&nbsp;&nbsp; {test.test_online_no_of_days}
            </Col>
          </Row>
          <br />
          <Row style={{ paddingLeft: '10%' }}>
            <Col span={10} offset={2}>
              <h3>Is Password Set For This Test ??</h3> &nbsp;&nbsp;&nbsp;&nbsp;{' '}
              {test.set_password === 'true' ? 'Yes' : 'No'}
            </Col>
            <Col span={10} offset={2}>
              <h3>Will Questions Be In Shuffle Order ??</h3>
              &nbsp;&nbsp;&nbsp;&nbsp;{' '}
              {test.shuffle_required === 'true' ? 'Yes' : 'No'}
            </Col>
          </Row>
          <br />
          <br />
          <Row style={{ paddingLeft: '10%' }}>
            <Col span={10} offset={2}>
              <h3>No Of Questions</h3> &nbsp;&nbsp;&nbsp;{' '}
              {this.state.no_of_questions}
            </Col>
            <Col span={10} offset={2}>
              <Button
                type='primary'
                shape='round'
                icon='download'
                size={'large'}
                onClick={this.handleAddQuestion}
              >
                Add Question
              </Button>
            </Col>
          </Row>
        </div>
        <br />
        <br />
        {this.state.questions.length === 0 ? (
          <div> </div>
        ) : (
          <div>
            {this.state.questions.map((question, index) => {
              return (
                <AddQuestion
                  IncrementQuestion={this.IncrementQuestion}
                  test_id={this.state.test_id}
                  key={index}
                />
              );
            })}
          </div>
        )}
      </>
    );
  }
}
