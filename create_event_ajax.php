<?php
require 'database.php';
session_start();
// if(!hash_equals($_SESSION['token'], $_POST['token'])){
// 	die("Request forgery detected");
// }
if(isset($_SESSION['user_id'])){
	$user_id = $_SESSION['user_id'];
}
else{
	echo json_encode(array(
		"false" => true,
		"message" => "Please log in."
	));
	exit;
}
$name = $_POST['name'];
$time = $_POST['time'];
$priority = $_POST['priority'];
//default display value is one
$display = 1;

//Post to stories Table
$stmt = $mysqli->prepare("insert into events (user_id, name, event_time, priority, display) values (?,?,?,?,?)");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->bind_param('dsssd',$user_id, $name, $time, $priority, $display);
$stmt->execute();
$stmt->close();
echo json_encode(array(
	"success" => true
));
exit;

?>
