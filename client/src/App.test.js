import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({})
  })
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders WEATHER TODAY heading', () => {
  render(<App />);
  const headerElement = screen.getByText(/WEATHER TODAY/i);
  expect(headerElement).toBeInTheDocument();
});
test('renders the loader after input is typed and searched and then the data', async () => {
  const { container } = render(<App />);
  const inputElement = screen.getByLabelText('address-input');
  fireEvent.change(inputElement, { target: { value: 'Bangalore' } });
  fireEvent.click(screen.getByLabelText('search-btn'));
  const loader = container.getElementsByClassName('loader');
  expect(loader).toBeTruthy();
  const weatherDataNode = await waitFor(() => screen.getByLabelText('weather-forecast'));
  expect(weatherDataNode).toBeTruthy();
});
test('renders error after input is typed and searched', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ error: 'Unable to find location!' })
  })
  render(<App />);
  const inputElement = screen.getByLabelText('address-input');
  fireEvent.change(inputElement, { target: { value: 'abcd' } });
  fireEvent.click(screen.getByLabelText('search-btn'));
  const errorWeatherNode = await waitFor(() => screen.getByLabelText('error-weather'));
  expect(errorWeatherNode).toBeTruthy();
});
