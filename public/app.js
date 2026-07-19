let tabs=[];


function go(){

let url=document.getElementById("url").value;


document.getElementById("page").src=
"/browse?url="+encodeURIComponent(url);


}


function newtab(){

tabs.push("");

alert(
"New tab created: "+tabs.length
);

}


function back(){

history.back();

}
