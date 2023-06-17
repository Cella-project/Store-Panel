import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import './ScrollButton.scss';

const ScrollButton = () => {
    const mode = useSelector(state => state.theme.mode);
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div className='scroll-button'>
            <FaArrowCircleUp onClick={scrollToTop}
                style={{
                    display: visible ? 'inline' : 'none',
                    color: `${mode === 'dark-mode' ? '#163a4a' : '#ff8800'}`
                }}
            />
        </div>
    );
}

export default ScrollButton;



