const fs = require("fs");

const file = "database.json";


if (!fs.existsSync(file)) {

    fs.writeFileSync(
        file,
        JSON.stringify({
            history: [],
            bookmarks: []
        })
    );

}


function read(){

    return JSON.parse(
        fs.readFileSync(file)
    );

}



function write(data){

    fs.writeFileSync(
        file,
        JSON.stringify(data,null,2)
    );

}



module.exports = {

    read,
    write

};
