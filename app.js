const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];
let workitem  = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  let today = new Date(); 
  let options ={
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);
  res.render("list",{kindofday: day, newListitem: items});
});

app.post("/",function(req,res){
     let item = req.body.newitem;

    if(req.body.list === "Work"){
      workitem.push(item);
      res.redirect("/work");
    }else{
      items.push(item);
      res.redirect("/");
    }
    
});

app.get("/work", function(req, res){
  res.render("list",{kindofday: "Work List", newListitem: workitem});
});
app.listen(3000);