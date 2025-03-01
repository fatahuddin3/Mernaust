
import React, { useState } from 'react';
import { registercar } from '../services/Service';
import { useNavigate } from 'react-router-dom';
import './Car.css'; 

const Carregister = () => {
    const [name, setName] = useState('');
    const [fueltype, setFuelType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [rentperhour, setRentPerHour] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
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
        <div className="register-container">
            <h2>Car Registration</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Fuel Type:</label>
                    <input
                        type="text"
                        value={fueltype}
                        onChange={(e) => setFuelType(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Capacity:</label>
                    <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Rent per Hour:</label>
                    <input
                        type="number"
                        value={rentperhour}
                        onChange={(e) => setRentPerHour(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                    </div>
                )}
                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
    );
};

export default Carregister;