import React from 'react';
import './style/profileScreen.css';
import BackIcon from '../assets/back-btn.png'
import ProfileIcon from '../../home-screen/assets/pro.png'
import LogOutIcon from '../assets/logout-removebg-preview.png'
import {useNavigate} from "react-router-dom";
import GameInLogo from '../../../common-assets/gamein-logo.png'
const ProfileScreen = () => {
    let navigate = useNavigate();
    const ButtonEvent = () => {
        window.history.back();
    }
    const LogOut = () => {
        if(window.confirm('Are you sure, want to log out?') === true){
            localStorage.clear();
            navigate('/');
            window.location.reload();
        }
        else {
            return;
        }
    }
    const userData = JSON.parse(localStorage.getItem('userDetails'));
    return (
        <>
            <div className="main-container">
                <div className="toolbar-container">
                <div className="toolbar">
                    <div className="back-button-container">
                    <div className="tool-bar-button" onClick={ButtonEvent}>
                        <img src={BackIcon} height="25" width="25"/>
                    </div>
                    </div>
                    <div className="logout-container" onClick={LogOut}>
                    <div className="tool-bar-button">
                        <img src={LogOutIcon} height="50" width="50"/>
                    </div>
                    </div>
                </div>
                </div>
                <div className="banner-img-container">
                </div>
                <div className="profile-img-container">
                    <img src={ProfileIcon} height="40" width="40"/>
                </div>
                <div className="profile-details">
                    <div className="name-container">
                        {userData.name}
                        <div className="gamer-container">
                            Pubg Player
                        </div>
                        <div className="ui-divider">

                        </div>
                        <div className="personal-details">
                            <div className="phone-number">
                                <div className="phone">
                                    Phone Number :
                                </div>
                                <div className="number">
                                    {userData.id}
                                </div>
                            </div>
                            <div className="phone-number">
                                <div className="phone">
                                   Gender:
                                </div>
                                <div className="number">
                                    {userData.gender}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-placeholder-container">
                    <img src={GameInLogo} height="200" width="200"/>
                </div>
            </div>
        </>
    );
}
export default ProfileScreen;