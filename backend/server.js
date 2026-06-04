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

// Health check endpoint for self-ping
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        message: 'Server is running',
        timestamp: new Date().toISOString() 
    });
});

// routes
app.use('/api/tasks', tasksRoutes);
app.use('/api/user', userRoutes);

// Self-ping function to keep Render backend alive
const selfPing = () => {
    const backendUrl = process.env.BACKEND_URL;
    
    if (backendUrl) {
        setInterval(async () => {
            try {
                const https = require('https');
                const http = require('http');
                const protocol = backendUrl.startsWith('https') ? https : http;
                
                protocol.get(`${backendUrl}/api/health`, (res) => {
                    console.log(`Self-ping: Status ${res.statusCode} at ${new Date().toISOString()}`);
                }).on('error', (err) => {
                    console.error('Self-ping error:', err.message);
                });
            } catch (error) {
                console.error('Self-ping failed:', error.message);
            }
        }, 14 * 60 * 1000); // Ping every 14 minutes
        
        console.log('Self-ping enabled: Server will ping itself every 14 minutes');
    } else {
        console.log('Self-ping disabled: BACKEND_URL not set');
    }
};

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen on port
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB & Server is listening on port ${process.env.PORT}`);
            
            // Start self-ping after server is running
            selfPing();
        });
    })
    .catch((error) => {
        console.log(error);
    });






