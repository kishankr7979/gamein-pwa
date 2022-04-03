import React, {useState} from 'react';
import './style/welcomeScreen.css'
import HiGamerIcon from '../assets/Group.png'
import ButtonComponent from "../../../util/lib/Components/buttonComponents";
import NextIcon from "../../login-page/assets/next-icon.png";


const ModalBox = (props) => {
    const [gender, setGender] = useState('');
    const genderList = ['Male', 'Female', 'Others'];
    const genderSet = (selected) => {
        setGender(selected)
        props.closeModal()
        localStorage.setItem('gender', selected);
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
    const [userDetails, setUserDetails] = useState({
        name: '',
        gender: '',
    })
    const [visible, setVisible] = useState(false);
    const genderModal = () => {
        setVisible(true);
        setUserDetails({...userDetails, gender: localStorage.getItem('gender')});
    }
    const closeModal = () => {
        setVisible(false);
    }
    const ButtonEvent = () => {
        if(userDetails.name !== '' && userDetails.gender !== ''){
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
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
