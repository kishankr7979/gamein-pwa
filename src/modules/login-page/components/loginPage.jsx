import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
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
        step === 1 && !loading && typeWriter();
    }, [])
    return (
        <div>
            {step === 1 ? (
                <ParentContainer>
                    <div id="recaptcha-container"></div>
                    {!loading ? (<><LoginBoxContainer>
                        <PhoneNumber type="number" placeholder="Mobile Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></PhoneNumber>
                    </LoginBoxContainer>
                        <NextButton onClick={ButtonEvent}><MdNavigateNext color='rgb(93,133,235)' size={50} /></NextButton>
                        <GameInText>
                            <GameIn id="demo"></GameIn>
                        </GameInText>
                    </>) : (<LoaderContainer ><Rings ariaLabel="loading-indicator" color='#2196F3' width='200px' height='200px' /></LoaderContainer>)}
                </ParentContainer>) : (<OtpComponent final={final} />)}
        </div>
    )
}

export default LoginPage;

const ParentContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgb(44,62,80);
    background: linear-gradient(90deg, rgba(44,62,80,1) 0%, rgba(0,0,0,1) 66%);
`;

const LoginBoxContainer = styled.div`
    height: 70vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(93,133,235);
    background: linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    box-shadow: 10px 10px 10px 10px;

`;

const NextButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 80px;
    background: #272d3d;
    border: 2px solid rgb(93,133,235);
    border-radius: 30%;
    position: absolute;
    right: 10%;
    margin-top: -10%;
`;

const PhoneNumber = styled.input`
    margin: 0 20px 0 20px;
    text-align: center;
    height: 60px;
    background: #272d3d;
    border: 2px solid linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 20px;
    color: rgb(93,133,235);
    font-size: 30px;
    font-family: 'Dot Matrix', sans-serif;
    box-shadow: 5px 7px;
    :focus {
        outline: none !important;
    }
`;

const GameInText = styled.div`
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

`;
const GameIn = styled.p`
    font-family: 'Dot Matrix', sans-serif;
    font-size: 50px;
    color: rgb(93,133,235);


`;

const LoaderContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
