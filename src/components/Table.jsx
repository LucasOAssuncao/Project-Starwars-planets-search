import React, { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import FilterBar from './FilterBar';
import Header from './Header';

function Table() {
  const { data, filter, filteredByName, setfilteredByName,
    column, sort } = useContext(DataContext);

  const SortCompared = ((a, b) => {
    if (column === 'name' && column !== '') {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) {
        return '-1';
      }
    }

    if (sort === 'ASC') {
      const columnA = a[column] === 'unknown';
      const columnB = b[column] === 'unknown';
      const valueA = columnA ? null : a[column];
      const valueB = columnB ? null : b[column];
      return valueA - valueB;
    }

    if (sort === 'DESC') {
      const columnA = a[column] === 'unknown';
      const columnB = b[column] === 'unknown';
      const valueA = columnA ? null : a[column];
      const valueB = columnB ? null : b[column];
      return valueB - valueA;
    }
  });

  useEffect(() => {
    const { name } = filter;

    const filterPlanetsName = data.filter((e) => e.name.includes(name));

    if (sort === 'ASC') {
      setfilteredByName(filterPlanetsName.sort(SortCompared));
    } else {
      // setfilteredByName(filterPlanetsName);
      setfilteredByName(data.sort(SortCompared));
    }
  }, [filter, data, setfilteredByName, sort]);

  return (
    data.length && (
      <div className="Table">
        <Header />
        <FilterBar />
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((e) => (
                <th key={ e }>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredByName.map((item, index) => (
              <tr key={ index }>
                <td>{item.name}</td>
                <td data-testid="planet-name">{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{item.films}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default Table;
