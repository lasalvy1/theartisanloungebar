<?php
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dberror1 = "database connection failed";
$dberror2 = "databes table failed";


$connection = mysqli_connect($dbhost, $dbuser, $dbpass) or die ($dberror1);
	 $select_db = mysqli_select_db($connection, 'firstchoice') or die($dberror2);

 function redirect_to($location = NULL)
 {
	 if($location!=NULL)
	 {
 	  header("Location:{$location}");
	  exit;
	  }

 }
 function confirm_query($post)
  {			  
  
   if(!$post)
	  {
	   die('Database query failed:' . mysql_errno());
	   }	   
	  }

 function get_all_post()
 {
	 		   $post_query = 'SELECT*FROM subscription';
		       $post = mysqli_query($connection, $post_query);
			   confirm_query($post);
			   return $post;

 }
 
  function get_all_contact()
 {
	 		   $post_query = 'SELECT*FROM silver';
		       $post = mysqli_query($connection, $post_query);
			   confirm_query($post);
			   return $post;

 }
 
 function get_post_by_id($post_id)
 {
	global $connection;
    $query = "SELECT * ";
    $query .= "FROM subscription ";
    $query .= "WHERE id='" . mysqli_real_escape_string($connection, $post_id) ."' ";
                       // note the quotes and escaping wrapper
    $query .= "LIMIT 1";
    $post_result = mysqli_query($connection, $query);
    confirm_query($post_result);
    // if no rows are returned, fetch array will return false
    if ($subject = mysqli_fetch_array($post_result)) {
        return $subject;
    } else {
        return NULL;
    }
 }
 
 function mysql_prep($value)
 {
	 $magic_quotes_active = get_magic_quotes_gpc();
	 $new_enough_php = function_exists("mysqli_real_escape_string");
	 
	 if ($new_enough_php)
	 {
		 if($magic_quotes_active)
		   {
			   $value = mysqli_real_escape_string($value);
			   }else 
			    {
					if(!$magic_quotes_active)
					  {
						$value = addslashes($value);
				      }
				}
					return $value;
		 }
	 
 }
?>