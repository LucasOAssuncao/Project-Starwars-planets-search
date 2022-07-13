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
    const filterNumber = allPlanets.filter((e) => filter
      .FiltersValues.every((filters) => {
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
    <div className="filter-bar-father flex">
      <div className="flex items-center p-[10px] ">
        <label className="label" htmlFor="tagFilter">
          <select
            className="select select-bordered"
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
        <label className="label" htmlFor="compareFilter">
          <select
            className="select select-bordered"
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
        <label htmlFor="numberFilter" className="label">
          <input
            className="input input-bordered w-full max-w-xs"
            name="numberFilter"
            id="numberFilter"
            type="text"
            value={ numberFilter }
            data-testid="value-filter"
            onChange={ ({ target: { value } }) => setNumberFilter(value) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          className="btn bg-[black]"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>
      <div className="flex items-center p-[5px] ">
        {filter.FiltersValues
          && filter.FiltersValues.map(
            (
              { compareFilter: compare, numberFilter: number, tagFilter: tag },
              index,
            ) => (
              <div
                data-testid="filter"
                className="btn bg-[#5b5b5b] mr-[3px]"
                key={ index }
              >
                {`${tag} ${compare} ${number}`}
                <button
                  value={ tag }
                  type="button"
                  onClick={ removeFilter }
                  className="btn-outline p-[10px]"
                >
                  {' '}
                  X
                </button>
              </div>
            ),
          )}
      </div>
      <div className="flex items-center p-[10px] ">
        <button
          className="btn bg-[#FF3232]"
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover Todos os Filtros
        </button>
      </div>
      <div className="flex items-center p-[10px]">
        <label htmlFor="order">
          <select
            className="select select-bordered bg-[black] text-[white]"
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
        <div className="form-control flex-row items-center p-[10px]">
          <label htmlFor="asc" className="label-text p-[10px] text-lg text-[white] ">
            Ascendente
            <input
              className="radio checked:bg-red-500"
              type="radio"
              name="radio-order"
              id="asc"
              value="ASC"
              // checked={ sort === 'ASC' }
              data-testid="column-sort-input-asc"
              onChange={ ({ target }) => {
                setSort(target.value);
              } }
            />
          </label>
          <label htmlFor="desc" className="label-text p-[10px] text-lg text-[white]">
            Descendente
            <input
              className="radio checked:bg-blue-500"
              type="radio"
              name="radio-order"
              id="desc"
              value="DESC"
              data-testid="column-sort-input-desc"
              onChange={ ({ target }) => {
                setSort(target.value);
              } }
            />
          </label>
          <button
            className="btn bg-[white] text-[black]"
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
    </div>
  );
}
