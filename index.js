const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.use(express.urlencoded({ extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : "1a",
        username: "adityacgtripathi",
        content : "Never Give Up!",
    },
    {
        id : "1b",
        username: "scg",
        content : "Hardwork is the Key to Success",
    },
    {
        id : "1c",
        username: "loggereye",
        content : "CG is OP",
    },
];


app.get("/", (req,res)=>{
    res.send("Server Working Well");
});
app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id ===p.id);
    res.render("show.ejs", {post});
});
app.get("/posts",(req,res)=>{
    res.render("index.ejs", { posts});
});
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});
app.post("/posts", (req,res)=>{
    let {username, content} = req.body;
    posts.push({ username, content});
    //res.send("Adding Blog to DB");
    res.redirect("http://localhost:8080/posts");
});
app.listen(port,()=>{
    console.log("Server Initiated!!!!");
    console.log("App listening to port : ", port);
});