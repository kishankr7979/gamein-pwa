import React, { useState, useEffect } from 'react'
import './styles/addFreind.css';
import { IoMdArrowBack } from 'react-icons/io';
import { FcNext } from 'react-icons/fc';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { supabase } from '../../../config/supabase';
import { useNavigate } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';
import uuid from 'react-uuid'
const AddFreind = () => {
    const navigate = useNavigate();
    const [users, setUser] = useState();
    const [requests, setRequests] = useState();
    const [frnds, setFrnds] = useState();
    const [iconChanged, setIconChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const userId = JSON.parse(localStorage.getItem('token'))?.user?.uid
    const getFreindReq = async () => {
        let { data, error
        } = await supabase
            .from('requests-db')
            .select('*, user-db(*)')
            .match({ to: userId })
        if (data) {
            setRequests(data);
        }
        return data
    }
    const getUsers = async () => {
        let { data, error } = await supabase
            .from('user-db')
            .select('*')
        if (data) {
            setUser(data);
        }

    }
    const getCurrentUserData = async () => {
        const { data, error } = await supabase
            .from('user-db')
            .select('*')
            .match({ id: userId })
        if (data) {
            return data[0];
        }
    }
    const getFrndList = async (id) => {
        const { data, error } = await supabase
            .from('freinds-db')
            .select('*')
            .match({ id: id })
        if (data) {
            setFrnds(data);
        }
        else if (error) {
            console.log(error);
        }
        return data;
    }

    const updateFrnds = async (whom, fr) => {
        const { data, error } = await supabase
            .from('freinds-db')
            .update({ freinds: fr })
            .match({ id: whom })
        return data;
    }

    const addFrnd = async (id, fr) => {
        const { data, error } = await supabase
            .from('freinds-db')
            .insert([{ id: id, freinds: fr }])

        return data;
    }
    const addToFrndList = async (from, to, otherDetails) => {
        const curr = await getCurrentUserData();
        const res = await getFrndList(to);
        const { data, error } = await supabase
            .from('freinds-db')
            .insert([{ id: to, freinds: [{ id: from, otherDetails: otherDetails }] },
            { id: from, freinds: [{ id: to, otherDetails: curr }] }
            ])
        if (data) {
            console.log(data);
        }
        if (error) {
            const newF = await addFrnd(from, [{ id: to, otherDetails: curr }])
            const d = await updateFrnds(to, [...res?.[0]?.freinds, { id: from, otherDetails: otherDetails }])
        }
    }
    const acceptReq = async (reqId, from, to, otherDetails) => {
        const { data, error } = await supabase
            .from('requests-db')
            .update({ accept: true })
            .eq('id', reqId)
        if (data) {
            await getFreindReq();
            await addToFrndList(from, to, otherDetails)
        }
        else if (error) {
            console.log(error);
        }
    }
    const addFreind = async (to_id) => {
        const { data, error } = await supabase
            .from('requests-db')
            .insert([
                { id: uuid(), from: userId, to: to_id },
            ])
        if (data) {
            await getUsers();
        }
        if (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        (async () => {
            setLoading(true);
            await getUsers()
            await getFreindReq();
            await getFrndList(userId)
            setLoading(false);
        })();
    }, [])
    return (
        <div className="main-class">
            <div className="add-freind-top-navigation">
                <div className="back-button">
                    <IoMdArrowBack size={30} onClick={() => navigate(-1)} />
                </div>
            </div>
            {loading ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Rings ariaLabel="loading-indicator" color='#2196F3' width='200px' height='200px' /></div>) : (
                <>
                    <div className="manage-buddies" onClick={() => navigate('/my-buddy')}>
                        <span className="buddies-wording">Manage my buddies</span>
                        <FcNext size={20} color='blue' />
                    </div>
                    <div className="incoming-requests-container">
                        <div className="header">
                            <span className="header-wording">Buddy requests</span>
                            {requests?.length > 3 && <FcNext size={18} color='black' />}
                        </div>
                        {requests?.filter((item) => !item.accept)?.length === 0 && <span>No requests yet :(</span>}
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
                                        <span onClick={() => acceptReq(item?.id, item?.from, item?.to, item?.['user-db'])}>Accept</span>
                                    </div>
                                </div>
                                <div className="divider"></div>
                            </>
                        ))}
                    </div>
                    <div className="add-requests-container">
                        {users?.filter(({ id }) => id !== userId && !requests?.some(({ from }) => from === id)).map((item) => {
                            return (
                                <div className="add-friend-container" key={item?.id}>
                                    <CgProfile size={80} />
                                    <span className='send-req-name'>{item?.name}</span>
                                    <div className="request-accept">
                                        <AiOutlineUserAdd size={20} color='#2196F3' />
                                        <span onClick={() => addFreind(item?.id)}>Add</span>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                </>
            )}
        </div>
    )
}

export default AddFreind
