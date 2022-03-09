import React,{useState} from 'react'
import './styles/loginPage.css';
import AvatarIcon from '../assets/avatar-icon.png'
import NextIcon from '../assets/next-icon.png'
const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const  ButtonEvent = () => {
        alert(`OTP sent to ${phoneNumber}`);
    }
    return (
        <div className="parent-container">
            <div className="login-box-container">
                <div className="img-container">
                    <img src={AvatarIcon} alt="avatar" height="49" width="49" />
                </div>
                <div>               
                 <input type="number" placeholder="Mobile Number" className="phone-number-container" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                 </div>
                <div className="next-button-container">
                <button type="button" className="submit-btn"><img src={NextIcon} alt="Next" height="30" width="30" onClick={ButtonEvent}/></button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
