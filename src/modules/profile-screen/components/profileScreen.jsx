import React, { useState, useEffect } from 'react';
import './style/profileScreen.css';
import BackIcon from '../assets/back-btn.png'
import ProfileIcon from '../../home-screen/assets/pro.png'
import LogOutIcon from '../assets/logout-removebg-preview.png'
import { useNavigate } from "react-router-dom";
import GameInLogo from '../../../common-assets/gamein-logo.png'
import { supabase } from '../../../config/supabase';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
const ProfileScreen = () => {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        gender: '',
        id: JSON.parse(localStorage.getItem('token'))?.user?.uid,
        phone: JSON.parse(localStorage.getItem('token'))?.user?.phoneNumber
    })
    const [modal, setModal] = useState(false);
    const ButtonEvent = () => {
        window.history.back();
    }
    const LogOut = () => {
        if (window.confirm('Are you sure, want to log out?') === true) {
            localStorage.clear();
            navigate('/');
            window.location.reload();
        }
        else {
            return;
        }
    }
    const getUserData = async () => {
        const { data, error } = await supabase
            .from('user-db')
            .select('*')
            .match({ id: JSON.parse(localStorage.getItem('token'))?.user?.uid })
        if (data) {
            setUserData({...data, name: data?.[0]?.name, gender: data?.[0]?.gender});
        }
        console.log(data);
    }
    const sendUserData = async () => {
        console.log(userData);
        const { data, error } = await supabase
        .from('user-db')
        .insert([{name: userData?.name, gender: userData?.gender, id: JSON.parse(localStorage.getItem('token'))?.user?.uid,
        phone: JSON.parse(localStorage.getItem('token'))?.user?.phoneNumber}])
        if(data){
            console.log('data sent');
            setModal(false);
        }
    }
    useEffect(() => {
        (async () => await getUserData())();
    }, [])
    return (
        <>
            <div className="main-container">
                <div className="toolbar-container">
                    <div className="toolbar">
                        <div className="back-button-container">
                            <div className="tool-bar-button" onClick={ButtonEvent}>
                                <img src={BackIcon} height="25" width="25" />
                            </div>
                        </div>
                        <div className="logout-container" onClick={LogOut}>
                            <div className="tool-bar-button">
                                <img src={LogOutIcon} height="50" width="50" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="banner-img-container">
                </div>

                <div className="profile-img-container">
                    <img src={ProfileIcon} height="40" width="40" />
                </div>
                <div className="profile-details">
                {userData?.[0]?.name.length <= 1 &&   <button onClick={() => setModal(!modal)}>{modal ? 'Add' : 'close'}</button>}
                    <div className="name-container">
                        {userData?.[0]?.name}
                        <div className="gamer-container">
                            Pubg Player
                        </div>
                        {modal ? (
                            <>
                                <input placeholder="name" value={userData?.[0]?.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                                <input placeholder="gender" value={userData?.[0]?.gender} onChange={(e) => setUserData({ ...userData, gender: e.target.value })} />
                                <Button variant="contained" endIcon={<SendIcon />} onClick={sendUserData}>
                                    Send
                                </Button>
                            </>
                        ) : (
                                <>
                                    <div className="ui-divider">
                                    </div>
                                    <div className="personal-details">
                                        <div className="phone-number">
                                            <div className="phone">
                                                Phone Number :
                                </div>
                                            <div className="number">
                                                {userData?.[0]?.phone}
                                            </div>
                                        </div>
                                        <div className="phone-number">
                                            <div className="phone">
                                                Gender:
                                </div>
                                            <div className="number">
                                                {userData?.[0]?.gender}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                    </div>
                </div>
                <div className="bottom-placeholder-container">
                    <img src={GameInLogo} height="200" width="200" />
                </div>
            </div>
        </>
    );
}
export default ProfileScreen;