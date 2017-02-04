<?php
	include 'DBHelper1.php';
     $page = (int)$_POST["page"];
     $pageNum = ($page-1)*30;
     $sql = ("SELECT * FROM  wine limit $pageNum,30");
     query($sql);
?>