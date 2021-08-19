// const { json } = require("express");
const express=require("express");
const request=require("request");
const parser=require("body-parser");
const app=express();

app.use(parser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/", function(req, res){
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const emailInput=req.body.emailInput;
    res.write(firstName);
    res.write(lastName);
    res.write(emailInput);
    res.send();
});
app.listen(8000, ()=>{
    console.log("Running on port 8000.")
}); 