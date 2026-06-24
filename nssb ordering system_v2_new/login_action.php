<?php
include("configure.php");
include("firebaseRDB.php");

$email = $_POST['email'];
$password=$_POST['password'];

if($email == ""){
	echo "Email is required";
}else if ($password == ""){
	echo "password is required";
}else{
	$rdb = new firebaseRDB($databaseURL);
	$retrive = $rdb-retrieve("/user","email","EQUAL",$emails);
	$data =json_decode($retrive,1);
	
	if(!isset($data['email'])){
		echo "Email not registered";
	}else if($data['password'] !=$password){
		echo "Invalid password";
	}else{
		echo "login success";
	}
}
	