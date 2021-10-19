import React, {useEffect, useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {Room, Star} from '@material-ui/icons';
import axios from 'axios';
import {format} from 'timeago.js';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {
  const storage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(storage.user);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 46,
    longitude: 17,
    zoom: 4
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins');
        setPins(res.data);
      } catch (e) {
        console.log(e)
      }
    }
    getPins();
  }, [])

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({...viewport, latitude: lat, longitude: long})
  }

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({lat, long});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      description,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    }
    
    try {
      const res = await axios.post('/pins', newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogout = () => {
    storage.removeItem('user');
    setCurrentUser(null);
  }

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle='mapbox://styles/alexko89/ckuvznhix095f17qg59dua5it'
        onDblClick={handleAddClick}
        transitionDuration={'100'}
      >
        {pins?.map(pin => (
          <React.Fragment key={pin._id}>
            <Marker
              latitude={pin.lat}
              longitude={pin.long}
              offsetTop={-10}
              offsetLeft={-10}
            >
              <Room
                style={{color: currentUser === pin.username ? 'green' : 'blue', cursor: 'pointer'}}
                onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
              />
            </Marker>

            {pin._id === currentPlaceId && <Popup
              latitude={pin.lat}
              longitude={pin.long}
              closeButton={true}
              closeOnClick={false}
              anchor="right"
              onClose={() => setCurrentPlaceId(null)}
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{pin.title}</h4>
                <label>Review</label>
                <p className="description">{pin.description}</p>
                <label>Rating</label>
                <div className="stars">
                  {Array.from(Array(pin.rating), (_, i) => <Star className="star" key={i} />)}
                </div>

                <label>Information</label>
                <span className="username">Created by <b>{pin.username}</b></span>
                <span className="date">{format(pin.createdAt)}</span>
              </div>
            </Popup>}
          </React.Fragment>
            ))}

        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="right"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Enter a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit" >Add place</button>
              </form>
            </div>
          </Popup>
        )}
        <div className="buttons-container">
          {currentUser
            ? <button className={'button button-logout'} onClick={handleLogout}>Logout</button>
            : <>
              <button className={'button button-login'} onClick={() => setShowLogin(true)}>Login</button>
              <button className={'button button-register'} onClick={() => setShowRegister(true)}>Register</button>
            </>
          }
        </div>
        {showRegister && <Register setShowRegister={setShowRegister}/>}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            storage={storage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
