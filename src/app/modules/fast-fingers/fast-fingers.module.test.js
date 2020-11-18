import React from 'react';
import { render } from '@testing-library/react';
import FastFingers from './fast-fingers.module';

test('renders learn react link', () => {
  const { getByText } = render(<FastFingers />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
