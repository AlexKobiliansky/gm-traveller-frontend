import React, {useState} from 'react';
import axios from 'axios';
import {Cancel} from '@material-ui/icons';

const Login = ({setShowLogin, storage, setCurrentUser}) => {
  const [errors, setErrors] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChangeForm = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const candidate = {
      username: formData.username,
      password: formData.password
    }

    try {
      const res = await axios.post('/user/login', candidate);
      storage.setItem('user', res.data.username);
      setCurrentUser(res.data.username);
      setShowLogin(false);
      setErrors(false);
    } catch (e) {
      setErrors(true);
    }
  }

  return (
    <div className="enteringContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="username" onChange={handleChangeForm} value={formData.username} />
        <input type="password" name="password" placeholder="password" onChange={handleChangeForm} value={formData.password} />
        <button>Login</button>
        {errors && <span className="message error">Something went wrong!</span>}
      </form>
      <Cancel className='closeEnteringForm' onClick={() => setShowLogin(false)} />
    </div>
  );
};

export default Login;