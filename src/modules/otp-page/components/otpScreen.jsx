import React, {useState} from 'react'
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
    setTimeout(() => {
        setResendVisibility(true);
    }, 5000)
    if(otp === '1234'){
        navigate('/onboarding');
    }
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
            <div className="resend">
                {resendVisibility && (
                    <>
                    Didn’t received OTP? <span id="resend-wording" onClick={resendOtp}>Resend</span>
                    </>
                )}
            </div>
        </div>
    )
}

export default OtpScreen;