
/*
  
  Use JS to render content in your page based on data that is stored in a global array or dictionary variable.

*/

// global arrays
//var names = ["4-4-3 Tactic", "4-2-3-1 Tactic", "3-4-3 Tactic", "4-1-2-1-2 Tactic" ];
//var links = ["433.html", "4231.html", "343.html", "41212.html"];

// changed to API
//var data = [  { "name" : ... ,  "link" : ... } ,  { "name" : ... , "link" : ...} ]

document.addEventListener("DOMContentLoaded", getData);

function getData(){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", scroller)
    xhr.responseType = "json"
    xhr.open("GET", "http://10.16.14.104/~matt/data-service/data-service.php");
    xhr.send();
}


function scroller() {
    let data = this.response;
    let currentIndex = 0

    // changing head link for picture
    a = document.createElement("a");
    link_div = document.querySelector(".tactic-section");
    link_div.insertBefore(a, link_div.firstChild); 
    a.setAttribute("class", "tactic-name");
    a.innerHTML = data[(currentIndex)]["name"]; // loop!!!!
    a.target = "_blank";
    a.href = data[(currentIndex)]["link"];

    // add picture
    img = document.createElement("img");
    div_container = document.querySelector(".image-container");
    div_container.appendChild(img);
    img.setAttribute("class", "tactic-image");
    img.src = data[currentIndex]["image"];
    
    // control left button
    const nextButtonL = document.getElementById("leftArrow");
    nextButtonL.addEventListener("click", function() {

        currentIndex = (currentIndex + 3) % data.length;
        img.src = data[currentIndex]["image"];

        document.querySelector(".tactic-name").innerHTML = data[(currentIndex) % data.length]["name"]; 
        document.querySelector("a.tactic-name").href = data[(currentIndex) % data.length]["link"]; 
    });

    // control right button
    const nextButtonR = document.getElementById("rightArrow");
    nextButtonR.addEventListener("click", function() {

        currentIndex = (currentIndex + 1) % data.length;
        img.src = data[currentIndex]["image"];

        document.querySelector(".tactic-name").innerHTML = data[(currentIndex) % data.length]["name"];
        document.querySelector("a.tactic-name").href = data[(currentIndex) % data.length]["link"];
    })

}



/*
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".tactic-image");
    let currentIndex = 0;

    const nextButtonL = document.getElementById("leftArrow");
    nextButtonL.addEventListener("click", function() {
        images[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 3) % images.length;
        images[currentIndex].style.display = "block";

        document.querySelector(".tactic-name").innerHTML = names[(currentIndex) % images.length]; // accessing global array
        document.querySelector("a.tactic-name").href = links[(currentIndex) % images.length]; // accessing global array
    });

    const nextButtonR = document.getElementById("rightArrow");
    nextButtonR.addEventListener("click", function() {
        images[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 1) % images.length
        images[currentIndex].style.display = "block";

        document.querySelector(".tactic-name").innerHTML = names[(currentIndex) % images.length]; // accessing global array
        document.querySelector("a.tactic-name").href = links[(currentIndex) % images.length]; // accessing global array
    })

}); */









