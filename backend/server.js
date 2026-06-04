const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

dotenv.config();

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next();
});

// routes
app.use('/api/tasks', tasksRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen on port 5000
        app.listen(process.env.PORT, () => {
        console.log(`Connected to DB & Server is listening on port ${process.env.PORT}`);
})
    })
    .catch((error) => {
        console.log(error);
    });






