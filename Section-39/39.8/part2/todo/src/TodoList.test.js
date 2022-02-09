import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from './TodoList';

it("renders without crashing", () => {
    render(<TodoList />)
})

it("matches snapshot", () => {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
})

it("adds a todo when form is submitted", () => {
    const { getByLabelText, queryByText } = render(<TodoList />)

    expect(queryByText('Submit to github')).not.toBeInTheDocument();

    const textInput = getByLabelText('Todo Text:');
    const submitButton = queryByText('Add Todo')
    
    fireEvent.change(textInput, {target: {value: 'Submit to github'}});
    fireEvent.click(submitButton);

    expect(queryByText('Submit to github')).toBeInTheDocument();
})

it("removes todo when remove todo button is fired", () => {
    const { getByLabelText, queryByText } = render(<TodoList />)

    const textInput = getByLabelText('Todo Text:');
    const submitButton = queryByText('Add Todo')
    
    fireEvent.change(textInput, {target: {value: 'Submit to github'}});
    fireEvent.click(submitButton);

    expect(queryByText('Submit to github')).toBeInTheDocument();

    const removeTodoButton = queryByText('X');
    fireEvent.click(removeTodoButton);

    expect(queryByText('Submit to github')).not.toBeInTheDocument();
})