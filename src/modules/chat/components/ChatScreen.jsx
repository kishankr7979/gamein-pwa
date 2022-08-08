import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './styles/chatScreen.css';
import { IoMdArrowBack } from 'react-icons/io';
import { Input } from '@mui/material';
import { FiSend } from 'react-icons/fi';
import { supabase } from '../../../config/supabase';
import { CgProfile } from 'react-icons/cg';
import uuid from 'react-uuid'
import moment from 'moment';
const ChatScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [frnd, setFrnd] = useState();
    const [displayChat, setDisplayChat] = useState();
    const getFrndDetails = async () => {
        const { data, error } = await supabase
            .from('user-db')
            .select('*')
            .match({ id: id })
        if (data) {
            setFrnd(data[0]);
        }
    }
    const getIncomingChatData = async () => {
        const { data, error } = await supabase
            .from('chat-db')
            .select('*')
            .match({ from: id, to: userId })
        if (data) {
            return data;
        }
    }
    const getOutgoingChatData = async () => {
        const { data, error } = await supabase
            .from('chat-db')
            .select('*')
            .match({ from: userId, to: id })
        if (data) {
            return data;
        }
    }
    const allChats = async () => {
        const res = await getIncomingChatData();
        const res2 = await getOutgoingChatData();
        const d = res.concat(res2);
        console.table(d.sort((a, b) => a.created_at - b.created_at));
        setDisplayChat(d);

    }
    const userId = JSON.parse(localStorage.getItem('token'))?.user?.uid;
    const [input, setInput] = useState('');
    const sendMessage = async () => {
        if (input.trim().length === 0) return;
        const { data, error } = await supabase
            .from('chat-db')
            .insert({
                id: uuid(),
                from: userId,
                to: id,
                message: input
            })
        if (data) {
            console.table(data);
            await allChats();
            setInput('');
        }
        if (error) {
            console.error(error);
        }
    }
    const inputMessage = () => (
        <div className='send-message-container'>
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='write your message' fullWidth className='input' />
            <FiSend size={30} color={input.trim().length >= 1 ? '#2196F3' : 'grey'} onClick={sendMessage} />
        </div>
    )

    useEffect(() => {
        (async () => Promise.all([await getFrndDetails(), await allChats()]))();
    }, [])
    return (
        <div class="chatscreen-container">
            <div className="toolbar-container">
                <div className="tool-bar-button">
                    <IoMdArrowBack size={30} onClick={() => navigate(-1)} />
                </div>
                <span className='chat-name'>{frnd?.name}</span>
            </div>
            <div>
                {displayChat?.sort((i) => i.created_at)?.map((i) => (
                    <div className="chat-parent">
                        <div className='chat-container' style={{ display: 'flex', gap: '10px', justifyContent: i.from === userId ? 'flex-start' : 'flex-end', alignItems: 'center' }}>
                            <span>{i.message}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='footer'>
                <div className='chat-input-container'>
                    {inputMessage()}
                </div>
            </div>
        </div>
    )
}

export default ChatScreen
