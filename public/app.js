function go(){


let url=document.getElementById("url").value;


document.getElementById("page").src =
"/browse?url="+encodeURIComponent(url);


}





function back(){

history.back();

}





async function historyPage(){


let r=await fetch("/history");


let data=await r.json();


alert(
JSON.stringify(data,null,2)
);


}





async function bookmark(){


let url=document.getElementById("url").value;


await fetch("/bookmark",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

url:url

})


});


alert("Saved");

}
