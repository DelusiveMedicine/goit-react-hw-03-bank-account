import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import Dashboard from './Dashboard/Dashboard';

const App = () => (
  <ToastProvider placement="bottom-right">
    <Dashboard />
  </ToastProvider>
);

export default App;
