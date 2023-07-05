import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PushNotification from "../PushNotification";

import NavBar from "../components/global/NavBar";
import SideBar from "../components/global/SideBar";
import MobMenu from '../components/global/MobMenu';
import Tools from "../components/global/ToolBox";
import ScrollButton from "../components/global/ScrollButton";
import { useDispatch, useSelector } from "react-redux";
import VerifyEmail from "../components/verifyEmail/VerifyEmail";
import Popup from "../components/common/PopupForm";
import { authActions } from "../apis/actions";

import './Dashboard.scss';

const Dashboard = () => {
    const [mobMenuShown, setMobMenuShown] = useState(false);
    const [popupShown, setPopupShown] = useState(false);
    const mode = useSelector(state => state.theme.mode);
    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    const handleClick = () => {
        setPopupShown(true)
        document.getElementById('dashboard-view').style.zIndex = 60;
        const TopScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const LeftScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
        window.onscroll = () => {
            window.scrollTo(LeftScroll, TopScroll);
        };
        dispatch(authActions.verifyEmail(userData._id));
    }


    if (userData === null) return (<div></div>);

    return (
        <div className={`dashboard`} style={{ marginTop: userData.owner.validEmail ? '0px' : '15px' }}>
            <PushNotification />
            <div className={`dashboard--bg${mode === 'dark-mode' ? '--dark' : '--light'}`}></div>
            {!userData.owner.validEmail &&
                <VerifyEmail popupToggle={handleClick} />
            }
            <NavBar menuToggle={setMobMenuShown} />
            <SideBar />
            {mobMenuShown && <MobMenu menuToggle={setMobMenuShown} />}
            <Tools />
            <ScrollButton />
            <div className="dashboard--view" id="dashboard-view">
                {popupShown &&
                    <Popup popupToggle={setPopupShown} header={'Verify Email'} />
                }
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;