<?php
	include 'DBHelper1.php';
     $page = (int)$_POST["page"];
     $pageNum = ($page-1)*24;
     $sql = ("SELECT * FROM  supu limit $pageNum,24");
     query($sql);
?>