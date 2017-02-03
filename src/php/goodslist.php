<?php
	include 'DBHelper1.php';
     $page = $_POST["page"];
    //$sql = "SELECT * FROM wine limit '$page-1)*30','$page*30'";
     $sql = "SELECT * FROM wine limit 1,30";
     query($sql);
?>