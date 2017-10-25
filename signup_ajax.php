<?php
// signup_ajax.php
require 'database.php';
header('Content-Type: application/json'); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

// get these things from the form
$username = $_POST['username'];
$password = $_POST['password'];
$password_confirm = $_POST['password_confirm'];

if($password == $password_confirm){
  $password = password_hash($password, PASSWORD_BCRYPT);
  $stmt = $mysqli->prepare("insert into users (username, password) values (?, ?)");
  if(!$stmt){
  	printf("Query Prep Failed: %s\n", $mysqli->error);
    echo json_encode(array(
  		"success" => false,
  		"message" => "Something went wrong with signing up"
  	));
  	exit;
  }
  $stmt->bind_param('ss', $username, $password);
  $stmt->execute();
  $stmt->close();
  echo json_encode(array(
  	"success" => true
  ));
  exit;
}
else{
  echo json_encode(array(
		"success" => false,
		"message" => "Passwords don't match"
	));
	exit;
}

?>
