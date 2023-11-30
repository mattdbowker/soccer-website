
let playerImages = []; // Dict to store player images and positions

document.addEventListener("DOMContentLoaded", function() {
    let canvas = document.querySelector("canvas");

    getData();
    drawField(canvas);
    drawBoxes(canvas);
    randomPlayer(canvas, playerImages);
});


function drawField(canvas) {
    let context = canvas.getContext("2d");

    const fieldWidth = 500
    const fieldHeight = 750
    //  canvas: width="1000" height="750"

    // Draw field
    context.fillStyle = "green";
    context.fillRect(100, 0, fieldWidth, fieldHeight);

    context.beginPath();
    context.moveTo(100, 375);
    context.lineTo(600, 375);
    context.strokeStyle = "white";
    context.lineWidth = 2;
    context.stroke()

    // draw boundary lines
    context.strokeStyle = "white";
    context.lineWidth = 2;
    context.strokeRect(105, 5, fieldWidth - 10, fieldHeight - 10);


    // Draw center circle
    context.beginPath();
    context.arc(350, fieldHeight / 2, 50, 0, Math.PI * 2);
    context.stroke();

    context.beginPath();
    context.arc(350, fieldHeight / 2, 1, 0, Math.PI * 2);
    context.stroke();
    


    // Draw penalty areas at the top and bottom
    const penaltyAreaWidth = 250;
    const penaltyAreaHeight = 100;

    // Top penalty area
    context.strokeRect(350 - (fieldWidth / 4), 5, penaltyAreaWidth, penaltyAreaHeight);

    // Bottom penalty area
    context.strokeRect(350 - (fieldWidth / 4), fieldHeight - 105, penaltyAreaWidth, penaltyAreaHeight);

    // Draw goals at the top and bottom of the field
    const goalWidth = 100;
    const goalHeight = 15;

    // Top goal
    context.strokeRect(350 - (fieldWidth / 10), 5, goalWidth, goalHeight);

    // Bottom goal
    context.strokeRect(350 - (fieldWidth / 10), fieldHeight - 20, goalWidth, goalHeight);

}


function drawBoxes(canvas) {

    const fieldWidth = 500
    const fieldHeight = 750

    let context = canvas.getContext("2d");
    let box = 70;

    context.fillStyle = "grey";
    // att
    context.fillRect(150, 125, box, box);
    context.fillRect(480, 125, box, box);
    context.fillRect(315, 50, box, box);

    // mid
    context.fillRect(150, 325, box, box);
    context.fillRect(480, 325, box, box);
    context.fillRect(315, 325, box, box);

    // def
    context.fillRect(120, 500, box, box);
    context.fillRect(250, 500, box, box);
    context.fillRect(380, 500, box, box);
    context.fillRect(510, 500, box, box);

    context.fillRect(315, 650, box, box);

}


function getData(){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", randomPlayer)
    xhr.responseType = "json"
    xhr.open("GET", "http://10.16.14.104/~matt/data-players/data-players.php");
    xhr.send();
}


// Define an array to keep track of selected player indices
let selectedPlayerIndices = [];

function pickPlayer(playerdata) {
    // Check if all players have been selected
    if (selectedPlayerIndices.length === playerdata.length) {
        // If all players have been selected, reset the array to start over
        selectedPlayerIndices = [];
    }

    // Generate a random index that has not been selected before
    let index;
    do {
        index = Math.floor(Math.random() * playerdata.length);
    } while (selectedPlayerIndices.includes(index));

    // Add the selected index to the array
    selectedPlayerIndices.push(index);

    const player = playerdata[index];

    const img = document.createElement("img");
    img.src = "players/" + player["image"];

    return {
        img: img,
        name: player["name"],
        position: player["position"]
    };
}


function randomPlayer() {

    let playerdata = this.response

    const pressButton = document.querySelector(".generate-button");
    const div = document.querySelector(".picture-container");

    pressButton.addEventListener("click", function() {
        // Select random picture
        //const randomIndex = Math.floor(Math.random() * playerdata.length);
        const randomPlayerInfo = pickPlayer(playerdata);
        const img = randomPlayerInfo.img;//document.createElement("img");
       //img.src = "players/" + playerdata[randomIndex]["image"];
        div.appendChild(img);

        startP = document.getElementById("startP");
        startP.remove();
        pressButton.remove();

        p2 = document.createElement("p");
        div.appendChild(p2);
        p2.setAttribute("class", "pickAgain");
        p2.innerHTML = "Name: " + randomPlayerInfo.name + ", Position: " + randomPlayerInfo.position;
  

        p1 = document.createElement("p");
        div.appendChild(p1);
        p1.setAttribute("class", "pickAgain");
        p1.innerHTML = "Pick a position!";


        const canv = document.getElementById("myCanvas");
        const imgBox = document.createElement("img");
        imgBox.style.position = "absolute";
        imgBox.style.width = 100 + "px";

        let gameOver = false;

        // Add a reference to the "Game Over" text element
        const gameOverText = document.createElement("p");
        div.appendChild(gameOverText);
        gameOverText.setAttribute("class", "playAgain");

        // Add click event listener to the canvas
            canv.addEventListener("click", function(event) {

                if (gameOver) {
                    return;
                }

                // Get the coordinates of the click relative to the canvas
                const x = event.clientX - canv.getBoundingClientRect().left - 37.5;
                const y = event.clientY - canv.getBoundingClientRect().top - 37.5;

                playerImages.push({
                    src: img.src,
                    x: x,
                    y: y,
                });
                console.log(playerImages);

                drawPlayers( document.querySelector("canvas"), playerImages );

                // Check if the game is over after adding a player
                if (playerImages.length === 11) {
                    // Display "Game Over" text
                    gameOverText.style.display = "block";

                    // Clear other text
                    img.remove();
                    p1.innerHTML = "";
                    p2.innerHTML = "";
                    pressButton.remove();

                    gameOverText.innerHTML = "Game Over";

                    // Set the game over flag to true
                    gameOver = true;
                } else {
                    // Generate another random player for the next round
                    const randomPlayerInfo = pickPlayer(playerdata);
                    p2.innerHTML = "Name: " + randomPlayerInfo.name + ", Position: " + randomPlayerInfo.position;
                    img.src = randomPlayerInfo.img.src;
                }
            });
    })
}


function drawPlayers(canvas, playerImages) {
    let context = canvas.getContext("2d");

    for (let i = 0; i < playerImages.length; i++) {
        const player = playerImages[i];
        let img = new Image();
        img.src = player.src;

        img.onload = function () {
            context.drawImage(img, player.x, player.y, 85, 85);
        };
    }
}

