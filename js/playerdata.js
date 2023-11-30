
let positions = ['RW', 'ST', 'LW', 'CAM', 'CM', 'CDM', 'CB', 'RB', 'LB', 'GK'];

document.addEventListener("DOMContentLoaded", function() {

    let checkboxContainer = document.getElementById("checkboxContainer");

    positions.forEach(function(position) {

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = position;
         
        // Create a label for the checkbox
        let label = document.createElement("label");
        label.htmlFor = position;
        label.appendChild(document.createTextNode(position));

        // Append the checkbox and label to the container
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);

        // Check for query string values and update checkboxes accordingly
        checkbox.checked = true;
        
        let queryString = window.location.search;
        if (queryString) {
            let params = new URLSearchParams(queryString);
            positions.forEach(function(position) {
                let checkbox = document.getElementById(position);
            
                checkbox.checked = params.getAll('position[]').includes(position);
            });
        }

        document.addEventListener("change", function() {
            updateURL();
        });
    });
});
    

function updateURL() {
    let selectedPositions = positions.filter(position => {
        let checkbox = document.getElementById(position);
        return checkbox.checked;
    });

    let queryString = selectedPositions.length > 0 ? '?' + selectedPositions.map(position => `position[]=${position}`).join('&') : '';
    let url = `http://10.16.14.104/~matt/cp4/data.php${queryString}`;   // url when unchecked

    window.location.href = url; // new window
    //updateDisplayedData();

}

/*
function fetchPlayers() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("playerTable").innerHTML = xhr.responseText;
        }
    };
    xhr.open("GET", "fetch_data.php", true);
    xhr.send();
};*/

// Function to update the displayed data based on checkbox status
function updateDisplayedData() {
    // Fetch new data based on the updated URL
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("playerTable").innerHTML = xhr.responseText;
        }
    };

    // Use the current URL
    xhr.open("GET", window.location.href, true);
    xhr.send();
}
