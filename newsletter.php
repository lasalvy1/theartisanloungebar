<?php
include('asset/includes/functions.php');
include('asset/includes/db_connect.php');
?>
<?php
$email = $_POST['email'];

 if(isset($_POST['submit']))
{
 $errors = array();
  // validation
  $required_fields = array ('email');
  foreach($required_fields as $filename)
  {
	  if(!isset($_POST[$filename])|| empty($_POST[$filename]))
	  {
		  $errors[] = $filename;
		  }
  }

  if (!empty($errors))
  {
    redirect_to('index.html#modal');
	echo 'an error occured' . mysqli_error($connection);
	
  }
  
    if(!empty($errors))
  {
	  echo'<p>';
	  echo 'please review the following fields:<br/>';
	  foreach($errors as $error)
	  {
		  echo ''.$error.'<br/>';
		  }
	  }else
	     {
			header("Location:index.html#modal2");
			   exit; 
			 }
			  $msg='Name:'.$_POST['email'];
  
	mail('lasalvy2009@hotmail.com', 'contact',$msg);
			 }
 
?>
