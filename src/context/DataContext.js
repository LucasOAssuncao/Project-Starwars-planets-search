import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

export const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredByName, setfilteredByName] = useState([]);

  const Filter = {
    name: '',
    FiltersValues: [],
    order: {
      column: 'population',
      sort: '',
    },
  };

  const [filter, setFilter] = useState(Filter);
  const [options, setOptions] = useState(['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);
  const [allPlanets, setAllPlanets] = useState([]);
  const [sort, setSort] = useState('ASC');
  const [column, setColumn] = useState('name');

  const doFetch = async () => {
    const res = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const json = await res.json();
    setAllPlanets(json.results.filter((e) => delete e.residents));
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
    options,
    setOptions,
    allPlanets,
    setAllPlanets,
    sort,
    setSort,
    column,
    setColumn,
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
