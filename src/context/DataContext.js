import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

export const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredByName, setfilteredByName] = useState([]);

  const Filter = {
    name: '',
  };

  const [filter, setFilter] = useState(Filter);

  const doFetch = async () => {
    const res = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const json = await res.json();
    setData(json.results.filter((e) => delete e.residents));
  };

  useEffect(() => {
    doFetch();
  }, []);

  const contextValue = {
    data,
    setData,
    filteredByName,
    setfilteredByName,
    filter,
    setFilter,
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
