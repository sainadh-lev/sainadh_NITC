const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

var admins=[{
    Email:"ad1",
    password:"adp1"
},{
    Email:"ad2",
    password:"adp2"
},
{
    Email:"ad3",
    password:"adp3"
},
{
    Email:"ad4",
    password:"adp4"
}];

var posts=[];

var newadmin={
    Email:"ad1",
    password:"adp1"
}

var newpost = {
    tittle: "one",
    matter: "matterone"
}

admins.push(newadmin);
posts.push(newpost);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",function (req,res) {
    res.render("login",{ });
});

app.post("/",function(req,res) {
    var Email=req.body.Email;
    var password=req.body.password;
    // console.log(Email);
    // console.log(password);
    for(var i=0;i<posts.length;i++) {
        if(admins[i].password==password&&admins[i].Email==Email) {
            res.render("main",{posts:posts });
            break;
        }
        if(i===posts.length-1) {
            res.redirect("/");
        }
    }
    
});

app.get("/main",function(req,res) {
    res.render("main",{posts:posts });
});

app.get("/compose",function(req,res) {
    res.render("compose",{ });
});

app.post("/main",function(req,res) {
    var search=req.body.search;
    for(var i=0;i<posts.length;i++) {
        if(posts[i].tittle==search) {
            res.render("search_post",{tittle:posts[i].tittle,matter:posts[i].matter});
        }
    }
    res.redirect("/main");
});

app.post("/compose",function(req,res) {
    var new_post = {
        tittle: req.body.tittle,
        matter: req.body.matter
    }
    posts.push(new_post);
    res.redirect("/main");
});






app.listen(4000, function() {
    console.log("working!");
  });