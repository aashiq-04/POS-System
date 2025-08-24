import axios from 'axios';

const API_BASE_URL = 'https://pos-system-u951.onrender.com/bills';

const getBills = ()=>{
    return axios.get(API_BASE_URL);
}

const createBill = (cart) => {
    const payload = cart.map(item => ({
        product: { id: item.id },  // Make sure your backend expects this field
        price: item.price,
        quantity: item.quantity
      }));
    return axios.post(API_BASE_URL, payload);
};

export {getBills, createBill};
