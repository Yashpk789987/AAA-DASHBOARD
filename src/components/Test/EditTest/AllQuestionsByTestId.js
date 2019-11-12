import React from 'react';
import { Collapse } from 'antd';
import { baseurl, endurl } from '../../../baseurl';
import EditQuestion from './EditQuestion';
const { Panel } = Collapse;

export default class AllQuestionsByTestId extends React.Component {
  state = {
    test_questions: [],
    loading: false,
    test_question_array: []
  };
  load_test = _id => {
    this.setState({ loading: true });
    fetch(`${baseurl}tests/fetch_test_questions_by_test_id/${_id}/${endurl}`)
      .then(res => res.json())
      .then(data => {
        if (data.length !== 0) {
          this.setState({ test_questions: data });
          ///////////////// For Formatiing Data /////////////////////////////
          let test_questions = data;
          let test_question_array = [];
          let test_question = { test_options: [] };
          // eslint-disable-next-line
          let test_question_counter = 0;
          let previous_test_question_id = null;
          for (let i = 0; i <= test_questions.length; i++) {
            if (i === test_questions.length) {
              test_question_array.push(test_question);
              test_question_counter++;
              break;
            }
            if (
              previous_test_question_id !== test_questions[i].test_question_id
            ) {
              if (i !== 0) {
                test_question_array.push(test_question);
                test_question_counter++;
              }
              test_question = { test_options: [] };
              previous_test_question_id = test_questions[i].test_question_id;
              test_question.test_question_id =
                test_questions[i].test_question_id;
              test_question.english_text = test_questions[i].english_text;
              test_question.hindi_text = test_questions[i].hindi_text;
              test_question.correct_option_index =
                test_questions[i].correct_option_index;
              test_question.pic = test_questions[i].pic;
              test_question.is_attempted = false;
              test_question.attempted_index = 0;
              test_question.test_options.push({
                option_id: test_questions[i].option_id,
                option_english_text: test_questions[i].option_english_text,
                option_hindi_text: test_questions[i].option_hindi_text
              });
            } else {
              test_question.test_options.push({
                option_id: test_questions[i].option_id,
                option_english_text: test_questions[i].option_english_text,
                option_hindi_text: test_questions[i].option_hindi_text
              });
            }
          }

          this.setState({
            test_question_array: test_question_array,
            loading: false
          });
          ///////////////// For Formatiing Data /////////////////////////////
        } else {
          alert('Test Is Not Set . Please Contact To Institution');
        }
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.load_test(this.props.test_id);
  }

  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    if (nextProps !== this.props) {
      this.load_test(nextProps.test_id);
    }
  }
  render() {
    if (this.state.loading === true) {
      return <h1>Loading ....</h1>;
    }
    return (
      <div style={{ paddingTop: '5%' }}>
        <Collapse accordion>
          {this.state.test_question_array.map((item, index) => {
            return (
              <Panel
                header={`${index + 1} . ` + item.english_text}
                key={item.test_question_id}
              >
                <EditQuestion question={item} />
              </Panel>
            );
          })}
        </Collapse>
      </div>
    );
  }
}
