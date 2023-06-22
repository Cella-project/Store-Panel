import React from "react";
import { useSelector } from "react-redux";

import style from './Spinner.module.scss';

const Spinner = () => {
    const mode = useSelector((state) => state.theme.mode);

    return (
        <div className={style[`loading${mode === 'dark-mode' ? '--dark' : ''}`]}></div>
    );
};

export default Spinner;