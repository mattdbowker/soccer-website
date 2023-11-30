
document.addEventListener("DOMContentLoaded", getData2);


function getData2(){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", dropdown)
    xhr.responseType = "json"
    xhr.open("GET", "http://10.16.14.104/~matt/data-service/data-service.php");
    xhr.send();
}


function dropdown() {
    let data = this.response;

    // changing dropdown link for each tactic
    div = document.querySelector(".dropdown-content");
    for (let i=0; i < data.length; i++) {
        a = document.createElement("a");
        div.appendChild(a);
        a.innerHTML = data[(i)]["name"];
        a.target = "_blank";
        a.href = data[(i)]["link"];
    }
}
