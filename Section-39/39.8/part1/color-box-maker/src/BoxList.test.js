import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from './BoxList';

it("renders without crashing", () => {
    render(<BoxList />)
})

it("matches snapshot", () => {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
})

it("adds a box when form is submitted", () => {
    const { getByLabelText, queryByText } = render(<BoxList />)

    expect(queryByText('X')).not.toBeInTheDocument();

    const colorInput = getByLabelText('Color:');
    const heightInput = getByLabelText('Height:');
    const widthInput = getByLabelText('Width:');
    const submitButton = queryByText('Add Box')
    
    fireEvent.change(colorInput, {target: {value: 'red'}});
    fireEvent.change(heightInput, {target: {value: '200'}});
    fireEvent.change(widthInput, {target: {value: '200'}});
    fireEvent.click(submitButton);

    expect(queryByText('X')).toBeInTheDocument();
})

it("removes box when remove box button is fired", () => {
    const { getByLabelText, queryByText } = render(<BoxList />)

    const colorInput = getByLabelText('Color:');
    const heightInput = getByLabelText('Height:');
    const widthInput = getByLabelText('Width:');
    const submitButton = queryByText('Add Box')
    
    fireEvent.change(colorInput, {target: {value: 'red'}});
    fireEvent.change(heightInput, {target: {value: '200'}});
    fireEvent.change(widthInput, {target: {value: '200'}});
    fireEvent.click(submitButton);

    expect(queryByText('X')).toBeInTheDocument();

    const removeBoxButton = queryByText('X');
    fireEvent.click(removeBoxButton);

    expect(queryByText('X')).not.toBeInTheDocument();
})