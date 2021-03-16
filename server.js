// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
function listening()
{
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}
const server = app.listen(port, listening);


// POST ROUTE to save the weather and user data
app.post('/addData', addData);
function addData(req, res)
{
    // console.log('3 ', req.body);     /// for debugging
    
    // add (date, temprature, content, weather, city) properties to the pojectData object
    projectData.date = req.body.date;
    projectData.temprature = req.body.temprature;
    projectData.content = req.body.content;
    projectData.weather = req.body.weather;
    projectData.city = req.body.city;

    res.send(projectData);
    console.log('4 ', projectData);
}

// GET ROUTE to retrieve the weather and user data from the projectData object
app.get('/getAllData', function(req, res){
    res.send(projectData);
    // console.log('6 ', projectData);     /// for debugging
});
