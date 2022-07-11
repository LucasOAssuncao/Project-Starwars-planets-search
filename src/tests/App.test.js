import React from 'react';
import { cleanup, render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import MockApi from './MockApi'

describe('test the render of the page', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MockApi)
    })
    await act(async () =>{
    render(<App />)
    } )
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('test if filter "maior que" is working', async () => {
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)

    const valueFilter = screen.getByTestId('value-filter');
    const btnFiltrar = screen.getByTestId('button-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter')
    userEvent.click(comparisonFilter)

    userEvent.click(screen.getByRole('option', {name: /maior que/i}));

    userEvent.type(valueFilter, '1000000')
    userEvent.click(btnFiltrar);

    expect(await screen.findAllByRole('row')).toHaveLength(7)
    screen.getByText(/population maior que 01000000/i)
  });

  test('test if filter "igual a" is working', async () => {
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)

    const valueFilter = screen.getByTestId('value-filter');
    const btnFiltrar = screen.getByTestId('button-filter');
    
    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "igual a"} });

    userEvent.type(valueFilter, '1000000')
    userEvent.click(btnFiltrar);

    expect(screen.getByText(/0/i)).toBeInTheDocument();

  });

  test('test if filter "menor que" is working', async () => {
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)

    const valueFilter = screen.getByTestId('value-filter');
    const btnFiltrar = screen.getByTestId('button-filter');
    
    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "menor que"} });

    userEvent.type(valueFilter, '1000000')
    userEvent.click(btnFiltrar);

    expect(await screen.findAllByRole('row')).toHaveLength(3)
  });


  test('test if handle change filter is working', async () => {
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)
    
    const Filter = screen.getByTestId('name-filter');
    userEvent.type(Filter, 'Tatooine')
    expect(await screen.findAllByRole('row')).toHaveLength(2)
  });

  test('testing remove filter', async () => {
    expect(await screen.findAllByRole('row')).toHaveLength(11);


    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'diameter' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'maior que' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '9000' }});
    fireEvent.click(await screen.findByTestId('button-filter'));
    expect(await screen.findAllByRole('row')).toHaveLength(8);

    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'population' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'menor que' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '1000000' }});
    fireEvent.click(await screen.findByTestId('button-filter'));
    expect(await screen.findAllByRole('row')).toHaveLength(3);

    const removeFilter = async () => {
      const btnFilter = await screen.findAllByTestId('filter');
      fireEvent.click(btnFilter[0].querySelector('button'));
      fireEvent.click(btnFilter[0].querySelector('button'));
    };
     await removeFilter();
    expect(await screen.findAllByRole('row')).toHaveLength(11);
  });

  test('Test if the order is correct by column "orbital_period" in Desc', async () => {

    fireEvent.change(await screen.findByTestId('column-sort'), { target: { value: 'orbital_period' }});
    fireEvent.click(await screen.findByTestId('column-sort-input-desc'));
    fireEvent.click(await screen.findByTestId('column-sort-button'));
    const expectedPlanets = ['Bespin', 'Yavin IV', 'Hoth', 'Kamino', 'Endor', 'Coruscant', 'Alderaan', 'Dagobah', 'Naboo', 'Tatooine'];
    const planetName = await screen.findAllByTestId('planet-name');
    const planeta = planetName.map(item => item.innerHTML);
    expect(planeta).toEqual(expectedPlanets);
  });

  test('Test if the order is correct by column "diameter" in Asc', async () => {

    fireEvent.change(await screen.findByTestId('column-sort'), { target: { value: 'diameter' }});
    fireEvent.click(await screen.findByTestId('column-sort-input-asc'));
    fireEvent.click(await screen.findByTestId('column-sort-button'));
    const expectedPlanets = ['Endor', 'Hoth', 'Dagobah', 'Yavin IV', 'Tatooine', 'Naboo', 'Coruscant', 'Alderaan', 'Kamino', 'Bespin'];
    const planetName = await screen.findAllByTestId('planet-name');
    const planeta = planetName.map(planet => planet.innerHTML);
    expect(planeta).toEqual(expectedPlanets);
  });

  test('Testando se a ordem está correta pela column "population" em Ascendente', async () => {

    fireEvent.change(await screen.findByTestId('column-sort'), { target: { value: 'population' }});
    fireEvent.click(await screen.findByTestId('column-sort-input-asc'));
    fireEvent.click(await screen.findByTestId('column-sort-button'));
    const expectedPlanets = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV','Dagobah', 'Hoth'];
    const planetName = await screen.findAllByTestId('planet-name');
    const planeta = planetName.map(planet => planet.innerHTML);
    // console.log(planeta);
    expect(planeta).toEqual(expectedPlanets.reverse());
  });

  test('Testando se a ordem está correta pela column "population" em Descendente', async () => {

    fireEvent.change(await screen.findByTestId('column-sort'), { target: { value: 'population' }});
    fireEvent.click(await screen.findByTestId('column-sort-input-desc'));
    fireEvent.click(await screen.findByTestId('column-sort-button'));
    const expectedPlanets = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV', 'Hoth','Dagobah'];
    const planetName = await screen.findAllByTestId('planet-name');
    const planeta = planetName.map(planet => planet.innerHTML);
    // console.log(planeta);
    expect(planeta).toEqual(expectedPlanets);
  });

  test('Testando se a ordem está correta pela column "surface_water" em Ascendente', async () => {

    fireEvent.change(await screen.findByTestId('column-sort'), { target: { value: 'surface_water ' }});
    fireEvent.click(await screen.findByTestId('column-sort-input-asc'));
    fireEvent.click(await screen.findByTestId('column-sort-button'));   
    const expectedPlanets = [ 'Tatooine','Alderaan', 'Yavin IV','Hoth','Dagobah',"Bespin","Endor",'Naboo',"Coruscant", 'Kamino'];
    const planetName = await screen.findAllByTestId('planet-name');
    const planeta = planetName.map(planet => planet.innerHTML);
    // console.log(planeta);
    expect(planeta).toEqual(expectedPlanets);
  });

  test('Test removeAllFilter', async () => {
    const removeAllFilter = async () => {
      const filters =  screen.queryByTestId('button-remove-filters')
      fireEvent.click(filters)
    };
    expect(await screen.findAllByRole('row')).toHaveLength(11);

    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'diameter' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'maior que' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '9000' }});
    fireEvent.click(await screen.findByTestId('button-filter'));

    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'population' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'igual a' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '200000' }});
    fireEvent.click(await screen.findByTestId('button-filter'));

     await removeAllFilter();
    expect(await screen.findAllByRole('row')).toHaveLength(11);
  });

  


});
