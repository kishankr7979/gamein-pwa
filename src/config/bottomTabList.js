import NewsFeedIcon from "../modules/home-screen/assets/news.png";
import ProfileIcon from "../modules/home-screen/assets/pro.png";

const bottomTabList = [
    {
        id: 1,
        name: 'Home',
        icon: NewsFeedIcon,
        onClick: '/'
    },
    {
        id: 2,
        name: 'Profile',
        icon: ProfileIcon,
        onClick: '/profile'
    },

];

export default bottomTabList;