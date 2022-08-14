import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import './style/otpScreen.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const OtpScreen = (props) => {
    const [otp, setOtp] = useState('');
    let navigate = useNavigate();
    const handleOtpChange = (data) => {
        setOtp(data);
    }
    const resendOtp = () => {
        alert('OTP Resent Successfully');
    }
    const [resendVisibility, setResendVisibility] = useState(false);
    const [invalidOtp, setInvalidOtp] = useState(false);
    setTimeout(() => {
        setResendVisibility(true);
    }, 5000)
    useEffect(() => {
        if (otp.length === 6) {
            setInvalidOtp(false)
            props.final.confirm(otp).then((res) => {
                console.log(res);
                localStorage.setItem('token', JSON.stringify(res));
                if (res?.additionalUserInfo?.isNewUser) {
                    navigate('/onboarding');
                    window.location.reload();
                }
                else {
                    navigate('/home');
                    window.location.reload();
                }
            }).catch((error) => {
                setInvalidOtp(true);
                return;
            })
        }
    }, [otp])
    return (
        <OtpParentContainer>
            <OtpContainer>
                <Otp type="number" placeholder="OTP" className="otp" value={otp} onChange={(e) => handleOtpChange(e.target.value)} />
            </OtpContainer>
            {invalidOtp && <InvalidOtp>Invalid OTP :(</InvalidOtp>}
        </OtpParentContainer>
    )
}

export default OtpScreen;

const OtpParentContainer = styled.div`
     display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    height: 100vh;
    width: 100vw;
    background: rgb(44,62,80);
    background: linear-gradient(90deg, rgba(44,62,80,1) 0%, rgba(0,0,0,1) 66%);

`;

const OtpContainer = styled.div`
     width: 100%;
`;

const Otp = styled.input`
     height: 60px;
    font-size: 25px;
    text-align: center;
    background: #272d3d;
    font-family: 'Dot Matrix', sans-serif;
    border: 2px solid rgb(93,133,235);
    color: rgb(93,133,235);
    border-radius: 10px;
    box-shadow: 5px 7px;

    :focus {
        outline: none !important;
    }

`;
const InvalidOtp = styled.span`
     font-family: 'Dot Matrix', sans-serif;
     font-size: 25px;
    text-align: center;
    color: red;
`;