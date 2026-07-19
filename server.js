const express = require("express");

const browser = require("./browser");

const database = require("./database");


const db = database.db;


const app = express();


app.use(express.json());

app.use(express.static("public"));



(async()=>{

await database.init();

await browser.start();

})();



app.get("/browse", async(req,res)=>{


try{


let url=req.query.url;


if(!url.startsWith("http")){

url="https://"+url;

}



db.data.history.push({

url:url,

time:new Date()

});


await db.write();



let html = await browser.open(url);


res.send(html);



}catch(e){

res.status(500).send(
"Browser error: "+e.message
);

}


});





app.get("/history",async(req,res)=>{


res.json(
db.data.history.reverse()
);


});






app.get("/bookmarks",async(req,res)=>{


res.json(
db.data.bookmarks
);


});






app.post("/bookmark",async(req,res)=>{


db.data.bookmarks.push(
req.body.url
);


await db.write();


res.json({
success:true
});


});





app.listen(8000,()=>{


console.log(
"Koyeb Browser running on port 8000"
);


});
