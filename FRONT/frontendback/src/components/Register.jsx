import React, { useState } from 'react';


import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [name, setname] = useState('');
        const [email, setemail] = useState('');

    const [password, setpass] = useState('');
   const [age, setage] = useState('');


        const [gender, setgender] = useState('');
    const [address, setaddress] = useState('');
    const [contactNumber, setcontact] = useState('');

        const [image, setimage] = useState(null);
    const [imagePreview, setimageprev] = useState('');


        const navigate = useNavigate();

   const handleimage = (e) => {
        const file = e.target.files[0];


        setimage(file);
     setimageprev(URL.createObjectURL(file));
    };

    const validform = () => {
        if (!name || !email || !password || !age || !gender || !address || !contactNumber) {
           alert('fill out all required fields ');


            return false;
        }
        return true;
    };
    const handsubmit = async (e) => {
       e.preventDefault();


        if (!validform()) return;
        navigate('/log');
    };

    return (
        <form className="form-container" onSubmit={handsubmit}  >
            <div>
                <label>Name:</label>
                <input
                    type="text"
                value={name}
                    onChange={(e) => setname(e.target.value)}
                />


            </div>
           <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />
            </div>

          <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setpass(e.target.value)}
                />
                </div>
            <div>
                <label>Age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setage(e.target.value)}
                />

            </div>


                <div>
                <label>Gender:</label>
                <input
                    type="text"
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                />
                </div>
            <div>



                <label>Address:</label>
                <input
                    type="text"
                        value={address}
                    onChange={(e) => setaddress(e.target.value)}
                />


                </div>
            <div>
                <label>Contact Number:</label>
                <input
                    type="text"
                        value={contactNumber}
                    onChange={(e) => setcontact(e.target.value)}
                />
            </div>
                 <div>




                <label>Image:</label>
                <input
                    type="file"
                         accept="image/*"
                        onChange={handleimage}
                />
            </div>





            {imagePreview && (
                <div className="image-preview">
                        <img src={imagePreview} alt="Image Preview" />
                </div>
            )}
                 <button type="submit"  >Register</button>
        </form>
    );
};

export default Register;
//ayon