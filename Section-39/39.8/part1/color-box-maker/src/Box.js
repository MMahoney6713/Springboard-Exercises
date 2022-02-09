import React from 'react';

const Box = ({color, width, height}) => {
    const divStyle = {
        backgroundColor: color,
        width: width,
        height: height
    }
    return (
        <div style={divStyle}></div>
    )
}

export default Box;