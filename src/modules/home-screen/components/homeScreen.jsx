import React, {useState, useEffect} from 'react';
import './styles/homeScreen.css'
import LogoutImage from '../assets/logout-img.jpeg'
import ButtonComponent from "../../../util/lib/Components/buttonComponents";
import {useNavigate} from "react-router-dom";
const HomeScreen = () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    console.log(userDetails);
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('userDetails');
        navigate('/');
        setTimeout(() => {
            window.location.reload();
        },500);
    }
    return(
        <>
            <div className="parent-container">
                <div className="logout-button">
                   <ButtonComponent buttonImage={LogoutImage} buttonAction={logout} />
                </div>
                <div className="dummy-container">
                    Welcome {userDetails.name} :)
                    <div>
                        You've been waitlisted
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeScreen;