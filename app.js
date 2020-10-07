const express = require("express");
// putting api into practice using https
const https = require("https");
// we need body parser to get the data from the form
const bodyParser= require("body-parser");
const app =express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
// responding with html files
  res.sendFile(__dirname + "/index.html");


})
app.post("/",function(req,res){


// getting data from form
  const query = req.body.cityName;
  // API PART
  const apikey="24322e1e2bfad34b2acc3675ce6ebf21";
  const units="matric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey + "&units="+units
  https.get(url, function(response){
  console.log(response.statusCode);
  // parsing json data
  response.on("data", function(data){
    const weatherdata =JSON.parse(data);

    const temp = weatherdata.main.temp
    const weatherdes = weatherdata.weather[0].description
    const weathericon = weatherdata.weather[0].icon
    const imageURL ="http://openweathermap.org/img/wn/"+ weathericon +"@2x.png";
    console.log(temp)
    console.log(weatherdes)
    // we can't use send more than one so we are using write
    res.write("<p>the current weather is</p>"+weatherdes);
    res.write("<h1>the Temp in paris is "+temp + "degree celcius</h1>");
    res.write("<img src="+imageURL+">")
    res.send()
  })
  })
})





// create the server
app.listen(3000, function(){
  console.log("server is running on 3000.");
});
