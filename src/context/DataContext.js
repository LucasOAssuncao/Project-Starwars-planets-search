import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

export const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const doFetch = async () => {
      const res = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const json = await res.json();
      setData(json.results.filter((e) => delete e.residents));
    };
    doFetch();
  }, []);

  const contextValue = {
    data,
  };

  return (
    <DataContext.Provider value={ contextValue }>
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
