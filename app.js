// const { json } = require("express");
const express=require("express");
const request=require("request");
const https=require("https");
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
    const data={
        members:[
            {
                email_address:emailInput,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us5.api.mailchimp.com/3.0/lists/a4e55816bb"
    const options={
        method:"POST",
        auth:"arvi_:a869d02ebe6bfcb4907db74c78f15c63-us5"
    }
    const request=https.request(url, options, (r)=>{
        r.on("data", ()=>{
            console.log(JSON.parse(data))
        });
    });
    request.write(jsonData);
    request.end();
});
app.listen(8000, ()=>{
    console.log("Running on port 8000.")
}); 