import React from 'react';
import EditQuestion from './EditQuestion';

export default class EditTest extends React.Component {
  dummy_data_1 = [
    {
      option_id: 3029,
      test_question_id: 226,
      option_english_text: '45',
      option_hindi_text: '',
      _id: 226,
      test_id: 61,
      correct_option_index: '2',
      english_text:
        'A and B together can do a piece of work in 20 days and A alone can do it in 30 days. B alone can do the work in how many days ? ',
      hindi_text:
        'A और B मिलकर एक कार्य को 20 दिनों में पूरा कर सकते हैं तथा A अकेले इसे 30 दिनों में पूरा कर सकता है। B अकेले इस कार्य को कितने दिनों में पूरा कर सकता है ?',
      pic: null
    },
    {
      option_id: 3030,
      test_question_id: 226,
      option_english_text: '60',
      option_hindi_text: '',
      _id: 226,
      test_id: 61,
      correct_option_index: '2',
      english_text:
        'A and B together can do a piece of work in 20 days and A alone can do it in 30 days. B alone can do the work in how many days ? ',
      hindi_text:
        'A और B मिलकर एक कार्य को 20 दिनों में पूरा कर सकते हैं तथा A अकेले इसे 30 दिनों में पूरा कर सकता है। B अकेले इस कार्य को कितने दिनों में पूरा कर सकता है ?',
      pic: null
    },
    {
      option_id: 3031,
      test_question_id: 226,
      option_english_text: '75',
      option_hindi_text: '',
      _id: 226,
      test_id: 61,
      correct_option_index: '2',
      english_text:
        'A and B together can do a piece of work in 20 days and A alone can do it in 30 days. B alone can do the work in how many days ? ',
      hindi_text:
        'A और B मिलकर एक कार्य को 20 दिनों में पूरा कर सकते हैं तथा A अकेले इसे 30 दिनों में पूरा कर सकता है। B अकेले इस कार्य को कितने दिनों में पूरा कर सकता है ?',
      pic: null
    },
    {
      option_id: 3032,
      test_question_id: 226,
      option_english_text: '90',
      option_hindi_text: '',
      _id: 226,
      test_id: 61,
      correct_option_index: '2',
      english_text:
        'A and B together can do a piece of work in 20 days and A alone can do it in 30 days. B alone can do the work in how many days ? ',
      hindi_text:
        'A और B मिलकर एक कार्य को 20 दिनों में पूरा कर सकते हैं तथा A अकेले इसे 30 दिनों में पूरा कर सकता है। B अकेले इस कार्य को कितने दिनों में पूरा कर सकता है ?',
      pic: null
    },
    {
      option_id: 3033,
      test_question_id: 226,
      option_english_text: 'None',
      option_hindi_text: '',
      _id: 226,
      test_id: 61,
      correct_option_index: '2',
      english_text:
        'A and B together can do a piece of work in 20 days and A alone can do it in 30 days. B alone can do the work in how many days ? ',
      hindi_text:
        'A और B मिलकर एक कार्य को 20 दिनों में पूरा कर सकते हैं तथा A अकेले इसे 30 दिनों में पूरा कर सकता है। B अकेले इस कार्य को कितने दिनों में पूरा कर सकता है ?',
      pic: null
    }
  ];
  dummy_data_2 = [
    {
      option_id: 233,
      test_question_id: 59,
      option_english_text: '1',
      option_hindi_text: '',
      _id: 59,
      test_id: 56,
      correct_option_index: '2',
      english_text: ' ',
      hindi_text: ' ',
      pic: '63f8b1c4b5856abea4634d707b585dbd'
    },
    {
      option_id: 234,
      test_question_id: 59,
      option_english_text: '2',
      option_hindi_text: '',
      _id: 59,
      test_id: 56,
      correct_option_index: '2',
      english_text: ' ',
      hindi_text: ' ',
      pic: '63f8b1c4b5856abea4634d707b585dbd'
    },
    {
      option_id: 235,
      test_question_id: 59,
      option_english_text: '3',
      option_hindi_text: '',
      _id: 59,
      test_id: 56,
      correct_option_index: '2',
      english_text: ' ',
      hindi_text: ' ',
      pic: '63f8b1c4b5856abea4634d707b585dbd'
    },
    {
      option_id: 236,
      test_question_id: 59,
      option_english_text: '0',
      option_hindi_text: '',
      _id: 59,
      test_id: 56,
      correct_option_index: '2',
      english_text: ' ',
      hindi_text: ' ',
      pic: '63f8b1c4b5856abea4634d707b585dbd'
    }
  ];
  render() {
    return (
      <EditQuestion
        question={this.dummy_data_1[0]}
        options={this.dummy_data_1}
      />
    );
  }
}
