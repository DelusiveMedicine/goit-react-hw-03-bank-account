/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withToastManager } from 'react-toast-notifications';
import shortId from 'shortid';
import styles from './Dashboard.module.css';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import thousandsSeparator from '../helpers';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    if (localStorage.transactions || localStorage.balance)
      this.setState({
        transactions: JSON.parse(localStorage.getItem('transactions')),
        balance: JSON.parse(localStorage.getItem('balance')),
      });
  }

  componentDidUpdate() {
    const keys = Object.keys(this.state);
    return keys.forEach(key =>
      localStorage.setItem(key, JSON.stringify(this.state[key])),
    );
  }

  onDeposit = amount => {
    this.setState(prevState => ({
      balance: prevState.balance + amount,
    }));
    this.addTransaction('deposit', amount);
  };

  onWithdraw = amount => {
    const { balance } = this.state;
    const { toastManager } = this.props;
    if (balance < amount) {
      return toastManager.add(
        'На счету недостаточно средств для проведения операции!',
        {
          appearance: 'warning',
          autoDismiss: true,
        },
      );
    }
    this.setState(prevState => ({
      balance: prevState.balance - amount,
    }));
    return this.addTransaction('withdraw', amount);
  };

  addTransaction = (type, amount) => {
    const transaction = {
      id: shortId(),
      type,
      amount,
      date: new Date().toLocaleString(),
    };

    this.setState(prevState => ({
      transactions: [...prevState.transactions, transaction],
    }));
  };

  handleSum = type => {
    const { transactions } = this.state;
    const sum = transactions.reduce(
      (acc, unit) => acc + (unit.type === type && unit.amount),
      0,
    );
    return thousandsSeparator(sum.toFixed(2));
  };

  render() {
    const { balance, transactions } = this.state;
    const { dashboard } = styles;
    const fixedPointBalance = thousandsSeparator(balance.toFixed(2));
    const income = this.handleSum('deposit');
    const expenses = this.handleSum('withdraw');

    return (
      <div className={dashboard}>
        <Controls
          onDeposit={this.onDeposit}
          onWithdraw={this.onWithdraw}
          balance={balance}
        />
        <Balance
          balance={fixedPointBalance}
          income={income}
          expenses={expenses}
        />
        {transactions.length > 0 && <TransactionHistory items={transactions} />}
      </div>
    );
  }
}

Dashboard.propTypes = {
  toastManager: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
};

export default withToastManager(Dashboard);
