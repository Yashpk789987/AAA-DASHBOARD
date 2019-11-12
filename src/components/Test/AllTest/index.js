import React from 'react';
import { baseurl, endurl } from '../../../baseurl';
import { List, Skeleton } from 'antd';
import moment from 'moment';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import ShowTestById from '../ShowTestById';

class AllTestComponent extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: []
  };

  getData = callback => {
    fetch(`${baseurl}tests/fetch_all_test/${endurl}`)
      .then(res => res.json())
      .then(data => {
        callback(data);
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res,
        list: res
      });
    });
  }

  isOnline = obj => {
    let end_date_time = obj.test_commence_date + ' ' + obj.end_time;
    let start_date_Time = obj.test_commence_date + ' ' + obj.test_commence_time;
    start_date_Time = moment(start_date_Time);
    end_date_time = moment(end_date_time);
    let currentDateTime = moment(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    );

    var difference_with_start_time = currentDateTime.diff(
      start_date_Time,
      'seconds'
    );

    var range = end_date_time.diff(start_date_Time, 'seconds');
    if (difference_with_start_time < 0) {
      return 'Yet To Start';
    } else if (difference_with_start_time > range) {
      return 'Test Is Finished';
    } else {
      return 'Presently Online';
    }
  };

  render() {
    let match = this.props.match;
    const { initLoading, list } = this.state;

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div style={{ padding: '5%' }}>
          <center>
            <h1>
              <u>List Of All Tests</u>
            </h1>
          </center>
          <List
            className='demo-loadmore-list'
            loading={initLoading}
            itemLayout='horizontal'
            dataSource={list}
            renderItem={item => (
              <List.Item
                actions={[<Link to={`${match.url}/${item._id}`}>Edit</Link>]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={
                      <div style={{ fontWeight: 'bold', fontSize: 20 }}>
                        {item.english_title}
                      </div>
                    }
                    description={
                      <div>
                        <h3>
                          {moment(item.test_commence_date).format(
                            'Do MMM ddd YYYY'
                          )}
                        </h3>
                        <h4>Commence Time : {item.test_commence_time}</h4>
                      </div>
                    }
                  />
                  <div>
                    Current Status : &nbsp;&nbsp;&nbsp;
                    <h3>{this.isOnline(item)}</h3>
                  </div>
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default class AllTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (localStorage.getItem('authenticated') === 'true') {
      let match = this.props.match;
      return (
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route
              exact
              path={`${match.url}`}
              render={props => <AllTestComponent {...props} />}
            />
            <Route
              path={`${match.url}/:id`}
              render={props => <ShowTestById {...props} />}
            />
          </Switch>
        </Router>
      );
    } else {
      return <Redirect to={{ pathname: '/login' }} />;
    }
  }
}
