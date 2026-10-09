import React from 'react';
import Home from './pages/Home';
import { AdminProvider } from './context/AdminContext';

export default function App() {
  return (
    <AdminProvider>
      <Home />
    </AdminProvider>
  );
}
