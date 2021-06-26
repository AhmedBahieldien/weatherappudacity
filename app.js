const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=dc5c60147abd67863989261ff6b8245d';
const unit = '&units=metric'

let date = new Date();
let newDate = date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear();
document.getElementById('checkwaether').addEventListener('click', performAction);


function performAction(e) {
  e.preventDefault();
  const newZip = document.getElementById('zipcode').value;
  const content = document.getElementById('feeling').value;
  if(newZip.length == 0)
	{
		alert("Enter zip code");
	}
  else{
    
    getWeather(baseURL, newZip, apiKey)
      .then(function (userData) {
      
        postData('/add', { date: newDate, temp: userData.main.temp, content })
      }).then(function (newData) {
      
       updateUI()
     })
  }
}


const getWeather = async (baseURL, newZip, apiKey) => {
  
  const res = await fetch(baseURL + newZip + apiKey + unit);
  try {
    
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}


const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    document.getElementById('newdate').innerHTML = "<span style='color: green;'>" + allData.date+ "</span>";
    document.getElementById('weather').innerHTML =  "<span style='color: green;'>" + allData.temp+ "</span>";
    document.getElementById('feelings').innerHTML =  "<span style='color: green;'>" + allData.content+ "</span>";
  }
  catch (error) {
    console.log("error", error);
  }
};
