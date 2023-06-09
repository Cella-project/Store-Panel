import React, { useEffect, useRef } from 'react';

const Canvas = ({ name, width, height, fontSize, borderRadius = '15px' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set the canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Set text align and baseline to center
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // Set the font size and color
        context.font = `${fontSize} sans`;
        context.fillStyle = '#ffffff';

        // Draw the characters onto the canvas
        context.fillText(name.charAt(0).toUpperCase(), canvas.width / 2+1, canvas.height / 2+2);
    });

    return (
        <canvas ref={canvasRef} style={{ borderRadius: borderRadius }} className='orange-bg' />
    )
}

export default Canvas