import axios from 'axios';

const car_URL = 'http://localhost:4000/cars';
const user_URL = 'http://localhost:4000/userrr';

const registercar = async (Data) => {

    return await axios.post(
        `${car_URL}/car`,
        Data,
        {
            headers: {

                'Content-Type': 'multipart/form-data'
            }
        }
    );
};
const registeruser = async (Data) => {

    return await axios.post(
        `${user_URL}/register`,
        Data,
        {
            headers: {

                'Content-Type': 'multipart/form-data'
            }
        }
    );
};
const loginuser = async (Data) => {
    return await axios.post(`${user_URL}/login`, Data, {
        headers: {
            'Content-Type': 'application/json',  // Changed from multipart/form-data
        },
    });
};

export { registercar, registeruser, loginuser };