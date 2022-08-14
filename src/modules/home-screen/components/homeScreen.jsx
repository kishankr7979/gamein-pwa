import React, { useState, useEffect } from 'react';
import './styles/homeScreen.css'
import ProfileIcon from '../assets/pro.png'
import PhotoIcon from '../assets/photos-icon.png';
import VideoIcon from '../assets/videos-icon.png';
import PostButton from '../assets/post-btn.png';
import { useNavigate } from "react-router-dom";
import getAllFeeds from '../../../service';
import { Firebase, db } from '../../../config/firebase';
import BottomTabList from "../../../config/bottomTabList";
import uuid from 'react-uuid'
import { supabase } from '../../../config/supabase';
import { AiFillLike } from "react-icons/ai";
import { CgProfile } from 'react-icons/cg';
import { BiMessageSquareDots } from 'react-icons/bi';
import { Rings } from 'react-loader-spinner';
import axios from 'axios';
import styled from 'styled-components';
const FeedComponent = (props) => {
    return (
        <>
            <div className="news-feed-container-internal">
                {props.loading ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><Rings ariaLabel="loading-indicator" color='#2196F3' width='200px' height='200px' /></div>) : (<>
                    {props?.feedData?.length > 0 && props.feedData.map((item, index) => {
                        return (
                            <div>
                                {props.loading ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Rings ariaLabel="loading-indicator" color='grey' /></div>) : (
                                    <div className="post-card-main-container" key={item?.post_id}>
                                        <div className="internal-card-container">
                                            <div className="first-section-container">
                                                <div className="profile-img">
                                                    <img src={ProfileIcon} height="20" width="20" />
                                                </div>
                                                <div className="feed-title-container">
                                                    {item?.feed_title}
                                                </div>
                                            </div>
                                            <div className="second-section-container">
                                                {item?.image && <div className="post-image">
                                                    <img src={item?.image} height="90" width="280" style={{ borderRadius: '10px' }} />
                                                </div>}
                                            </div>
                                            <div className="misc-container">
                                                <AiFillLike color={item?.likes?.includes(props.userId) ? 'blue' : 'grey'} onClick={() => props.updateLike(item?.post_id, item?.likes)} /> {item?.likes?.length}
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        );
                    })}
                </>)}

                {!props.loading && props?.feedData?.length === 0 && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>No posts yet :( </div>}
            </div>
        </>
    );
}
const HomeScreen = () => {
    const [newsFeed, setNewsFeed] = useState();
    const userId = JSON.parse(localStorage.getItem('token'))?.user?.uid
    const [feedValue, setFeedValue] = useState('');
    const [image, setImage] = useState();
    const [likedValue, setLikedValue] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedLoading, setFeedLoading] = useState(false);
    const [tab, setTab] = useState(1);
    const publishNewFeed = async () => {
        if (feedValue.length <= 0) return;
        const { data, error } = await supabase
            .from('feed-db')
            .insert({
                post_id: uuid(),
                feed_title: feedValue,
                image: imageUrl,
                user_id: userId
            })
        if (data) {
            await getFeedData();
        }
    }
    const getFeedData = async () => {
        setFeedLoading(true);
        const { data, error } = await supabase
            .from('feed-db')
            .select('*')
        if (data) {
            setNewsFeed(data);
        }
        setFeedLoading(false);
        console.log(data)
    }
    const uploadFile = () => {
        const fileInput = document.getElementById('file-input-photos');
        fileInput.click();
    }
    let navigate = useNavigate();
    const [likeImage, setLikeImage] = useState(false);
    const likePost = async (post_id, likes) => {
        setLikedValue(post_id);
        setLikeImage(true)
        const user_id = JSON.parse(localStorage.getItem('token'))?.user?.uid
        const likesData = [];
        const checkLength = likes?.length;
        if (!likes?.includes(user_id)) {
            if (checkLength > 0 && checkLength !== null) {
                likesData.push(...likes, user_id);
            } else likesData.push(user_id);
            const { data, error } = await supabase
                .from('feed-db')
                .update({
                    likes: likesData
                })
                .eq('post_id', post_id)
            if (data) {
                console.log(data);
                await getFeedData();
            }
        }
        else return;

    }
    const uploadImagetoStorage = async (file) => {
        setLoading(true);
        console.log(file);
        var reader = new FileReader();
        reader.onloadend = async function() {
            console.log('Encoded Base 64 File String:', reader.result);
            /******************* for Binary ***********************/
            var data=(reader.result).split(',')[1];
             var binaryBlob = atob(data);
             console.log('Encoded Binary File String:', binaryBlob);
             const construct = {
                 key: '00001d4a7794e2c7dbfdc8b00e5872b8',
                 media: binaryBlob,
             }
             try{
                const resp = await axios.post('https://thumbsnap.com/api/upload', construct, {
                    headers: {
                        Connection: "keep-alive",
                        "Content-Type": "form-data"
                    },
                    form: true,

                })
                if(resp) {
                    console.log(resp);
                }
            }
            catch(e) {console.error(e)}
          }
          reader.readAsDataURL(file);
       
       
        /* 
            https://thumbsnap.com/api/upload
        */

        // const { data, error } = await supabase.storage.from('feed-image').upload(filePath, file, {
        //     cacheControl: '3600',
        //     upsert: false,
        //     contentType: 'image/png'
        // })
        // const { publicURL } = supabase.storage.from('feed-image').getPublicUrl(filePath)
        // if (publicURL) {
        //     console.log(publicURL);
        //     setImageUrl(publicURL);
        //     setLoading(false);
        // }
        // if (error) {
        //     setLoading(false);
        // }
    }
    const selectTab = (id, route) => {
        setTab(id);
        navigate(route);
    }
    useEffect(() => {
        (async () => await getFeedData())();
    }, [])
    return (
        <Parent>
            <TopNavContainer>
                <div className="game-in-title">
                    <CgProfile color='rgb(93,133,235)' onClick={() => navigate(`/profile/${userId}`)} size={40} />
                    <GameInWording>
                        Game<span className="in-title">IN</span>
                    </GameInWording>
                    <BiMessageSquareDots color='#FFFFFF' size={40} />
                </div>
            </TopNavContainer>
            {/* {loading ? <div className="new-feed-post"><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Rings ariaLabel="loading-indicator" color='grey' /></div></div> : ( */}
            <NewFeedContainer>
                <TextArea type="text" placeholder="what's on your mind?" value={feedValue} onChange={(e) => setFeedValue(e.target.value)} />
                <FeedButtonsContainer>
                    <Photos>
                        <input type="file" id="file-input-photos" accept="image/*" onChange={(e) => uploadImagetoStorage(e.target.files[0])} />
                        <img src={PhotoIcon} height="10" width="10" onClick={uploadFile} />
                                Photos
                            </Photos>
                    <UploadFeedButton onClick={publishNewFeed}>
                        <span>Post</span>
                    </UploadFeedButton>
                </FeedButtonsContainer>
            </NewFeedContainer>
            <FeedSection>
                <FeedComponent feedData={newsFeed} likeImage={likeImage} updateLike={likePost} likedValue={likedValue} userId={JSON.parse(localStorage.getItem('token'))?.user?.uid} loading={feedLoading} />
            </FeedSection>
            <BottomNavigationContainer>
                <div className="bottom-tabs-main-container">
                    {BottomTabList.map((item) => {
                        return (
                            <BottomTabsContainer selected={item.id === tab}>
                                <span onClick={() => selectTab(item.id, item.onClick)}>{item.icon}</span>
                            </BottomTabsContainer>
                        );
                    })}
                </div>
            </BottomNavigationContainer>
        </Parent>
    );
}

