<?php
	session_start();

	if(isset($_SESSION['login_name'])){
		unset($_SESSION['login_name']);
		//header("Location: login.html");
		echo 1;
	}
?>