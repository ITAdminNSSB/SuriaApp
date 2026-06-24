<?php
include("configure.php");

if (!isset($_SESSION['user'])){
	header("location:login_pg1.php");
	
}else{
	header("location:admin_homr_Pg");
}