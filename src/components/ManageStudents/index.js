import React from 'react';

import { baseurl, endurl } from '../../baseurl';
import { Spin, Button } from 'antd';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import UpdateStudentPermissions from './UpdateStudentPermissions';

function CustomRow(props) {
  return (
    <tr>
      {Object.values(props.row).map((item, key) => {
        return <td key={key}>{item}</td>;
      })}
      <td>
        <Button type='primary' size={'large'}>
          <Link to={`${props.match.url}/${props.row._id}`}>
            Click To See And Edit
          </Link>
        </Button>
      </td>
    </tr>
  );
}

function StudentsTable(props) {
  if (props.loading === true) {
    return (
      <div style={{ padding: '20%', paddingLeft: '50%' }}>
        <Spin size='large' />
      </div>
    );
  } else if (props.students.length === 0) {
    return (
      <div style={{ padding: '35%', paddingTop: '5%' }}>
        <h5>No students Found</h5>
      </div>
    );
  } else if (props.students.length !== 0) {
    return (
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            {Object.keys(props.students[0]).map((item, key) => {
              return (
                <th
                  key={key}
                  style={{ position: 'sticky', top: 0, zIndex: 10 }}
                  scope='col'
                >
                  {item}
                </th>
              );
            })}
            <th style={{ position: 'sticky', top: 0, zIndex: 10 }} scope='col'>
              Permissions
            </th>
          </tr>
        </thead>
        <tbody>
          {props.students.map((item, key) => {
            return <CustomRow match={props.match} row={item} key={key} />;
          })}
        </tbody>
      </table>
    );
  }
}

class AllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      students: []
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    fetch(`${baseurl}students/show_all/${endurl}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ students: data, loading: false });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <StudentsTable
        match={this.props.match}
        loading={this.state.loading}
        students={this.state.students}
      />
    );
  }
}

export default class ManageStudents extends React.Component {
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
              render={props => <AllStudents {...props} />}
            />
            <Route
              path={`${match.url}/:student_id`}
              render={props => <UpdateStudentPermissions {...props} />}
            />
          </Switch>
        </Router>
      );
    } else {
      return <Redirect to={{ pathname: '/login' }} />;
    }
  }
}
