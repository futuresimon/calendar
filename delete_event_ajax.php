<?php
require 'database.php';
session_start();
 if(!hash_equals($_SESSION['token'], $_POST['token'])){
 	die("Request forgery detected");
 }
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
$eventId = $_POST['eventId'];
$zero = 0;
$stmt = $mysqli->prepare("UPDATE events SET display = ? WHERE events.id = ?");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
  echo json_encode(array(
    "success" => false,
    "message" => "Query Prep Failed"
  ));
  exit;
}
$stmt->bind_param('dd', $zero, $eventId);
$stmt->execute();
$stmt->close();
echo json_encode(array(
	"success" => true
));
exit;

?>
