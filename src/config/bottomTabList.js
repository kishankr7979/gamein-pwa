import {FaUserFriends} from 'react-icons/fa';
import {ImFeed} from 'react-icons/im';
const bottomTabList = [
    {
        id: 1,
        name: 'Home',
        icon: <ImFeed size={50} color='rgb(93,133,235)'/>,
        onClick: '/'
    },
    {
        id: 2,
        name: 'Freinds',
        icon: <FaUserFriends size={50} color='#ffffff'/>,
        onClick: '/add-buddy'
    },

];

export default bottomTabList;