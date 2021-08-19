// const { json } = require("express");
const express=require("express");
const request=require("request");
const parser=require("body-parser");
const app=express();

// app.use(parser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/", function(req, res){
    const city=req.body.cityName
    let cityname=req.body.cityName
    const apiKey='543c762d659ecb301bd6305cfae9350f'
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ cityname +"&APPID="+ apiKey +""

    https.get(url, function(resp){
        resp.on("data", (data)=>{
        const weatherData=JSON.parse(data)
        const iconUrl="http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"
        res.write("<p>"+weatherData.weather[0].description+"</p>")
        res.write("<img src="+iconUrl+">")
        res.send()
        });        
    });
});
app.listen(8000, ()=>{
    console.log("Running on port 8000.")
}); 