import React, { useState, useEffect } from 'react';
import HiGamerIcon from '../assets/Group.png'
import ButtonComponent from "../../../util/lib/Components/buttonComponents";
import NextIcon from "../../login-page/assets/next-icon.png";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../../config/supabase';
import styled from 'styled-components';
import { GiHand } from 'react-icons/gi';
import { GiSkeletalHand } from 'react-icons/gi';
import { MdNavigateNext } from 'react-icons/md';
const ModalBox = (props) => {
    const genderList = ['Male', 'Female', 'Others'];
    return (
        <GenderContainer>
            {genderList.map((item, index) => {
                return (
                    <div key={index}>
                        <Gender onClick={() => props.onClick(item)}>{item}</Gender>
                    </div>
                )
            })}
        </GenderContainer>
    );
}
const WelcomeScreen = () => {
    let navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: '',
        gender: '',
        id: JSON.parse(localStorage.getItem('token'))?.user?.uid,
        phone: JSON.parse(localStorage.getItem('token'))?.user?.phoneNumber
    })
    const [visible, setVisible] = useState(false);
    const genderModal = () => {
        setVisible(true);
    }
    const selectGender = (e) => {
        setVisible(!visible);
        setUserDetails({ ...userDetails, gender: e });
    }
    const ButtonEvent = async () => {
        if (userDetails.name !== '' && userDetails.gender !== '') {
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            const { data, error } = await supabase
                .from('user-db')
                .insert([userDetails])
            if (data) {
                console.log('data sent');
                navigate('/home')
            }
        }
        else {
            alert('Please fill these details');
        }
    }
    var i = 0;
    var txt = 'Apocalypse Starts now ';
    var speed = 100;

    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("demo").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    useEffect(() => {
        typeWriter();
    }, [])
    return (
        <ParentContainer>
            <TopContainer>
                <TopContainerWording>
                    Hi, Gamer <GiHand />
                </TopContainerWording>
            </TopContainer>
            <MiddleContainer><span id="demo"><GiSkeletalHand /></span></MiddleContainer>
            <FormContainer>
                <Heading>
                    Let us know you better!!
               </Heading>
                <Name type="text" placeholder="Name" value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} />
                <Name type="text" placeholder="Gender" value={userDetails.gender}
                    onClick={genderModal} onChange={genderModal} />
                {visible && (
                    <ModalBox onClick={(e) => selectGender(e)} />
                )}

                <NextButton onClick={ButtonEvent}><MdNavigateNext color='rgb(93,133,235)' size={50} /></NextButton>
            </FormContainer>
            {/* <div className="content-main-container">
                <br/>
                <div className="second-container">
                    <div className="heading-wording">
                        Let us know you better!!
                    </div>
                    <div className="phone-container">
                        <input placeholder="Name" className="phone-number-container"
                               value={userDetails.name}
                               onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}></input>
                        <input placeholder="Gender" className="phone-number-container"
                               value={userDetails.gender}
                               onClick={genderModal} onChange={genderModal}></input>
                        {visible && (
                            <ModalBox closeModal={closeModal}/>
                        )}
                    </div>
                    <ButtonComponent buttonImage={NextIcon} buttonAction={ButtonEvent}/>
                </div>
            </div> */}
        </ParentContainer>
    );
}
export default WelcomeScreen;

const ParentContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgb(44,62,80);
    background: linear-gradient(90deg, rgba(44,62,80,1) 0%, rgba(0,0,0,1) 66%);
    position: relative;
`;

const TopContainer = styled.div`
    height: 20vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(93,133,235);
    background: linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    box-shadow: 5px 7px;
`;

const TopContainerWording = styled.span`
    font-family: 'Dot Matrix', sans-serif;
    font-size: 50px;
    color: rgb(93,133,235);
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    justify-content: flex-start;
    padding-top: 12px;
    position: absolute;
    bottom: 0;
    height: 50vh;
    width: 100%;
    background: rgb(93,133,235);
    background: linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`;

const Heading = styled.span`
     font-family: 'Dot Matrix', sans-serif;
    font-size: 40px;
    color: rgb(93,133,235);

`;
const Name = styled.input`
    margin: 0 20px 0 20px;
    text-align: center;
    height: 60px;
    width: 90%;
    background: #272d3d;
    border: 2px solid linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 30px;
    color: rgb(93,133,235);
    font-family: 'Dot Matrix', sans-serif;
    box-shadow: 2px 3px;
    :focus {
        outline: none !important;
    }
`;

const GenderContainer = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    justify-content: center;
    background: rgb(44,62,80);
    background: linear-gradient(90deg, rgba(44,62,80,1) 0%, rgba(0,0,0,1) 66%);

`;

const Gender = styled.div`
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #272d3d;
    color: rgb(93,133,235); 
`;

const MiddleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 35%;
    width: 100%;
    span {
    font-size: 30px;
    color: rgb(93,133,235);
    font-family: 'Dot Matrix', sans-serif;
    }
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
    bottom: 10%;
`;