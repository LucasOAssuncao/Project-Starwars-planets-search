import React, { useCallback, useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';

export default function FilterBar() {
  const {
    filter,
    setFilter,
    setData,
    options,
    setOptions,
    setUsedFilters,
    allPlanets,
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

  const applyFilter = useCallback(() => {
    const filterNumber = allPlanets
      .filter((e) => filter.FiltersValues.every((filters) => {
        if (filters.compareFilter === 'maior que') {
          return Number(e[filters.tagFilter]) > Number(filters.numberFilter);
        }
        if (filters.compareFilter === 'menor que') {
          return Number(e[filters.tagFilter]) < Number(filters.numberFilter);
        }
        if (filters.compareFilter === 'igual a') {
          return Number(e[filters.tagFilter]) === Number(filters.numberFilter);
        }
        return null;
      }));
    setData(filterNumber);
  }, [filter.FiltersValues, allPlanets, setData]);

  const removeFilter = ({ target: { value } }) => {
    setOptions([...options, value]);
    const refresh = filter.FiltersValues.filter(
      (filters) => filters.tagFilter !== value,
    );
    setFilter({
      ...filter,
      FiltersValues: refresh,
    });
  };

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  const removeAllFilters = () => {
    setFilter({ ...filter, FiltersValues: [] });
    setUsedFilters([]);
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
              <option value={ e } key={ e }>
                {e}
              </option>
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
        {filter.FiltersValues
          && filter.FiltersValues.map(
            ({
              compareFilter: compare,
              numberFilter: number,
              tagFilter: tag,
            }, index) => (
              <p data-testid="filter" key={ index }>
                {`${tag} ${compare} ${number}`}
                <button
                  value={ tag }
                  type="button"
                  onClick={ removeFilter }
                >
                  Delete
                </button>
              </p>
            ),
          )}
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover Todos os Filtros
        </button>
      </div>
    </div>
  );
}
