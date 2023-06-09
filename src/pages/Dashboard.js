import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../components/global/NavBar";
import SideBar from "../components/global/SideBar";
import MobMenu from '../components/global/MobMenu';
import Tools from "../components/global/ToolBox";
import ScrollButton from "../components/global/ScrollButton";
import { useSelector } from "react-redux";

import './Dashboard.scss';

const Dashboard = () => {
    const [mobMenuShown, setMobMenuShown] = useState(false);
    const mode = useSelector(state => state.theme.mode);

    return (
        <div className={`dashboard`}>
            <div className={`dashboard--bg${mode === 'dark-mode' ? '--dark' : '--light' }`}></div>
            <NavBar menuToggle={setMobMenuShown} />
            <SideBar />
            {mobMenuShown && <MobMenu menuToggle={setMobMenuShown} />}
            <Tools />
            <ScrollButton />
            <div className="dashboard--view" id="dashboard-view">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;