import React from 'react';

import { baseurl, endurl } from '../../baseurl';
import { Spin } from 'antd';

function CustomRow(props) {
  return (
    <tr>
      {Object.values(props.row).map((item, key) => {
        return <td key={key}>{item}</td>;
      })}
    </tr>
  );
}

function EnquiryTable(props) {
  if (props.loading === true) {
    return (
      <div style={{ padding: '20%', paddingLeft: '50%' }}>
        <Spin size='large' />
      </div>
    );
  } else if (props.enquiries.length === 0) {
    return (
      <div style={{ padding: '35%', paddingTop: '5%' }}>
        <h5>No Enquiries Found</h5>
      </div>
    );
  } else if (props.enquiries.length !== 0) {
    return (
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Count : </th>
            <td>{props.enquiries.length}</td>
          </tr>
          <tr>
            {Object.keys(props.enquiries[0]).map((item, key) => {
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
          </tr>
        </thead>
        <tbody>
          {props.enquiries.map((item, key) => {
            return <CustomRow row={item} key={key} />;
          })}
        </tbody>
      </table>
    );
  }
}

export default class Enquiry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      enquiries: []
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    fetch(`${baseurl}enquiry/show_all/${endurl}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ enquiries: data, loading: false });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div style={{ paddingTop: '5%' }}>
        <EnquiryTable
          loading={this.state.loading}
          enquiries={this.state.enquiries}
        />
      </div>
    );
  }
}
