<?php
include('asset/includes/functions.php');
include('asset/includes/db_connect.php');
?>
<?php
$name = $_POST['name'];
$email = $_POST['email'];
$phone_no=$_POST['phone_no'];
$contact = $_POST['message'];

 if(isset($_POST['submit']))
{
 $errors = array();
  // validation
  $required_fields = array ('name','phone_no','email', 'message');
  foreach($required_fields as $filename)
  {
	  if(!isset($_POST[$filename])|| empty($_POST[$filename]))
	  {
		  $errors[] = $filename;
		  }
  }

  if (!empty($errors))
  {
    redirect_to('contact.html#modal');
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
			header("Location: contact.html#modal2");
			   exit; 
			 }
			  $msg='Name:'.$_POST['name']."\n"
         .'email:'.$_POST['email']."\n".'message:'.$_POST['message'];
  
	mail('lasalvy2009@hotmail.com', 'contact',$msg);
			 }
 
?>
