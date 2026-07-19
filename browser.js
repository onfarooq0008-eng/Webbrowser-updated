const {chromium}=require("playwright");


let browser;


async function start(){

browser=await chromium.launch({

headless:true,

args:[
"--no-sandbox",
"--disable-dev-shm-usage",
"--disable-gpu"
]

});

}


async function open(url){

let context=
await browser.newContext({

storageState:"cookies.json"

});


let page=await context.newPage();


await page.goto(url,{
waitUntil:"domcontentloaded",
timeout:30000
});


await context.storageState({
path:"cookies.json"
});


return page.content();

}


module.exports={
start,
open
};
