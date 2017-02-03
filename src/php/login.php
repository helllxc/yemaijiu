<?php 
        include "DBHelper.php";

        $phone = $_POST["phone"];
        $password = $_POST["password"];
    	//判断当前 email 是否已存在数据表中
    	$sql = "select * from customer where phone='$phone' and password='$password'";
    	$result = query($sql);
    	//当前 email 不存在，执行插入操作
    	if(count($result) < 1){
    		echo "{state: false, message: '登录失败！！！'}";
    	} else {
    		echo "{state: true, message: '登录成功！！！'}";
    		session_start();
    		$_SESSION["login_name"] = $result[0]->phone;
    	}
?>