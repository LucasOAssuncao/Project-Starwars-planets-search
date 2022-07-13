import React from 'react';
import './App.css';
import Table from './components/Table';
import DataProvider from './context/DataContext';

function App() {
  return (
    <div className="all-father">
      <DataProvider>
        <Table />
      </DataProvider>
    </div>
  );
}

export default App;
