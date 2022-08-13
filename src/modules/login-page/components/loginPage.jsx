import React, { useState, useEffect } from 'react'
import './styles/loginPage.css';
import AvatarIcon from '../assets/avatar-icon.png'
import NextIcon from '../assets/next-icon.png'
import ButtonComponent from '../../../util/lib/Components/buttonComponents';
import GameInIcon from '../assets/gamein-logo.png'
import { useNavigate } from 'react-router-dom';
import { Firebase, auth, firebase } from '../../../config/firebase';
import OtpComponent from '../../otp-page/components/otpScreen';
import { Rings } from 'react-loader-spinner';
import { MdNavigateNext } from 'react-icons/md';
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
    var i = 0;
    var txt = 'GameIN';
    var speed = 100;

    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("demo").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    useEffect(() => {
        step === 1 && typeWriter();
    }, [])
    return (
        <>
            {step === 1 ? (<div className="parent1-container">
                <div id="recaptcha-container"></div>
                {!loading ? (<> <div className="login-box-main-container">
                    <input type="number" placeholder="Mobile Number" className="phone-number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                </div>
                    <div className="next-btn" onClick={ButtonEvent}><MdNavigateNext color='rgb(93,133,235)' size={50} /></div>
                    <div class="typewriter">
                        <p id="demo"></p>
                    </div>
                </>) : (<><Rings ariaLabel="loading-indicator" color='#2196F3' width='200px' height='200px' /></>)}

            </div>) : (<OtpComponent final={final} />)}
        </>
    )
}

export default LoginPage;
