// IMPORT PACKAGES
// Here you should import the required packages for your Express app: `express` and `morgan`
const express = require('express');
const morgan = require('morgan');
const path =require('path');
const fs = require('fs');

// CREATE EXPRESS APP
// Here you should create your Express app:
const app = express();
const PORT = 5005;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// MIDDLEWARE
// Here you should set up the required middleware:
// - `express.static()` to serve static files from the `public` folder
// - `express.json()` to parse incoming requests with JSON payloads
// - `morgan` logger to log all incoming requests
app.use(express.static('public'));
app.use(morgan('dev')); // logs to console
app.use(morgan('combined', { stream: accessLogStream })); // logs to file
app.use(express.json());

// ROUTES
// Start defining your routes here:
app.get('/', (req, res) => { 
    const filePath = path.join(__dirname, 'views', 'home.html');
    res.sendFile(filePath);
}); 
app.get('/blog', (req, res) => { 
    const filePath = path.join(__dirname, 'views', 'blog.html');
    res.sendFile(filePath);
}); 

app.get('/api/projects', (req, res) => { 
    const filePath = path.join(__dirname, 'data', 'projects.json');
    res.sendFile(filePath);
}); 
app.get('/api/articles', (req, res) => { 
    const filePath = path.join(__dirname, 'data', 'articles.json');
    res.sendFile(filePath);
app.use((req, res, next) => {
    const filePath = path.join(__dirname, 'views', 'not-found.html');
    res.status(404).sendFile(filePath);
});
});

// START THE SERVER
// Make your Express server listen on port 5005:
app.listen(5005, () => {
  console.log('Servidor en http://localhost:5005');
});