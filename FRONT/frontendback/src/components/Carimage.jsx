import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./Carimage.css";

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [fueltype, setFuelType] = useState("");
    const [error, setError] = useState("");
    const [selectedCar, setSelectedCar] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchCars();
    }, [fueltype]);

    const fetchCars = () => {
        axios
            .get(`http://localhost:4000/cars/images?fueltype=${fueltype}`)
            .then((response) => {
                setCars(response.data);
                setError("");
            })
            .catch(() => {
                setError(`No cars found for ${fueltype}`);
                setCars([]);
            });
    };

    const handleBookClick = (car) => {
        if (car.isBooked) {
            alert("Car is already booked.");
            return;
        }
        setSelectedCar(car);
    };

    const bookCar = async (carId) => {
        if (!user) {
            alert("Please login to book a car.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:4000/bookings/bookcar",
                { carId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Car booked successfully via Hand Cash!");
            setSelectedCar(null);
            fetchCars();
        } catch (error) {
            alert(error.response?.data?.message || "Error booking car.");
        }
    };

    return (
        <div className="container">
            <h2 className="title">Car Listings</h2>

            <select className="dropdown" value={fueltype} onChange={(e) => setFuelType(e.target.value)}>
                <option value="">All Cars</option>
                <option value="Gas">Gas</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
            </select>

            {error && <p className="error">{error}</p>}

            <div className="car-grid">
                {cars.length > 0 ? (
                    cars.map((car) => (
                        <div key={car._id} className="car-card">
                            <div className="modal-container">
                                {selectedCar && selectedCar._id === car._id && (
                                    <div className="modal">
                                        <div className="modal-content">
                                            <h3>Select Payment Method</h3>
                                            <button className="payment-btn" onClick={() => bookCar(car._id)}>Hand Cash</button>
                                            <button className="close-btn" onClick={() => setSelectedCar(null)}>Cancel</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <img src={`http://localhost:4000${car.image}`} alt={car.name} className="car-image" />
                            <div className="car-info">
                                <h3 className="car-name">{car.name}</h3>
                                <p className="car-fuel">Fuel Type: {car.fueltype}</p>
                                <p className="car-fuel">Capacity: {car.capacity}L</p>
                                <p className="car-fuel">Rent Per Hour: {car.rentperhour}$</p>
                                <button
                                    className="book-btn"
                                    onClick={() => handleBookClick(car)}
                                    disabled={car.isBooked}
                                >
                                    {car.isBooked ? "Booking Done" : "Book it"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-data">No car data found.</p>
                )}
            </div>
        </div>
    );
};

export default CarList;