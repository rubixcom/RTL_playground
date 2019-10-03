import React from 'react';
import { render, cleanup, fireEvent, getByLabelText } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from '../App';

afterEach(cleanup);

it("matches snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});