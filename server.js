const express=require("express");
const browser=require("./browser");
const db=require("./database");


const app=express();


app.use(express.json());
app.use(express.static("public"));


browser.start();


app.get("/browse",async(req,res)=>{


let url=req.query.url;


if(!url.startsWith("http"))
url="https://"+url;


db.run(
"INSERT INTO history(url) VALUES(?)",
[url]
);


let html=await browser.open(url);


res.send(html);


});



app.get("/history",(req,res)=>{

db.all(
"SELECT * FROM history ORDER BY id DESC",
(err,data)=>res.json(data)
);


});


app.get("/bookmarks",(req,res)=>{

db.all(
"SELECT * FROM bookmarks",
(err,data)=>res.json(data)
);

});


app.post("/bookmark",(req,res)=>{

db.run(
"INSERT INTO bookmarks(url) VALUES(?)",
[req.body.url]
);

res.json({
ok:true
});

});



app.listen(8000,()=>{

console.log(
"Koyeb Browser V2 running"
);

});