export default HomeScreen;

const Parent = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgb(44,62,80);
    background: linear-gradient(90deg, rgba(44,62,80,1) 0%, rgba(0,0,0,1) 66%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    position: relative;
`;

const TopNavContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 720px;
    height: 58px;
    background: rgb(93,133,235);
    background: linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    .game-in-title {
        display: flex;
    justify-content:  space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px 0 10px;
    }

`;

const GameInWording = styled.span`
    font-size: 50px;
    font-family: 'Dot Matrix', sans-serif;
    color: #FFFFFF;
    .in-title {
        color: rgb(93,133,235);
        font-size: 50px;
        font-family: 'Dot Matrix', sans-serif;
    }  
`;

const NewFeedContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 12px;
    background: rgb(93,133,235);
    background: linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
    border-radius: 15px;
    width: 90%;
`;

const TextArea = styled.textarea`
    text-align: center;
    background: #272d3d;
    padding: 12px;
    border: 2px solid linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 20px;
    color: rgb(93,133,235);
    font-size: 30px;
    font-family: 'Dot Matrix', sans-serif;
    width: 100%;
    :focus {
        outline: none !important;
    }
`;

const FeedButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 6px;
    padding: 12px;
`;

const Photos = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 12px;
    background: #272d3d;
    color: rgb(93,133,235);
    border-radius: 10px;
`;

const Videos = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 12px;
    background: #272d3d;
    color: rgb(93,133,235);
    border-radius: 10px;

`;
const UploadFeedButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 12px;
    background: #272d3d;
    color: rgb(93,133,235);
    border-radius: 10px;
    flex: 1;
`;

const FeedSection = styled.div`
    border-radius: 15px;
    display: flex;
    height: 60vh;
    width: 95%;
    max-width: 720px;
    overflow: scroll;
    background: rgb(93,133,235);
    background: linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
    @media screen and (min-width: 350px) and (max-width: 380px) {
        height: 50vh;
    }
`;

const BottomNavigationContainer = styled.div`
    background: rgb(93,133,235);
    background: linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
        .bottom-tabs-main-container {
        display: flex;
        justify-content: space-between;
        align-content: center;
        flex: 1;
        position: fixed;
        bottom: 0;
        width: 100%;
        max-width: 720px;
        height: 78px;
        background: rgb(93,133,235);
        background: linear-gradient(298deg, rgba(93,133,235,1) 0%, rgba(0,0,0,1) 67%);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        gap: 12px;
        }
`;

const BottomTabsContainer = styled.div`
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 0.5;
            background: ${props => props.selected ? '#272d3d' : ''}
            border-radius: 12px;
`;