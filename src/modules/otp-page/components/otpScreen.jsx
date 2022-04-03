import React, {useEffect, useState} from 'react'
import OtpInput from 'react-otp-input';
import './style/otpScreen.css';
import {useNavigate} from 'react-router-dom';
const OtpScreen = () => {
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
        if(otp === '1234'){
            navigate('/onboarding');
        }
        if(otp.length === 4 && otp !== '1234'){
            setInvalidOtp(true);
            return;
        }
    },[otp])
    return (
        <div className="inside-parent">
            <div className="parent-div">
                <div className="input-main-container">
                    <OtpInput
                        value={otp}
                        onChange={handleOtpChange}
                        numInputs={4}
                        separator={<span> - </span>}
                        inputStyle={{
                            height: '74px',
                            width: '64px',
                            background: '#FFFFFF',
                            border: '2px solid #000000',
                            boxSizing: 'border-box',
                            borderRadius: '10px',
                            fontSize: '22px',
                            color: '#545454'
                        }}
                        isInputNum
                    />
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '4em'}}>
            <div className="invalid-otp">
                {invalidOtp && (
                    <span>Incorrect OTP :(</span>
                )}
            </div>
            <div className="resend">
                {resendVisibility && (
                    <>
                    Didn’t received OTP? <span id="resend-wording" onClick={resendOtp}>Resend</span>
                    </>
                )}
            </div>
            </div>
        </div>
    )
}

export default OtpScreen;