const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./routes/user.routes');
const postRoute = require('./routes/post.routes');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello!'));

// Use Routes
app.use('/api/post', postRoute);
app.use('/api/user', userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running n port ${port}`);
})