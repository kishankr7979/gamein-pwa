import React,{useState} from 'react'
import './styles/loginPage.css';
import AvatarIcon from '../assets/avatar-icon.png'
import NextIcon from '../assets/next-icon.png'
import ButtonComponent from '../../../util/lib/Components/buttonComponents';
const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const  ButtonEvent = () => {
        if(phoneNumber === '') {alert('Please Enter phone number'); return; }
        else if(phoneNumber.length < 10){alert('Please enter valid phone number'); return; }
        alert(`OTP sent to +91${phoneNumber}`);
    }
    return (
        <div className="parent-container">
            <div className="login-box-container">
                <div className="img-container">
                    <img src={AvatarIcon} alt="avatar" height="49" width="49" />
                </div>
                <div className="phone-container">               
                    <input type="number" placeholder="Mobile Number" className="phone-number-container" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                 </div>
                 <ButtonComponent buttonImage={NextIcon} buttonAction={ButtonEvent} buttonBackgroungColor='red' />
            </div>
        </div>
    )
}

export default LoginPage;
