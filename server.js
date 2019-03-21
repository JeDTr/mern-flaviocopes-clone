const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

const userRoute = require('./routes/user.routes');
const postRoute = require('./routes/post.routes');
const tagRoute = require('./routes/tag.routes');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Cors Config
// const corsOptions = {
//     origin: 'http://localhost:3000'
// }
// app.use(cors(corsOptions));
app.use(cors())

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/tag', tagRoute);

// Server static assets if in production
// if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/client/build'));
    app.get('/', (req, res) => {
        res.send('Hello World' + path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
    // app.get('*', (req, res) => {
    //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    // })
// }

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running n port ${port}`);
    console.log(process.env.NODE_ENV);
})