
document.addEventListener("DOMContentLoaded", function() {
    let CLASSLIST = document.querySelector("#seeMore");
    CLASSLIST.classList.add("js-button");
    const seeMoreText = document.getElementById("js-button");
    const seeMoreList = document.getElementById("seeMore");

    seeMoreText.addEventListener("click", function() {
        let listNode = document.createElement("li");  

        //let newList = document.querySelector("#seeMore");
        //newList.appendChild(listNode);

        // Create the iframe element
        const iframeElement = document.createElement("iframe");
        iframeElement.width = "560";
        iframeElement.height = "315";
        if (document.title === "433 Formation") {
            iframeElement.src = "https://www.youtube.com/embed/lvkkYJ2YW-A?si=m4ZYERVzPqQnETaS";
        }
        else if (document.title === "4231 Formation") {
            iframeElement.src = "https://www.youtube.com/embed/FvGKMjMVwAo?si=YXPyda6cxxRi84tX";
        }
        else if (document.title === "343 Formation") {
            iframeElement.src = "https://www.youtube.com/embed/hfNDVz1LdMI?si=YmCLvA81CM9r2YCX";
        }
        else if (document.title === "41212 Formation") {
            iframeElement.src = "https://www.youtube.com/embed/jwqhkRqr4kw?si=nee-Sjr6ePPJFy3O";
        }
        iframeElement.title = "YouTube video player";
        iframeElement.frameBorder = "0";
        iframeElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframeElement.allowFullscreen = true;
    

        // Append the iframe element to the list item
        listNode.appendChild(iframeElement);

        // Append the list item to the <ul>
        seeMoreList.appendChild(listNode);

        /* Append wiki article
        let textNode = document.createTextNode("Wiki Article:");
        seeMoreList.appendChild(textNode);*/
        
        // Remove the first <li> (button) from the list
        const firstListItem = seeMoreList.querySelector("li");
        if (firstListItem) {
            seeMoreList.removeChild(firstListItem);
        }
    });
});