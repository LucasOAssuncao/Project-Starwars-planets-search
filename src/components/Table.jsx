import React, { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import FilterBar from './FilterBar';
import Header from './Header';

function Table() {
  const { data, filter, filteredByName, setfilteredByName } = useContext(DataContext);

  useEffect(() => {
    const { name } = filter;
    const filterPlanetsName = data.filter((e) => (
      e.name.includes(name)
    ));
    setfilteredByName(filterPlanetsName);
  }, [filter, data, setfilteredByName]);

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
            {filteredByName.map((planet, index) => (
              <tr key={ index }>
                {Object.values(planet).map((e, i) => <td key={ i }>{e}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default Table;
