<?php
    $conn = new mysqli("127.0.0.1", "rafal", "rafal", "Monetki");
    if(isset($_POST['f']) && $_POST['f']=='get'){
        $query = $conn->query("SELECT * FROM Monetki");
        $row = $query->fetch_all();
        echo(json_encode($row));
    }

    


?>