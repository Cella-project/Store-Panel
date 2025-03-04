import React from "react";
import offlineImage from "../../assets/images/offline_status_icon.svg";
import "./OfflinePage.scss";

const OfflinePage = () => {
    return (
        <div className="offline-page">
            <img src={offlineImage} alt="Offline" className="offline-page--image" />
            <h1 className="offline-page--title">Oops! You're Offline</h1>
            <p className="offline-page--description">
                It seems that your internet connection is lost. Please check your
                network settings and try again.
            </p>
        </div>
    );
};

export default OfflinePage;
