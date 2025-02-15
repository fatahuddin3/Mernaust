
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Carimage.css";

const CarList = () => {
    const [cars, setcars] = useState([]);
    const [fueltype, setFuelType] = useState("");
    const [error, seterror] = useState("");

    useEffect(() => {
        fetchcars();
    }, [fueltype]);

    const fetchcars = () => {
        axios
            .get(`http://localhost:4000/cars/images?fueltype=${fueltype}`)
            .then((response) => {
                console.log("Fetched Cars:", response.data);
                setcars(response.data);
                seterror("");
            })
            .catch((error) => {
                console.error("Error fetching cars:", error);
                seterror(`No cars found for ${fueltype}`);
                setcars([]);
            });
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
                    cars.map((car, index) => (
                        <div key={index} className="car-card">
                            <img src={`http://localhost:4000${car.image}`} alt={car.name} className="car-image" />
                            <div className="car-info">
                                <h3 className="car-name">{car.name}</h3>
                                <p className="car-fuel">Fuel Type: {car.fueltype}</p>
                                <p className="car-fuel">Capacity: {car.capacity}L</p>
                                <p className="car-fuel">Rent Per Hour: {car.rentperhour}$</p>
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