// src/App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import App from './App';

test('renders the component and interacts with it', () => {
  render(<App />);

  // Check if initial UI elements are present
  expect(screen.getByText(/Number:/)).toBeInTheDocument();
  expect(screen.getByText(/Reverse:/)).toBeInTheDocument();
  expect(screen.getByText(/Difference:/)).toBeInTheDocument();

  // Simulate user input
  fireEvent.change(screen.getByRole('textbox'), { target: { value: '1234' } });
  fireEvent.click(screen.getByText(/Submit/));

  // Check if the output is as expected
  expect(screen.getByText(/Reverse: 4321/)).toBeInTheDocument();
  expect(screen.getByText(/Difference: 3087/)).toBeInTheDocument();
});

const testCasesInputSanitization = [
    { input: '1', expectedSanitizeInput: '1',  expectedReverse: '1', expectedDifference: '0' },
    { input: '0', expectedSanitizeInput: '0',  expectedReverse: '0', expectedDifference: '0' },
    { input: '21', expectedSanitizeInput: '21',  expectedReverse: '12', expectedDifference: '9' },
    { input: '30', expectedSanitizeInput: '30',  expectedReverse: '3', expectedDifference: '27' },
    { input: '102', expectedSanitizeInput: '102',  expectedReverse: '201', expectedDifference: '99' },
    { input: '02', expectedSanitizeInput: '2',  expectedReverse: '2', expectedDifference: '0' },
    { input: '003', expectedSanitizeInput: '3',  expectedReverse: '3', expectedDifference: '0' },
    { input: '1,2', expectedSanitizeInput: '12',  expectedReverse: '21', expectedDifference: '9' },
    { input: '1.2', expectedSanitizeInput: '12',  expectedReverse: '21', expectedDifference: '9' },
    { input: 'e12', expectedSanitizeInput: '12',  expectedReverse: '21', expectedDifference: '9' },
    { input: '23e3', expectedSanitizeInput: '233',  expectedReverse: '332', expectedDifference: '99' },
    { input: '23e', expectedSanitizeInput: '23',  expectedReverse: '32', expectedDifference: '9' },
    { input: '23.2e2', expectedSanitizeInput: '2322',  expectedReverse: '2232', expectedDifference: '90' },
    { input: 'halo', expectedSanitizeInput: '',  expectedReverse: NaN, expectedDifference: NaN },
    { input: '12r0', expectedSanitizeInput: '120',  expectedReverse: '21', expectedDifference: '99' },
];

test.each(testCasesInputSanitization)(
  'handles input "$input" correctly',
  ({ input, expectedSanitizeInput, expectedReverse, expectedDifference }) => {
    render(<App />);

    const inputElement = screen.getByRole('textbox');
    // Simulate user input
    fireEvent.change(inputElement, { target: { value: input } });
    // Check if the input sanitized expected values
    expect(inputElement.value).toBe(expectedSanitizeInput);

    // Simulate user submit input
    fireEvent.click(screen.getByText(/Submit/));
    // Check if the output matches expected values
    expect(screen.getByText(`Reverse: ${expectedReverse}`)).toBeInTheDocument();
    expect(screen.getByText(`Difference: ${expectedDifference}`)).toBeInTheDocument();
  }
);