import React from 'react';
import { Row, Col, Button, Spin } from 'antd';
import moment from 'moment';
import AddQuestion from '../AddQuestion/index';
import { baseurl, endurl } from '../../../baseurl';

export default class ShowTestById extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      test_id: '',
      no_of_questions: 0,
      test: {},
      loading: false
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
    this.setState({ loading: true });
    let id = this.props.match.params.id;
    fetch(`${baseurl}tests/fetch_test_by_id/${id}/${endurl}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          test: data,
          loading: false,
          test_id: data._id,
          no_of_questions: parseInt(data.count)
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let test = this.state.test;
    if (this.state.loading === true) {
      return (
        <div style={{ padding: '15%', paddingLeft: '50%' }}>
          <Spin size='large' />
        </div>
      );
    } else {
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
                <h3>Test End Time</h3>&nbsp;&nbsp;&nbsp;&nbsp; {test.end_time}
              </Col>
            </Row>
            <br />
            <Row style={{ paddingLeft: '10%' }}>
              <Col span={10} offset={2}>
                <h3>Is Password Set For This Test ??</h3>{' '}
                &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                {test.set_password === 'true'
                  ? 'Yes'.toUpperCase()
                  : 'No'.toUpperCase()}
              </Col>
              <Col span={10} offset={2}>
                <h3>Will Questions Be In Shuffle Order ??</h3>
                &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                {test.shuffle_required === 'true'
                  ? 'Yes'.toUpperCase()
                  : 'No'.toUpperCase()}
              </Col>
            </Row>
            <br />
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
}
