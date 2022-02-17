import React from "react";
import { Link, useParams } from "react-router-dom";

const Color = ({colors}) => {

    const {name} = useParams();
    const color = colors.filter(color => color.name === name)[0]

    return (
        <div>
            <h1 style={{backgroundColor: color.value}}>{color.name}</h1>
            <Link to='/colors'>Go Back</Link>
        </div>
    )

}

export default Color;