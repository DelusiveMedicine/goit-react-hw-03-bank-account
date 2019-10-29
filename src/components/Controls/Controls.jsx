/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

class Controls extends Component {
  state = { amount: '' };

  changeHandler = ({ target }) => {
    const { value } = target;
    const valueNumber = Number(value);
    this.setState({
      amount: valueNumber,
    });
  };

  clickHandler = ({ target }) => {
    const { toastManager, onDeposit, onWithdraw } = this.props;
    const { dataset } = target;
    const { amount } = this.state;

    if (amount <= 0) {
      return toastManager.add('Введите сумму для проведения операции!', {
        appearance: 'warning',
        autoDismiss: true,
      });
    }

    if (dataset.name === 'deposit') onDeposit(amount);
    if (dataset.name === 'withdraw') onWithdraw(amount);
    return this.setState({ amount: '' });
  };

  render() {
    const { amount } = this.state;
    const { controls } = styles;

    return (
      <section className={controls}>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={this.changeHandler}
        />
        <button type="button" data-name="deposit" onClick={this.clickHandler}>
          Deposit
        </button>
        <button type="button" data-name="withdraw" onClick={this.clickHandler}>
          Withdraw
        </button>
      </section>
    );
  }
}

Controls.propTypes = {
  onDeposit: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
  toastManager: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
};

export default withToastManager(Controls);
