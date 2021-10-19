import React, {useState} from 'react';
import axios from 'axios';
import {Cancel} from '@material-ui/icons';

const Register = ({setShowRegister}) => {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChangeForm = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }

    try {
      await axios.post('/user/register', newUser);
      setSuccess(true);
      setErrors(false);
    } catch (e) {
      setErrors(true)
    }
  }

  return (
    <div className="enteringContainer">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="username" onChange={handleChangeForm} value={formData.username} />
        <input type="email" name="email" placeholder="email" onChange={handleChangeForm} value={formData.email} />
        <input type="password" name="password" placeholder="password" onChange={handleChangeForm} value={formData.password} />
        <button>Register</button>
        {success && <span className="message success">Successfull. You can login now!</span>}
        {errors && <span className="message error">Something went wrong!</span>}
      </form>
      <Cancel className='closeEnteringForm' onClick={() => setShowRegister(false)} />
    </div>
  );
};

export default Register;