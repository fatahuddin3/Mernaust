import React, { useState, useContext } from 'react';
import { registercar } from '../services/Service';
import { useNavigate } from 'react-router-dom';

const Carregister = () => {
    const [name, setname] = useState('');
    const [fueltype, setfueltype] = useState('');
    const [capacity, setcapacity] = useState('');
    const [rentperhour, setrentperhour] = useState('');

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');


    const navigate = useNavigate();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };


    const handlesubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('name', name);
        formData.append('fueltype', fueltype);
        formData.append('capacity', capacity);
        formData.append('rentperhour', rentperhour);

        if (image) {
            formData.append('image', image);
        }

        try {

            const response = await registercar(formData);
            if (response) {


                navigate('/login');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Contact number is already used. Please try another one.');
            } else {
                alert(`Registration error: ${error.message}`);
            }
        }
    };

    return (
        <form onSubmit={handlesubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                />
            </div>
            <div>
                <label>Fueltype:</label>
                <input
                    type="text"
                    value={fueltype}
                    onChange={(e) => setfueltype(e.target.value)}
                />
            </div>
            <div>
                <label>Capacity:</label>
                <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setcapacity(e.target.value)}
                />
            </div>
            <div>
                <label>Rent per hour:</label>
                <input
                    type="number"
                    value={rentperhour}
                    onChange={(e) => setrentperhour(e.target.value)}
                />
            </div>
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            {imagePreview && <div>
                <img src={imagePreview} alt="Image Preview" style={{ width: '100px', height: '100px' }} />
            </div>}
            <button type="submit">Register</button>
        </form>
    );
};

export default Carregister;
