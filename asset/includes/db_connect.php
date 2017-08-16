<?php 
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dberror1 = "database connection failed";
$dberror2 = "databes table failed";

$connection = mysqli_connect($dbhost,$dbuser,$dbpass);
if (!$connection)
{
	die("database connection failed:" . mysql_error());
}
$db_select = mysqli_select_db($connection, "firstchoice");
if(!$db_select)
{
	die("database selection failed:" . mysql_error());
}

?>