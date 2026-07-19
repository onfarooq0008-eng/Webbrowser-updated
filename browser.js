const { chromium } = require("playwright");
const fs = require("fs");

let browser;


async function start(){

browser = await chromium.launch({

headless:true,

args:[
"--no-sandbox",
"--disable-dev-shm-usage",
"--disable-gpu",
"--no-zygote",
"--disable-software-rasterizer"
]

});

}



async function open(url){


let options = {};


if(fs.existsSync("cookies.json")){

options.storageState = "cookies.json";

}



let context = await browser.newContext(options);


let page = await context.newPage();



await page.goto(url,{

waitUntil:"domcontentloaded",

timeout:30000

});



await context.storageState({

path:"cookies.json"

});



let html = await page.content();


await page.close();

await context.close();


return html;


}



module.exports={
start,
open
};
