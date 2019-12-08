import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from "mobx-react";
import App from './App';
import { AppState } from "./stores/main.store";

const store = new AppState()

test('renders header', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const h1Element = getByText(/Type a GitHub username/i);
  expect(h1Element).toBeInTheDocument();
});
