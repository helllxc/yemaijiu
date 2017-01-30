<?php
	include 'DBHelper1.php';
     //$page = $_POST["page"];
    $sql = "SELECT * FROM wine limit 1,30";
     query($sql);
?>