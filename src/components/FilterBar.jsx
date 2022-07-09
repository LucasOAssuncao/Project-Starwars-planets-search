import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

export default function FilterBar() {
  const {
    filter,
    setFilter,
    filteredByName,
    setData,
    options,
    setOptions,
    usedFilters,
    setUsedFilters,
  } = useContext(DataContext);

  const [compareFilter, setCompareFilter] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState('0');
  const [tagFilter, setTagFilter] = useState('population');

  const handleClick = () => {
    setFilter((prev) => ({
      ...filter,
      FiltersValues: [
        ...prev.FiltersValues,
        { compareFilter, numberFilter, tagFilter },
      ],
    }));

    const FilterComparer = filteredByName.filter((e) => {
      if (compareFilter === 'maior que') {
        return Number(e[tagFilter]) > Number(numberFilter);
      }
      if (compareFilter === 'menor que') {
        return Number(e[tagFilter]) < Number(numberFilter);
      }
      if (compareFilter === 'igual a') {
        return Number(e[tagFilter]) === Number(numberFilter);
      }
      return null;
    });
    setData(FilterComparer);
    const selectFilters = options.filter((e) => e !== tagFilter);
    setOptions(selectFilters);
    setTagFilter('population');
    setUsedFilters((prev) => ({
      filtersUsed: [
        ...prev.filtersUsed,
        { tagFilter, compareFilter, numberFilter },
      ],
    }));
  };

  return (
    <div className="filter-bar-father">
      <div>
        <label htmlFor="tagFilter">
          <select
            name="tagFilter"
            id="tagFilter"
            data-testid="column-filter"
            onChange={ ({ target: { value } }) => setTagFilter(value) }
          >
            {options.map((e) => (
              <option value={ e } key={ e }>{e}</option>
            ))}
          </select>
        </label>
        <label htmlFor="compareFilter">
          <select
            name="compareFilter"
            id="compareFilter"
            data-testid="comparison-filter"
            onChange={ ({ target: { value } }) => setCompareFilter(value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="numberFilter">
          <input
            name="numberFilter"
            id="numberFilter"
            type="text"
            value={ numberFilter }
            data-testid="value-filter"
            onChange={ ({ target: { value } }) => setNumberFilter(value) }
          />
        </label>
        <button type="button" data-testid="button-filter" onClick={ handleClick }>
          Filtrar
        </button>
      </div>
      <div>
        {usedFilters.filtersUsed && usedFilters.filtersUsed.map(
          ({
            compareFilter: compare,
            numberFilter: number,
            tagFilter: tag,
          }) => (
            <p data-testid="filter" key="e">
              {`${tag} ${compare} ${number}`}
              <button
                data-testid="button-remove-filters"
                type="button"
              >
                Delete

              </button>
            </p>
          ),
        )}
        <button
          type="button"
          data-testid="button-remove-filters"
          //   onClick={ removeAllFilters }
        >
          Remover Todos os Filtros
        </button>
      </div>
    </div>
  );
}
