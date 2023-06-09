import React, { useState, useEffect } from 'react';

import style from './Timer.module.scss';

const secondsToDigitalClock = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    
    const padZero = (num) => {
        return (num < 10 ? '0' : '') + num;
    }

    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

const Timer = ({ className, sec }) => {
    const [clock, setClock] = useState(secondsToDigitalClock(sec));
    
    useEffect(() => {
        setInterval(() => {
            if (sec === 0) {
                return;
            }
            sec--;
            setClock(secondsToDigitalClock(sec));
        }, 1000);
    }, [setClock, sec]);

    return (
        <div className={`${style['timer']} ${className} white-bg shadow-2px radius-5px flex-row-center size-22px inter`}>
            <i className="bi bi-stopwatch margin-4px-H"></i>
            <span className='margin-4px-H'>{clock}</span>
        </div>
    );
};

export default Timer;