import React, { useState } from 'react'

import './style/otpScreen.css';
const OtpScreen = () => {
    const [otp, setOtp] = useState({
        firstValue: '',
        secondValue: '',
        thirdValue: '',
        fourthValue: ''
    });
    console.log(otp);
    return (
        <div className="parent-div">
            <div className="input-main-container">
                <div >
                    <input type="number" value={otp.firstValue} onChange={(e) => setOtp({ ...otp, firstValue: e.target.value })} id="input-container"/>
                </div>
                <div >
                    <input type="number" value={otp.secondValue} onChange={(e) => setOtp({ ...otp, secondValue: e.target.value  })} id="input-container"/>
                </div>
                <div >
                    <input type="number" value={otp.thirdValue} onChange={(e) => setOtp({ ...otp, thirdValue: e.target.value  })} id="input-container"/>
                </div>
                <div>
                    <input type="number" value={otp.fourthValue} onChange={(e) => setOtp({ ...otp, fourthValue: e.target.value  })} id="input-container"/>
                </div>
            </div>
        </div>
    )
}

export default OtpScreen;
