import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

function Table() {
  const { data } = useContext(DataContext);

  return (
    data.length && (
      <div className="Table">
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((e) => (
                <th key={ e }>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((planet, index) => (
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
