## Description
This is frontend part for [google-maps-traveller](https://github.com/AlexKobiliansky/gm-traveller-backend.git) project which is based on MERN stack.

Google maps application, something like lightweight social network, where user can log in, create own pins on the world map and share his impressions of the places he visited.

### Main features
* Registration, Login, Logout
* creating pins on the map with ability to left description and rating for the place
* seeing pins of other users, which are registered in App

### Technologies and instruments
#### Front-end
* [Material-ui](https://material-ui.com/)
* [Axios](https://www.npmjs.com/package/axios)
* [React Map GL](https://visgl.github.io/react-map-gl/)
#### Back-end
* [Express](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [MongoDB](https://www.mongodb.com/)
* [bcrypt](https://www.npmjs.com/package/bcrypt)

**Note!** You must rename file *.env.example* to *.env* and fill needed data!

To create pin you must login to application. Pin creates by double click in any place of the map. To see details just click on the pin marker and it will be opened popup with title, description, rating and info about user which has left that pin.