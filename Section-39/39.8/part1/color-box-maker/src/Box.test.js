import React from "react";
import { render } from "@testing-library/react";
import Box from "./Box";

it("renders without crashing", () => {
    render(<Box color={'red'} width={100} height={100}/>)
})

it("matches snapshot", () => {
    const { asFragment } = render(<Box color={'red'} width={100} height={100}/>);
    expect(asFragment()).toMatchSnapshot();
})