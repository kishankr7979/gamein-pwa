import React, {useState, useEffect} from 'react';
import './styles/homeScreen.css'
import NewsFeedIcon from '../assets/news.png';
import ProfileIcon from '../assets/pro.png'
import {useNavigate} from "react-router-dom";
import axios from 'axios';
const FeedComponent = () => {
    let navigate = useNavigate();
    const [feedData, setFeedData] = useState({});
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=50')
            .then((resp) => setFeedData(resp.data))
            .catch((error) => console.error(error));
    },[])
    console.log(feedData)
    return (
        <>
            <div className="news-feed-container-internal">
                {feedData.length > 1 && feedData.map((item) => {
                    return (
                        <>
                            <div className="post-card-main-container">
                                <div className="internal-card-container">
                                    <div className="first-section-container">
                                        <div className="profile-img">
                                        <img src={ProfileIcon} height="20" width="20" />
                                        </div>
                                        <div className="feed-title-container">
                                            {item.title}
                                        </div>
                                    </div>
                                    <div className="second-section-container">
                                        <div className="post-image">
                                            <img src={item.url} height="100" width="320" style={{borderRadius: '10px'}}/>
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
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    console.log(userDetails);
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('userDetails');
        navigate('/');
        setTimeout(() => {
            window.location.reload();
        },500);
    }
    return(
        <>
            <div className="parent-container">
                <div className="feed-main-container">
                    <FeedComponent />
                </div>
                <div className="bottom-tabs-main-container">
                        <div className="bottom-tabs-tabs-container">
                            <div className="news-feed-container">
                                <img src={NewsFeedIcon} height="40" width="40"/>
                            </div>
                            <div className="profile-container">
                                <div className="profile-internal-container">
                                <img src={ProfileIcon} height="20" width="20" />
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
}

export default HomeScreen;