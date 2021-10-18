import React, {useEffect, useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {Room, Star} from '@material-ui/icons';
import axios from 'axios';
import {format} from 'timeago.js';

function App() {
  const currentUser = 'john 2';
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
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

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  }

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle='mapbox://styles/alexko89/ckuvznhix095f17qg59dua5it'
      >
        {pins?.map(pin => (
          <React.Fragment key={pin._id}>
            <Marker
              latitude={pin.lat}
              longitude={pin.long}
            >
              <Room
                style={{color: currentUser === pin.username ? 'green' : 'blue', cursor: 'pointer'}}
                onClick={() => handleMarkerClick(pin._id)}
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
                  <Star className="star"/>
                  <Star className="star"/>
                </div>

                <label>Information</label>
                <span className="username">Created by <b>{pin.username}</b></span>
                <span className="date">{format(pin.createdAt)}</span>
              </div>
            </Popup>}
          </React.Fragment>
            ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
