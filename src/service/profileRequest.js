import axios from "axios";

const getALlFeeds = async (startPage, limitPage) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${startPage}&_limit=${limitPage}`);
        return response.data;
};

export default getALlFeeds;