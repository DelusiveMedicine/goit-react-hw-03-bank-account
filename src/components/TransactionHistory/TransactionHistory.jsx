import React from 'react';
import styles from './TransactionHistory.module.css';
import thousandsSeparator from '../helpers';

const TransactionHistory = ({ items }) => {
  const { history, historyBodyItem, historyHeadItem } = styles;
  return (
    <table className={history}>
      <thead>
        <tr>
          <th className={historyHeadItem}>Transaction</th>
          <th className={historyHeadItem}>Amount</th>
          <th className={historyHeadItem}>Date</th>
        </tr>
      </thead>

      <tbody>
        {items.map(item => {
          const { id, type, amount, date } = item;
          const withFixedPoint = thousandsSeparator(amount.toFixed(2));
          return (
            <tr key={id}>
              <td className={historyBodyItem}>{type}</td>
              <td className={historyBodyItem}>{withFixedPoint}$</td>
              <td className={historyBodyItem}>{date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionHistory;
