<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/playerdata.css">
    <script src="js/playerdata.js" defer></script>
    <title>Game Data</title>
</head>
<body>
    <h1> Add your own players! </h1>

    <h2> Add player </h2>

    <form id="addPlayerForm" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" enctype="multipart/form-data">
        <label for="name">Name:</label>
        <input type="text" name="name" required><br>

        <label for="position">Position:</label>
        <input type="text" name="position" required><br>

        <label for="image">Image:</label>
        <input type="file" name="image" required><br>

        <input type="submit" value="Add Player">
    </form>

    <hr>

    <div class="container">
        
       <div id="checkboxContainer">
            <h2>Filter Positions</h2>
        </div>

        <div id="playerTable">
            <h2>Player Data</h2>
            <?php include 'fetch_data.php'; ?>
        </div>
    </div>


    <!-- Button to manually fetch player data using AJAX 
    <button id="fetchButton" onclick="fetchPlayers()">Fetch Player Data</button>-->

</body>
</html>