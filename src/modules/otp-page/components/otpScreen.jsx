import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import './style/otpScreen.css';
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
        <div className="otp-parent-container">
            <div className="otp-container">
                <input type="number" placeholder="OTP" className="otp" value={otp} onChange={(e) => handleOtpChange(e.target.value)}></input>
            </div>
        </div>
        // <div className="parent">
        //     <div className="otp-con">
        //         <input type="number" placeholder="Mobile Number" className="phone-number" value={otp} onChange={(e) => handleOtpChange(e.target.value)}></input>
        //         {/* <OtpInput
        //             value={otp}
        //             onChange={handleOtpChange}
        //             numInputs={6}
        //             inputStyle={{
        //                 height: '74px',
        //                 width: '64px',
        //                 background: '#272d3d',
        //                 border: '2px solid #000000',
        //                 boxSizing: 'border-box',
        //                 borderRadius: '10px',
        //                 fontSize: '22px',
        //                 color: '#545454'
        //             }}
        //             isInputNum
        //         /> */}
        //     </div>
        // </div>
    )
}

export default OtpScreen;