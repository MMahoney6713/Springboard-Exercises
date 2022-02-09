import React from "react";
import { render } from "@testing-library/react";
import NewBoxForm from './NewBoxForm'

const addBox = () => {
    return null;
}

it("renders without crashing", () => {
    render(<NewBoxForm addBox={addBox} />)
})

it("matches snapshot", () => {
    const { asFragment } = render(<NewBoxForm addBox={addBox} />);
    expect(asFragment()).toMatchSnapshot();
})