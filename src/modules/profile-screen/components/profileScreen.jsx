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
import styled from 'styled-components';
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
        <MainContainer>
            <ToolbarContainer>
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
            </ToolbarContainer>
            {loading ? (<div><Rings ariaLabel="loading-indicator" color='#2196F3' width='200px' height='200px' /></div>) : (
                <>
                    <ProfileContainer>
                        <CoverImage></CoverImage>
                        <AvatarContainer>
                            <img src={ProfileIcon} height="40" width="40" />
                        </AvatarContainer>
                    </ProfileContainer>
                    <DetailsContainer>
                        <span className="name">{userData?.[0]?.name}</span>
                        <span className="placeholder">GameIN User</span>
                        <UiDivider />
                        <Details>
                            <span className="phone-title">Phone Number</span>
                            <span className="phone-value">{userData?.[0]?.phone}</span>
                        </Details>
                        <Details>
                            <span className="phone-title">Gender</span>
                            <span className="phone-value">{userData?.[0]?.gender}</span>
                        </Details>
                    </DetailsContainer>
                    <GameInText>
                        <span className="phone-value">GameIN App</span>
                        <span className="phone-title">version 0.1.0 BETA</span>
                    </GameInText>
                </>
            )}
        </MainContainer>
    );
}
export default ProfileScreen;

const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgb(44,62,80);
    background: linear-gradient(90deg, rgba(44,62,80,1) 0%, rgba(0,0,0,1) 66%);
    display: flex;
    flex-direction: column;
    gap: 12px;

`;

const ToolbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    width: 100%;
    max-width: 720px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background: rgb(93,133,235);
    background: linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
`;
const ProfileContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
`;
const CoverImage = styled.div`
    height: 79px;
    background: #F4F3F3;
    border-radius: 10px;
    width: 90%;
    background: rgb(93,133,235);
    background: linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
`;

const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background: #272d3d;
    border: 5px solid rgb(93,133,235);
    box-sizing: border-box;
    border-radius: 50%;
    position: absolute;
    top: 1em;
`;

const DetailsContainer = styled.div`
    margin: 52px 12px 0 12px;
    padding: 12px 0 12px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 6px;
    background: #272d3d;
    border-radius: 12px;
    .name {
        font-size: 30px;
        font-family: 'Dot Matrix', sans-serif;
        color: rgb(93,133,235);
    }
    .placeholder {
        font-size: 18px;
        font-family: 'Dot Matrix', sans-serif;
        color: #FFFFFF;
    }
`;

const UiDivider = styled.div`
    height: 0px;
    border: 1px solid rgb(93,133,235);
    width: 100%;
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .phone-title {
        font-size: 20px;
        font-family: 'Dot Matrix', sans-serif;
        color: #FFFFFF;
        margin-left: 12px;
    }
    .phone-value {
        font-size: 25px;
        font-family: 'Dot Matrix', sans-serif;
        color: rgb(93,133,235);
        font-weight: bold;
        margin-right: 12px;
    }
`;

const GameInText = styled.div`
    position: absolute;
    bottom: 10px;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .phone-title {
        font-size: 20px;
        font-family: 'Dot Matrix', sans-serif;
        color: #FFFFFF;
    }
    .phone-value {
        font-size: 25px;
        font-family: 'Dot Matrix', sans-serif;
        color: rgb(93,133,235);
        font-weight: bold;
    }
`;