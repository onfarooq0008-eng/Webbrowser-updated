const sqlite3=require("sqlite3").verbose();

const db=new sqlite3.Database("./koyeb-browser.db");


db.serialize(()=>{

db.run(`
CREATE TABLE IF NOT EXISTS history(
id INTEGER PRIMARY KEY,
url TEXT,
time DATETIME DEFAULT CURRENT_TIMESTAMP
)`);


db.run(`
CREATE TABLE IF NOT EXISTS bookmarks(
id INTEGER PRIMARY KEY,
url TEXT
)`);


});


module.exports=db;
