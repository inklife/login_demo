import React, { Component } from 'react';
import AccountPanel from './components/AccountPanel';

export default class User extends Component {
  static displayName = 'User';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-page">
        <AccountPanel />
      </div>
    );
  }
}
