import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';

const App = () => {
  return (
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );
};

export default App;