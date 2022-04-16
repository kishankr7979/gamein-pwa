import React, {useState, useEffect} from 'react';
import './styles/homeScreen.css'
import ProfileIcon from '../assets/pro.png'
import PhotoIcon from '../assets/photos-icon.png';
import VideoIcon from '../assets/videos-icon.png';
import PostButton from '../assets/post-btn.png';
import {useNavigate} from "react-router-dom";
import getAllFeeds from '../../../service';
import BottomTabList from "../../../config/bottomTabList";
const FeedComponent = (props) => {
    return (
        <>
            <div className="news-feed-container-internal">
                {props.feedData.length > 1 && props.feedData.map((item) => {
                    return (
                        <>
                            <div className="post-card-main-container">
                                <div className="internal-card-container">
                                    <div className="first-section-container">
                                        <div className="profile-img">
                                            <img src={ProfileIcon} height="20" width="20"/>
                                        </div>
                                        <div className="feed-title-container">
                                            {item.title}
                                        </div>
                                    </div>
                                    <div className="second-section-container">
                                        <div className="post-image">
                                            <img src={item.url} height="90" width="280" style={{borderRadius: '10px'}}/>
                                        </div>
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
    const [newFeed, setNewFeed] = useState('');
    const [newsFeedDataContainer, setNewsFeedDataContainer] = useState([]);
    const [feedData, setFeedData] = useState({});
    useEffect(() => {
       getAllFeeds(1,50)
           .then((resp) => setFeedData(resp))
           .catch((e) => console.error(e));
    }, []);
    let feedMainData;
    const addToFeed = () => {
        const data = [...newsFeedDataContainer,
            { albumId: Math.random(),
                id: 1,
                thumbnailUrl: "https://via.placeholder.com/150/92c952",
                title: newFeed,
                url: "https://via.placeholder.com/600/92c952",
            }];
        setNewsFeedDataContainer(data);
        feedMainData = feedData.concat(newsFeedDataContainer);
        setFeedData(feedMainData);
    }
    const uploadFile = () => {
        const fileInput  = document.getElementById('file-input-photos');
        fileInput.click();
    }
    let navigate = useNavigate();
    return (
        <>
            <div className="parent-container">
                <div className="bottom-tabs">
                    <div className="bottom-tabs-main-container">
                        {BottomTabList.map((item) => {
                            return (
                                <div className="bottom-tabs-container">
                                    <img src={item.icon} onClick={() => navigate(item.onClick)} height="40" width="40"/>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="news-feed-section">
                    <FeedComponent feedData={feedData}/>
                </div>
                <div className="top-nav-main-container">
                    <div className="game-in-title">
                        Game<span className="in-title">IN</span>
                    </div>
                </div>
                <div className="new-feed-post">
                    <div className="input-area-container">
                        <div className="input-area-internal-container">
                            <textarea placeholder="what's on your mind?" value={newFeed} onChange={(e) => setNewFeed(e.target.value)} spellCheck className="input-area" id="input-area"/>
                        </div>
                        <div className="input-area-buttons">
                        <div className="input-area-multi-buttons-container">
                            <div className="photos">
                                <input type="file" id="file-input-photos"/>
                                <img src={PhotoIcon} height="10" width="10" onClick={uploadFile}/>
                                Photos
                            </div>
                            <div className="videos">
                                <img src={VideoIcon} height="10" width="10" />
                                Videos
                            </div>
                            <div className="submit" onClick={addToFeed}>
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