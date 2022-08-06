import React, { useState, useEffect } from 'react';
import './style/profileScreen.css';
import BackIcon from '../assets/back-btn.png'
import ProfileIcon from '../../home-screen/assets/pro.png'
import LogOutIcon from '../assets/logout-removebg-preview.png'
import { useNavigate, useParams } from "react-router-dom";
import GameInLogo from '../../../common-assets/gamein-logo.png'
import { supabase } from '../../../config/supabase';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Rings } from 'react-loader-spinner';
const ProfileScreen = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const { data, error } = await supabase
            .from('user-db')
            .select('*')
            .match({ id: id })
        if (data) {
            setUserData({ ...data, name: data?.[0]?.name, gender: data?.[0]?.gender });
        }
        setLoading(false);
    }
    const sendUserData = async () => {
        const { data, error } = await supabase
            .from('user-db')
            .insert([{
                name: userData?.name, gender: userData?.gender, id: JSON.parse(localStorage.getItem('token'))?.user?.uid,
                phone: JSON.parse(localStorage.getItem('token'))?.user?.phoneNumber
            }])
        if (data) {
            console.log('data sent');
            setModal(false);
            await getUserData();
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
                {loading ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><Rings ariaLabel="loading-indicator" color='#2196F3' width='200px' height='200px' /></div>) : (
                    <>
                        <div className="profile-img-container">
                            <img src={ProfileIcon} height="40" width="40" />
                        </div>
                        <div className="profile-details">
                            {userData?.length == 0 && userData.length === undefined && <button onClick={() => setModal(!modal)}>{modal ? 'Close' : 'Add'}</button>}
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
                    </>
                )}
                <div className="bottom-placeholder-container">
                    <img src={GameInLogo} height="200" width="200" />
                </div>
            </div>
        </>
    );
}
export default ProfileScreen;