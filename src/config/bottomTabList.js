import {FaUserFriends} from 'react-icons/fa';
import {ImFeed} from 'react-icons/im';
const bottomTabList = [
    {
        id: 1,
        name: 'Home',
        icon: <ImFeed size={50}/>,
        onClick: '/'
    },
    {
        id: 2,
        name: 'Freinds',
        icon: <FaUserFriends size={50}/>,
        onClick: '/add-buddy'
    },

];

export default bottomTabList;