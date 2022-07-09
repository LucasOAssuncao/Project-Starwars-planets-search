import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export default function Header() {
  const { setFilter, filter } = useContext(DataContext);

  const handleChange = (param) => {
    setFilter({
      ...filter,
      name: param,
    });
  };

  return (
    <header>
      <div>
        <input
          data-testid="name-filter"
          placeholder="Digite um nome"
          onChange={ ({ target }) => handleChange(target.value) }
          type="text"
        />
      </div>
    </header>
  );
}
