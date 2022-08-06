import React, { useState, useEffect } from 'react'
import { FcNext } from 'react-icons/fc';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { GrSend } from 'react-icons/gr';
import {RiSendPlaneLine} from 'react-icons/ri';
import { supabase } from '../../../config/supabase';
import './styles/myFreinds.css';
const Card = (props) => {
    return (
        <div className="card-parent">
            <div className="avatar-name">
                <CgProfile size={40} />
                {props.name}
            </div>
            <div className="send-message">
                <RiSendPlaneLine size={20} color='#2196F3' />
            </div>
        </div>
    );
}
const MyFreinds = () => {
    const userId = JSON.parse(localStorage.getItem('token'))?.user?.uid
    const navigate = useNavigate();
    const [freinds, setFreinds] = useState();
    const getFreinds = async () => {
        let { data, error } = await supabase
            .from('freinds-db')
            .select('*')
            .match({ id: userId })
        if (data) {
            let d = data[0].freinds;
            let parsed = d.map((i) => JSON.parse(i));
            console.log(parsed);
            setFreinds(parsed);
        }
    }
    useEffect(() => {
        (async () => await getFreinds())();
    }, [])
    return (
        <div className="main-class">
            <div className="add-freind-top-navigation">
                <div className="back-button">
                    <IoMdArrowBack size={30} onClick={() => navigate(-1)} />
                </div>
            </div>
            <div className="manage-buddies" onClick={() => navigate('/my-buddy')}>
                <span className="buddies-wording">Buddy List</span>
            </div>
            {freinds && freinds.map(({ id, otherDetails }) => {
                return (
                    <div className="freind-list" key={id} onClick={() => navigate(`/profile/${id}`)}>
                        <Card name={otherDetails.name} />
                    </div>
                );
            })}
        </div>
    )
}

export default MyFreinds
