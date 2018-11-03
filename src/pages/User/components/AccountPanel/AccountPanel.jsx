import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '@icedesign/container';
import { Button, Dialog, Input, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import axios from 'axios';

@withRouter
export default class AccountPanel extends Component {
  static displayName = 'AccountPanel';

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      values: {
        email: '',
        name: '',
      },
    };
    axios
      .get('/api/user/profile')
      .then(({ data }) => {
        if (data.code) {
          Feedback.toast.error('未登录，资料更新失败');
        } else {
          this.setState({
            values: data.data,
          });
        }
      });
  }

  handleOpenEditPanel = () => {
    this.setState({ open: true });
  };

  handleCloseEditPanel = () => {
    this.setState({ open: false });
  };

  signout = () => {
    axios
      .get('/api/user/signout')
      .then(() => this.props.history.push('/'));
  };

  formChange = (value) => {
    console.log(value);
  };

  render() {
    return (
      <Container>
        <div style={styles.header}>
          <h2 style={styles.title}>账号信息</h2>
          <div>
            <Button onClick={this.signout} type="primary">
              登出
            </Button>
          </div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>账号邮箱</div>
          <div style={styles.infoDetail}>{ this.state.values.email }</div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>账号名称</div>
          <div style={styles.infoDetail}>{ this.state.values.name }</div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>账号头像</div>
          <div style={styles.infoDetail}>
            <img alt="头像" src={require('./images/avatar.jpg')} style={{ width: 120 }} />
          </div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>账号简介</div>
          <div style={styles.infoDetail}>这个家伙很懒什么都没有留下</div>
        </div>
        <Dialog
          visible={this.state.open}
          onOk={this.submitEdit}
          onClose={this.handleCloseEditPanel}
          onCancel={this.handleCloseEditPanel}
          title="修改账户信息"
        >
          <FormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
          >
            <div>
              <div style={styles.fromItem}>
                <span>账号名称：</span>
                <FormBinder name="name" required max={10} message="不能为空">
                  <Input style={{ width: 500 }} />
                </FormBinder>
              </div>
              <FormError style={{ marginLeft: 10 }} name="name" />
              <div style={styles.fromItem}>
                <span>账号头像：</span>
                <FormBinder name="avatar" required max={10} message="不能为空">
                  <Input style={{ width: 500 }} />
                </FormBinder>
              </div>
              <FormError style={{ marginLeft: 10 }} name="avatar" />
              <div style={styles.fromItem}>
                <span>账号简介：</span>
                <FormBinder name="desc" required max={200} message="不能为空">
                  <Input
                    multiple
                    hasLimitHint
                    maxLength={200}
                    style={{ width: 500 }}
                  />
                </FormBinder>
              </div>
              <FormError style={{ marginLeft: 10 }} name="desc" />
            </div>
          </FormBinderWrapper>
        </Dialog>
      </Container>
    );
  }
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    margin: 0,
    paddingBottom: 20,
  },
  infoRow: {
    padding: '16px 0',
    display: 'flex',
    borderBottom: '1px solid #f6f6f6',
  },
  infoLabel: {
    flex: '0 0 100px',
    color: '#999',
  },
  infoDetail: {},

  fromItem: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
};
