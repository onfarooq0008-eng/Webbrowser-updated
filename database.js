const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");


const adapter = new JSONFile("database.json");


const db = new Low(adapter,{
    history: [],
    bookmarks: []
});


async function init(){

    await db.read();

    db.data ||= {
        history: [],
        bookmarks: []
    };

    await db.write();

}


module.exports = {
    db,
    init
};
