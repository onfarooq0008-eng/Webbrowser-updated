const express = require("express");

const browser = require("./browser");

const database = require("./database");


const app = express();


app.use(express.json());

app.use(express.static("public"));



(async()=>{

await browser.start();

})();




app.get("/browse", async(req,res)=>{


try{


let url=req.query.url;


if(!url.startsWith("http")){

url="https://"+url;

}



let db=database.read();


db.history.push({

url:url,

time:new Date()

});


database.write(db);



let html=await browser.open(url);


res.send(html);



}catch(e){

res.status(500).send(
e.message
);

}


});






app.get("/history",(req,res)=>{


let db=database.read();


res.json(
db.history.reverse()
);


});






app.get("/bookmarks",(req,res)=>{


let db=database.read();


res.json(
db.bookmarks
);


});






app.post("/bookmark",(req,res)=>{


let db=database.read();


db.bookmarks.push(
req.body.url
);


database.write(db);


res.json({
success:true
});


});







app.listen(8000,()=>{

console.log(
"Koyeb Browser V2 running"
);

});
