import axios from 'axios';

const API_URL = 'http://localhost:52944/api/Stocks/Getallstocks'; // Replace 'port' with your API port

export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;

};
