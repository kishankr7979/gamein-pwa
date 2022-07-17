import React, {useState, useEffect} from 'react';
import './style/welcomeScreen.css'
import HiGamerIcon from '../assets/Group.png'
import ButtonComponent from "../../../util/lib/Components/buttonComponents";
import NextIcon from "../../login-page/assets/next-icon.png";
import {useNavigate} from "react-router-dom";
import {supabase} from '../../../config/supabase';
const ModalBox = (props) => {
    const [gender, setGender] = useState('');
    const genderList = ['Male', 'Female', 'Others'];
    const genderSet = (selected) => {
        setGender(selected)
        localStorage.setItem('gender', selected);
        props.closeModal()
    }
    return (
        <>
            <div className="gender-main-container">
                <div className="gender-container">
                    {genderList.map((item) => {
                        return (
                            <>
                                <button onClick={() => genderSet(item)}>{item}</button>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
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
        setUserDetails({...userDetails, gender: localStorage.getItem('gender')});
    }
    const closeModal = () => {
        setVisible(false);
    }
    const ButtonEvent = async () => {
        if(userDetails.name !== '' && userDetails.gender !== ''){
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            const { data, error } = await supabase
            .from('user-db')
            .insert([userDetails])
            if(data){
                console.log('data sent');
            }
        }
        else{
            alert('Please fill these details');
        }
    }
    return (
        <div className="parent-container">
            <div className="content-main-container">
                <div className="top-container">
                    <div className="top-container-wording">
                        Hi, Gamer <img src={HiGamerIcon} height="40" width="40"/>
                    </div>
                </div>
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
            </div>
        </div>
    );
}
export default WelcomeScreen;
