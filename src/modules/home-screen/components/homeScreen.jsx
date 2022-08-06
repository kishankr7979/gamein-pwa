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

    function getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const uploadImagetoStorage = async (file) => {
        setLoading(true);
        const filePath = uuid() + '-' + file.name
        console.log(file);
        let idCardBase64 = '';
        getBase64(file, (result) => {
            idCardBase64 = result;
            console.log(result);
            axios.post(`http://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5&source=${result}`).then((resp) => {
                console.log(resp);
            })
            setLoading(false);
            debugger;
        })
   
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

    useEffect(() => {
        (async () => await getFeedData())();
    }, [])
    return (
        <>
            <div className="parent-container">
                <div className="top-nav-main-container">
                    <div className="game-in-title">
                        <CgProfile color='black' onClick={() => navigate(`/profile/${userId}`)} />
                        <div>
                            Game<span className="in-title">IN</span>
                        </div>
                        <BiMessageSquareDots color='#FFFFFF' />
                    </div>
                </div>
                <div className="news-feed-section">
                    <FeedComponent feedData={newsFeed} likeImage={likeImage} updateLike={likePost} likedValue={likedValue} userId={JSON.parse(localStorage.getItem('token'))?.user?.uid} loading={feedLoading} />
                </div>
                {loading ? <div className="new-feed-post"><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Rings ariaLabel="loading-indicator" color='grey' /></div></div> : (
                    <div className="new-feed-post">
                        <div className="input-area-container">
                            <div className="input-area-internal-container">
                                <textarea placeholder="what's on your mind?" value={feedValue} onChange={(e) => setFeedValue(e.target.value)} spellCheck className="input-area" id="input-area" />
                            </div>
                            <div className="input-area-buttons">
                                <div className="input-area-multi-buttons-container">
                                    <div className="photos">
                                        <input type="file" id="file-input-photos" accept="image/*" onChange={(e) => uploadImagetoStorage(e.target.files[0])} />
                                        <img src={PhotoIcon} height="10" width="10" onClick={uploadFile} />
                                Photos
                            </div>
                                    <div className="videos">
                                        <img src={VideoIcon} height="10" width="10" />
                                Videos
                            </div>
                                    <div className="submit" onClick={publishNewFeed}>
                                        <img src={PostButton} height="10" width="10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="bottom-tabs">
                <div className="bottom-tabs-main-container">
                    {BottomTabList.map((item) => {
                        return (
                            <div className="bottom-tabs-container">
                                <span onClick={() => navigate(item.onClick)}>{item.icon}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default HomeScreen;