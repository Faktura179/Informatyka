<?php
    $conn = new mysqli("127.0.0.1", "rafal", "rafal", "Monetki");
    if(isset($_POST['f']) && $_POST['f']=='get'){
        $query = $conn->query("SELECT * FROM Monetki");
        $row = $query->fetch_all();
        echo(json_encode($row));
    }else if(isset($_POST['f']) && $_POST['f']=='update'){
        $sql =  "UPDATE Monetki SET Kraj='".$_POST["kraj"]."', Nominal='".$_POST["nominal"]."', Kategoria='".$_POST["kategoria"]."', Stop='".$_POST["stop"]."', Rok='".$_POST["rok"]."' WHERE ID=".$_POST["id"];
        $resp = $conn->query($sql);
        print_r($resp);
    }else if(isset($_POST['f']) && $_POST['f']=='delete'){
        $sql = "DELETE FROM Monetki WHERE ID=".$_POST["id"];
        $resp = $conn->query($sql);
        print_r($resp);
    }else if(isset($_POST['f']) && $_POST['f']=='add'){
        $sql = "INSERT INTO Monetki (Kraj,Nominal,Kategoria,Stop,Rok) VALUES('".$_POST["kraj"]."','".$_POST["nominal"]."','".$_POST["kategoria"]."','".$_POST["stop"]."','".$_POST["rok"]."')";
        $resp = $conn->query($sql);
        print_r($resp);
    }


    
    $conn->close();

?>