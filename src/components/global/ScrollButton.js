import React, { useState } from 'react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

import './ScrollButton.scss';

const ScrollButton = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
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
            <BsFillArrowUpCircleFill onClick={scrollToTop}
                style={{
                    display: visible ? 'inline' : 'none',
                    opacity: 0.7
                }}
                className='mint-green'
            />
        </div>
    );
}

export default ScrollButton;