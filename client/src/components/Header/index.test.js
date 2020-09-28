import React from 'react';
import { render } from '@testing-library/react';
import Header from './index.js'

it("Header logo renders correctly", () => {
    const {queryByTestId} = render(<Header />)
    expect(queryByTestId("header-logo")).toBeTruthy()
})