import React from 'react';
import styles from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => {
  const { balanceStyle, incomeStyle, expensesStyle } = styles;
  return (
    <section className={balanceStyle}>
      <span className={incomeStyle}>{income}$</span>
      <span className={expensesStyle}>{expenses}$</span>
      <span>{`Balance: ${balance}$`}</span>
    </section>
  );
};

export default Balance;
