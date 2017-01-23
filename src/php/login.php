<?php 
    include 'DBHelper.php';

     $phone = $_POST["phone"];
     $password = $_POST["passwprd"];
     $ sql = "select * from customer where phone = '"'.$phone."'";
    $phonecheck = query($sql)
?>