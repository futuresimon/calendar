<?php
// login_ajax.php
require 'database.php';
header('Content-Type: application/json'); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$username = $_POST['username'];
$pwd_guess = $_POST['password'];

// Use a prepared statement
$stmt = $mysqli->prepare("SELECT COUNT(*), id, username, password FROM users WHERE username=?");
// Bind the parameter
$stmt->bind_param('s', $username);
$stmt->execute();
// Bind the results
$stmt->bind_result($cnt, $user_id, $username, $pwd_hash);
$stmt->fetch();


if($cnt == 1 && password_verify($pwd_guess, $pwd_hash)){
	session_start();
	$_SESSION['username'] = $username;
	$_SESSION['user_id'] = $user_id;
	$_SESSION['token'] = substr(md5(rand()), 0, 10);

	echo json_encode(array(
		"success" => true,
		"user" => $username,
		"token" => $_SESSION['token']
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Incorrect Username or Password"
	));
	exit;
}
?>
