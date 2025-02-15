import React, { useEffect, useState } from "react";
import axios from "axios";

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [selectcar, setselectedCar] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        fueltype: "",
        capacity: "",
        rentperhour: "",
        image: null,
    });

    useEffect(() => {
        fetchcars();
    }, []);

    const fetchcars = async () => {
        try {
            const response = await axios.get("http://localhost:4000/cars/images");
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching cars", error);
        }
    };

    const handleedit = (car) => {
        setselectedCar(car);
        setFormData({
            name: car.name,
            fueltype: car.fueltype,
            capacity: car.capacity,
            rentperhour: car.rentperhour,
            image: null,
        });
    };

    const handlechange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlefile = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!selectcar) return;

        const data = new FormData();
        data.append("name", formData.name);
        data.append("fueltype", formData.fueltype);
        data.append("capacity", formData.capacity);
        data.append("rentperhour", formData.rentperhour);
        if (formData.image) data.append("image", formData.image);

        try {
            await axios.put(`http://localhost:4000/cars/${selectcar._id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Car updated successfully");
            setselectedCar(null);
            fetchcars();
        } catch (error) {
            console.error("Error updating car", error);
        }
    };

    return (
        <div>
            <h1>Car List</h1>
            <ul>
                {cars.map((car) => (
                    <li key={car._id}>
                        <img src={`http://localhost:4000${car.image}`} alt={car.name} width="100" />
                        <p>{car.name}</p>
                        <button onClick={() => handleedit(car)}>Edit</button>
                    </li>
                ))}
            </ul>

            {selectcar && (
                <div>
                    <h2>Edit Car</h2>
                    <form onSubmit={handlesubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handlechange}
                            placeholder="Name"
                            required
                        />
                        <input
                            type="text"
                            name="fueltype"
                            value={formData.fueltype}
                            onChange={handlechange}
                            placeholder="Fuel Type"
                            required
                        />
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handlechange}
                            placeholder="Capacity"
                            required
                        />
                        <input
                            type="number"
                            name="rentperhour"
                            value={formData.rentperhour}
                            onChange={handlechange}
                            placeholder="Rent per Hour"
                            required
                        />
                        <input type="file" onChange={handlefile} />
                        <button type="submit">Update Car</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CarList;