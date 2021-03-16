/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&units=metric&appid=db8cdd835983c8e7167b25a57dc18945";



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'/'+ d.getDate()+'/'+ d.getFullYear();

// Add an Event 'click' to the button
document.getElementById('generate').addEventListener('click', performAction);
// The callback function of the eventlistener
function performAction()
{
    // get the zipcode and the feelings values
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // if the zipcode was empty
    if (zipCode === "") {
        alert('Message: Enter zip code!');
    }
    else{
        // make API call to OpenWeatherMap
        getTemprature(baseURL, zipCode, apiKey)

        .then(function(data){
            // if the data retrieved was valid (code == 200)
            if (data.cod == 200) {
                // make a POST request to add the API data, as well as data entered by the user, to the app
                postData('/addData', {date:newDate, temprature:data.main.temp, content:feelings, weather:data.weather, city:data.name})
                
                .then(()=>{
                    // make a GET request to retrieve the stored data to update the page UI dynamically
                    updateUI();
                });
            }
            // if the data retrieved was valid (code != 200) (invalid zipcode)
            else{
                alert(`Message:  ${data.message}`);
            }
        });
    }
    
}

// async function to get the weather data based on the zipcode that was entered
const getTemprature = async (baseURL, zipCode, key)=>
{
    const url = baseURL+zipCode+key;
    console.log('url: ', url);
    // make a GET request to the OpenWeatherMap API 
    const request = await fetch(url);

    try {
        const data = await request.json();
        console.log('1 ', data);
        return data;

    } catch (error) {
        // appropriately handle any errors happened
        console.log('Error: ', error);
    }
}

// async function to add the API and user data to the app 
const postData = async (url="", data={})=>
{
    // console.log('2 ', data);    /// for debugging
    // make a POST request to save data
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log('5 ', newData);
        return newData;
    } catch (error) {
        // appropriately handle any errors happened
        console.log('Error: ', error);
    }
}

// async function to update the webpage UI dynamically
const updateUI = async ()=>
{
    // make a GET request to retrieve the stored data
    const request = await fetch('/getAllData');

    try {
        const allData = await request.json();
        // console.log('7 ', allData);    /// for debugging

        // Get the required divs to Update the UI dynamically
        document.getElementById('city').innerHTML = '<span class="desc">City:</span> ' + allData.city; 
        document.getElementById('date').innerHTML = '<span class="desc">Date:</span> ' + allData.date; 
        document.getElementById('temprature').innerHTML = '<span class="desc">Temprature:</span> ' +  allData.temprature + " &#176;C"; 
        document.getElementById('content').innerHTML = '<span class="desc">Feelings:</span> ' +  allData.content; 
        document.getElementById('description').innerHTML = '<span class="desc">Weather description:</span> ' + allData.weather[0].description; 

    } catch (error) {
        // appropriately handle any errors happened
        console.log('Error: ', error);        
    }
}