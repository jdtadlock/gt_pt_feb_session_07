const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User');
// const api_routes = require('./routes/api_routes');
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://JD:password123@ds117605.mlab.com:17605/test_db', { useNewUrlParser: true });
mongoose.Promise = Promise;

const app = express();

// Tell Express where our front end folder is
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// api_routes(app);

// app.get('/user', (req, res) => {
//   res.send('Hello from the backend!');
// });

// User.find({}).then(users => console.log(users));

app.put('/user', (req, res) => {
  User.findOneAndUpdate({email: req.body.email}, {
    name: req.body.name
  }, {new: true}).then(user => {
    res.send(user);
  })
});

// STEP #12
app.get('/user', (req, res) => {
  User.findOne({email: req.query.email})
    .then(user => {
      if ( user ) {
        res.send(user);
      } else res.status(403);
    });
});

// STEP #8
app.post('/user', (req, res) => {
  // Get info from the request
  // console.log(req.body); // email: 'test@test.com'

  // STEP #9
  User.findOne({email: req.body.email})
    .then(user => {
      // User doesn't exist
      if ( !user ) {
        User.create({ email: req.body.email})
          then(new_user => {
            res.send(new_user);
          });
      } 
      // If user already exists
      else {
        res.send(user);
      }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));