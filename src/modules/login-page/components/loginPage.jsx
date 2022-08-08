import React, { useState } from 'react'
import './styles/loginPage.css';
import AvatarIcon from '../assets/avatar-icon.png'
import NextIcon from '../assets/next-icon.png'
import ButtonComponent from '../../../util/lib/Components/buttonComponents';
import GameInIcon from '../assets/gamein-logo.png'
import { useNavigate } from 'react-router-dom';
import { Firebase, auth, firebase } from '../../../config/firebase';
import OtpComponent from '../../otp-page/components/otpScreen';
import { Rings } from 'react-loader-spinner';
const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [final, setFinal] = useState('');
    const ButtonEvent = () => {
        if (phoneNumber === '') { alert('Please Enter phone number'); return; }
        else if (phoneNumber.length < 10 && phoneNumber.length > 10) { alert('Please enter valid phone number'); return; }
        setLoading(true)
        //let verify  = new Firebase.auth.RecaptchaVerifier('recaptcha-container');
        auth.signInWithPhoneNumber(`+91${phoneNumber}`, window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container", {
            size: "invisible"
        }
        )).then((res) => {
            setLoading(false);
            setFinal(res);
            setStep(2);
        }).catch((err) => console.error(err));

    }

    return (
        <>
            {step === 1 ? (<div className="parent-container">
                <div id="recaptcha-container"></div>
                {!loading ? (<> <div className="login-box-main-container">
                    <div className="gamein-logo-container">
                        <img src={GameInIcon} alt="gamein-logo" height="103" width="156" />
                        <div className="gamein-wording-container">
                            <span className="game-wording">Game<span className="in-wording">IN</span></span>
                        </div>
                    </div>
                    <div className="login-box-container">
                        <div className="img-container">
                            <img src={AvatarIcon} alt="avatar" height="49" width="49" />
                        </div>
                        <div className="phone-container">
                            <input type="number" placeholder="Mobile Number" className="phone-number-container" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                        </div>
                        <ButtonComponent buttonImage={NextIcon} buttonAction={ButtonEvent} buttonBackgroungColor='red' />
                    </div>
                </div></>) : (<><Rings ariaLabel="loading-indicator" color='#2196F3' width='200px' height='200px' /></>)}

            </div>) : (<OtpComponent final={final} />)}
        </>
    )
}

export default LoginPage;
