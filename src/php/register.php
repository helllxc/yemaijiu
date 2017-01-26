<?php
	include 'DBHelper.php';

    $phone = $_POST["phone"];
    $password = $_POST["password"];
	$phoneCheck = "select * from customer where phone='$phone'";
	$result = query($phoneCheck);
	//当前 phone 不存在，执行插入操作
	if(count($result) < 1){
		$sql ="insert into customer(phone, password) values('$phone','$password')";
		$excute = excute($sql);
		if($excute){
			echo "{state: true}";
		} else {
			echo "{state: false, message: '插入失败！！！'}";
		}
	} else {
		echo "{state: false, message: '该手机号已注册或绑定，请重新输入。如果您是该用户,请立刻 '}";
	}
?>