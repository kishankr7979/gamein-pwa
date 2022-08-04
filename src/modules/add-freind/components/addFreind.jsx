import React, { useState, useEffect } from 'react'
import './styles/addFreind.css';
import { IoMdArrowBack } from 'react-icons/io';
import { FcNext } from 'react-icons/fc';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { supabase } from '../../../config/supabase';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid'
const AddFreind = () => {
    const navigate = useNavigate();
    const [users, setUser] = useState();
    const [requests, setRequests] = useState();
    const getUsers = async () => {
        let { data, error } = await supabase
            .from('user-db')
            .select('*')
        if (data) {
            setUser(data);
            console.log(data);
        }
    }
    const getFreindReq = async () => {
        let { data, error
        } = await supabase
            .from('requests-db')
            .select('*, user-db(*)')
            .match({ to: JSON.parse(localStorage.getItem('token'))?.user?.uid })
        setRequests(data);
    }
    const acceptReq = async (reqId) => {
        const { data, error } = await supabase
            .from('requests-db')
            .update({ accept: true })
            .eq('id', reqId)
        if (data) {
            console.log('accepted request')
            await getFreindReq();
        }
        else if (error) {
            console.log(error);
        }
    }
    const addFreind = async (to_id) => {
        const { data, error } = await supabase
            .from('requests-db')
            .insert([
                { id: uuid(), from: JSON.parse(localStorage.getItem('token'))?.user?.uid, to: to_id},
            ])
        if (data) {
            console.log(data);
        } else if (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        (async () => {
            await getUsers()
            await getFreindReq()

        })();
    }, [])

    return (
        <div className="main-class">
            <div className="add-freind-top-navigation">
                <div className="back-button">
                    <IoMdArrowBack size={30} onClick={() => navigate(-1)} />
                </div>
            </div>
            <div className="manage-buddies">
                <span className="buddies-wording">Manage my buddies</span>
                <FcNext size={20} color='blue' />
            </div>
            <div className="incoming-requests-container">
                <div className="header">
                    <span className="header-wording">Buddy requests</span>
                    {requests?.length > 3 && <FcNext size={18} color='black' />}
                </div>
                <div className="divider"></div>
                {requests?.filter((item) => !item.accept).map((item) => (
                    <> 
                        <div className="request-container" key={item?.id}>
                            <div className="request-name">
                                <CgProfile size={30} />
                                <span className="friend-name">{item?.['user-db']?.name}</span>
                            </div>
                            <div className="request-accept">
                                <AiOutlineUserAdd size={20} color='green' />
                                <span onClick={() => acceptReq(item?.id)}>Accept</span>
                            </div>
                        </div>
                        <div className="divider"></div>
                    </>
                ))}
            </div>
            <div className="add-requests-container">
                {users?.map((item) => (
                    <div className="add-friend-container" key={item?.id}>
                        <CgProfile size={80} />
                        <span className='send-req-name'>{item?.name}</span>
                        <div className="request-accept">
                            <AiOutlineUserAdd size={20} color='#2196F3' />
                            <span onClick={() => addFreind(item?.id)}>Add</span>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default AddFreind
