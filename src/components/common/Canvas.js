import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Canvas = ({ name, width, height, fontSize, borderRadius = '15px' }) => {
    const canvasRef = useRef(null);
    const language = useSelector(state => state.language.language);

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
        if (language === 'ar')
            context.fillText(name.charAt(0).toUpperCase(), canvas.width / 2 - 2, canvas.height / 2 + 1);
        else
            context.fillText(name.charAt(0).toUpperCase(), canvas.width / 2 + 2, canvas.height / 2 + 1);
    });

    return (
        <canvas ref={canvasRef} style={{ borderRadius: borderRadius }} className='mint-green-bg' />
    )
}

export default Canvas