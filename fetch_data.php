
    <?php 

        $filename = "../data-players/playerdata.csv";
        $myfile = fopen($filename, "r");
        if (!$myfile) {
            die("Unable to open $filename.");
        }

        $players = array();
        
        while (($data = fgetcsv($myfile, 1000, ",")) !== FALSE) {

            $players[] = array(
                'name' => $data[0], 
                'position' => $data[1],   
                'image' => $data[2],
            );
        }
        //array_splice($players, 0, 1);
    
        $json_data = json_encode($players, JSON_PRETTY_PRINT);
        //echo "<pre>Players: $json_data</pre>";
        fclose($myfile);

        // -----------------------------------------

        if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["name"])) {

            if ($_FILES["image"]["error"] == UPLOAD_ERR_OK) {

                $playernamelc = strtolower($player['name']);
                $playernameformat = str_replace(' ', '', $playernamelc);

                $tmp_name = $_FILES["image"]["tmp_name"];
                $name = basename($_FILES["image"]["name"]);
                $extension = pathinfo($name, PATHINFO_EXTENSION);
                $newFilename = $playernameformat . "." . $extension;
                move_uploaded_file($tmp_name, "../cp4/players/" . $newFilename);
            }

            $newPlayer = array(
                'Name' => $_POST['name'],
                'Position' => $_POST['position'],
                'Image' => $newFilename,
            );

            $players[] = $newPlayer;
            $myfile = fopen($filename, "w");
            if (!$myfile) {
                die("Unable to open $filename.");
            }

            // Write each player to the playerdata.csv file
            foreach ($players as $player) {
                fputcsv($myfile, $player);
            }

            fclose($myfile);

            //header("Location: ".$_SERVER['PHP_SELF']);
            exit();
        }

        
        // implement position query selector
        if (isset($_GET["position"])) {
            $positions = $_GET["position"];

            foreach ($positions as $position) {
                $filteredPosition = strtoupper($position);  // capitalization for positions
                
                $filteredPlayers = array_filter($players, function ($player) use ($filteredPosition) {
                    return strtoupper($player['position']) === $filteredPosition;
                });
                
                echo '<style>
                table {
                    width: 50%;
                    margin: auto; 
                    border-collapse: collapse;
                }
                th, td {
                    padding: 10px; 
                    text-align: left; 
                }
                    </style>';

            echo '<table border="1">';
            echo '<tr><th>Name</th><th>Position</th><th>Image</th></tr>';

            foreach ($filteredPlayers as $player) {
            echo '<tr>';
            echo '<td>' . $player['name'] . '</td>';
            echo '<td>' . $player['position'] . '</td>';
            echo '<td>' . $player['image'] . '</td>';
            echo '</tr>';
            }
            echo '</table>';
        }

        exit();

        }

        echo '<style>
            table {
                width: 50%;
                margin: auto; 
                border-collapse: collapse;
            }
            th, td {
                padding: 10px; 
                text-align: left; 
            }
            .remove-btn {
                background-color: #ff6961;
                color: #fff;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
            }
            </style>';

        echo '<form method="post" action="' . htmlspecialchars($_SERVER["PHP_SELF"]) . '">';
        echo '<table border="1">';
        echo '<tr><th>Name</th><th>Position</th><th>Image</th></tr>';

        foreach ($players as $index => $player) {
            echo '<tr>';
            echo '<td>' . $player['name'] . '</td>';
            echo '<td>' . $player['position'] . '</td>';
            echo '<td>' . $player['image'] . '</td>';
            echo '</tr>';
        }
        echo '</table>'; 
        

    ?>