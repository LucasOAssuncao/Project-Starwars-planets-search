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


});
