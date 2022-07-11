import React, { useCallback, useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';

export default function FilterBar() {
  const {
    filter,
    setFilter,
    setData,
    options,
    setOptions,
    allPlanets,
    sort,
    setSort,
    column,
    setColumn,
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
        return Number(e[filters.tagFilter]) === Number(filters.numberFilter);
      }));
    setData(filterNumber);
  }, [filter.FiltersValues, allPlanets, setData]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

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

  const removeAllFilters = () => {
    setFilter({ ...filter, FiltersValues: [] });
  };

  const handleSortClick = () => {
    setFilter({
      ...filter,
      order: {
        column,
        sort,
      },

    });
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
      <div>
        <label htmlFor="order">
          <select
            name="order"
            id="order"
            data-testid="column-sort"
            onChange={ ({ target }) => setColumn(target.value) }
          >
            <option value="rotation_period">rotation_period</option>
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="asc">
          Ascendente
          <input
            type="radio"
            name="radio-order"
            id="asc"
            value="ASC"
            // checked={ sort === 'ASC' }
            data-testid="column-sort-input-asc"
            onChange={ ({ target }) => { setSort(target.value); } }
          />
        </label>
        <label htmlFor="desc">
          Descendente
          <input
            type="radio"
            name="radio-order"
            id="desc"
            value="DESC"
            // checked={ sort === 'DESC' }
            data-testid="column-sort-input-desc"
            onChange={ ({ target }) => { setSort(target.value); } }
          />
        </label>
        <button
          name="Filtrar"
          id="Filtrar"
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleSortClick() }
        >
          Ordenar
        </button>
      </div>
    </div>
  );
}
