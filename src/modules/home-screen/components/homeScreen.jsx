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
const FeedComponent = (props) => {
    return (
        <>
            <div className="news-feed-container-internal">
                {props?.feedData?.length > 1 && props.feedData.map((item, index) => {
                    return (
                        <>
                            <div className="post-card-main-container" key={index}>
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
                                    {item?.image &&   <div className="post-image">
                                            <img src={item?.url} height="90" width="280" style={{ borderRadius: '10px' }} />
                                        </div>}
                                    </div>
                                    <div className="misc-container">
                                        <AiFillLike color={props.likeImage ? 'blue' : 'grey'} onClick={() => props.updateLike(item?.post_id, item?.likes)}/> {item?.likes}
                                    </div>
                                </div>
                            </div>
                        </> 
                    );
                })}
            </div>
        </>
    );
}
const HomeScreen = () => {
    const [newsFeed, setNewsFeed] = useState();
    const [feedValue, setFeedValue] = useState('');
    const [image, setImage] = useState();
    const publishNewFeed = async () => {
        if(feedValue.length <= 0) return;
        const { data, error } = await supabase
            .from('feed-db')
            .insert({
                post_id: uuid(),
                feed_title: feedValue,
                image: '',
                user_id: JSON.parse(localStorage.getItem('token'))?.user?.uid
            })
        if (data) {
            console.log(data);
            await getFeedData();
        }
    }
    const getFeedData = async () => {
        const { data, error } = await supabase
            .from('feed-db')
            .select('*')
        if (data) {
            setNewsFeed(data);
        }
        console.log(data)
    }
    const uploadFile = () => {
        const fileInput = document.getElementById('file-input-photos');
        fileInput.click();
    }
    let navigate = useNavigate();
    const [likeImage, setLikeImage] = useState(false);
    const likePost = async(post_id, likes) => {
        setLikeImage(!likeImage)
        const { data, error } = await supabase
        .from('feed-db')
        .update({likes: likes + 1})
    if (data) {
        console.log(data);
        await getFeedData();
    }

    }
    const uploadImagetoStorage = async (file) => {
        const filePath = uuid() + '-' + file.name
        const { data, error } = await supabase.storage.from('feed-image').upload( filePath, file,{
            cacheControl: '3600',
            upsert: false,
            contentType: 'image/png'
          } )
        const { publicURL } = supabase.storage.from('feed-image').getPublicUrl(filePath)
        if(publicURL){
            console.log(publicURL);
        }
    }
    useEffect(() => {
        (async () => await getFeedData())();
    }, [])
    useEffect(() => {
        console.log(image);
    }, [image])
    return (
        <>
            <div className="parent-container">
                <div className="bottom-tabs">
                    <div className="bottom-tabs-main-container">
                        {BottomTabList.map((item) => {
                            return (
                                <div className="bottom-tabs-container">
                                    <img src={item.icon} onClick={() => navigate(item.onClick)} height="40" width="40" />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="news-feed-section">
                    <FeedComponent feedData={newsFeed} likeImage={likeImage} updateLike={likePost}/>
                </div>
                <div className="top-nav-main-container">
                    <div className="game-in-title">
                        Game<span className="in-title">IN</span>
                    </div>
                </div>
                <div className="new-feed-post">
                    <div className="input-area-container">
                        <div className="input-area-internal-container">
                            <textarea placeholder="what's on your mind?" value={feedValue} onChange={(e) => setFeedValue(e.target.value)} spellCheck className="input-area" id="input-area" />
                        </div>
                        <div className="input-area-buttons">
                            <div className="input-area-multi-buttons-container">
                                <div className="photos">
                                    <input type="file" id="file-input-photos" accept="image/*" onChange={(e) => uploadImagetoStorage(e.target.files[0])}/>
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
            </div>
        </>
    );
}

export default HomeScreen;