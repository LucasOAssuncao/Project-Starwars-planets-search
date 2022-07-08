import React from 'react';
import './App.css';
import Table from './components/Table';
import DataProvider from './context/DataContext';

function App() {
  return (
    <div>
      <DataProvider>
        <Table />
      </DataProvider>
    </div>
  );
}

export default App;
