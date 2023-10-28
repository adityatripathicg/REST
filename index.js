const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodoverride = require('method-override');
app.use(express.urlencoded({ extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodoverride('_method'));

let posts = [
    {
        id : uuidv4(),
        username: "adityacgtripathi",
        content : "Never Give Up!",
    },
    {
        id : uuidv4(),
        username: "scg",
        content : "Hardwork is the Key to Success",
    },
    {
        id : uuidv4(),
        username: "loggereye",
        content : "CG is OP",
    },
];


app.get("/", (req,res)=>{
    res.send("Server Working Well");
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs", { posts});
});
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});
app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    //res.send("DELETE SUCCESS");
    res.redirect("/posts");
});
app.get("/posts/desc/:id", (req,res)=>{
    let {id} = req.params;
    console.log(id);
    //res.send("Request Working");
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", { post });
});
app.post("/posts", (req,res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({ id, username, content});
    //res.send("Adding Blog to DB");
    res.redirect("http://localhost:8080/posts");
});
app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});


app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    //console.log(id);
    //console.log(newcontent);
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    console.log(post);
    //res.send("Patch Request Working");
    res.redirect("/posts");
});


app.listen(port,()=>{
    console.log("Server Initiated!!!!");
    console.log("App listening to port : ", port);
});