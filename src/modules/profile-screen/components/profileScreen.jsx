import React from 'react';

import './style/profileScreen.css';
import ButtonComponent from "../../../util/lib/Components/buttonComponents";
import NextIcon from "../../login-page/assets/next-icon.png";
const ProfileScreen = () => {
    const ButtonEvent = () => {
        window.history.back();
    }
    const userData = JSON.parse(localStorage.getItem('userDetails'));
    return (
        <>
            <div className="parent-div">
                hi
                {/*<div className="toolbar">*/}
                {/*    <ButtonComponent buttonImage={NextIcon} buttonAction={ButtonEvent} />*/}
                {/*</div>*/}
                {/*<div className="profile-details">*/}
                {/*    Welcome {userData.name}*/}
                {/*</div>*/}
            </div>
        </>
    );
}
export default ProfileScreen;