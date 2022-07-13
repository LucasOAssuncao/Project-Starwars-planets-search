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
    <header className="flex justify-center p-[10px] bg-[black] text-[black]">
      <div>
        <input
          className="input input-bordered w-full max-w-xs"
          data-testid="name-filter"
          placeholder="Procure pelo nome do planeta"
          onChange={ ({ target }) => handleChange(target.value) }
          type="text"
        />
      </div>
    </header>
  );
}
