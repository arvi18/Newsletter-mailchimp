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
    const api_id=process.env.api_id;
    const api_key=process.env.api_key;
    const url="https://us5.api.mailchimp.com/3.0/lists/"+ api_id;
    const options={
        method:"POST",
        auth:"arvi_:"+api_key
    }
    const request=https.request(url, options, (r)=>{
        r.on("data", ()=>{
            console.log(r)
            if (r.statusCode===200){
                res.sendFile(__dirname+"/success.html")

            }else{
                res.sendFile(__dirname+"/failure.html")
            }
        });
    });
    request.write(jsonData);
    request.end();
});
app.listen(8000, ()=>{
    console.log("Running on port 8000.")
});