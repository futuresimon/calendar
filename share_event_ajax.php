<?php
require 'database.php';
session_start();
// if(!hash_equals($_SESSION['token'], $_POST['token'])){
// 	die("Request forgery detected");
// }
if(isset($_POST['sharedEventUser'])){
	$sharedEventUser = $_POST['sharedEventUser'];
}
else{
	echo json_encode(array(
		"false" => true,
		"message" => "Please select a user to share with."
	));
	exit;
}
$eventId = $_POST['eventId'];
$display = 1;

//select the id of the user
$stmt1 = $mysqli->prepare("SELECT id FROM users WHERE username = ?");
if(!$stmt1){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt1->bind_param('s',$sharedEventUser);
$stmt1->execute();
$stmt1->bind_result($sharedEventUserId);
while($stmt1->fetch()){
  $userId = $sharedEventUserId;
}
$stmt1->close();

//Select the event that will be shared
$stmt2 = $mysqli->prepare("SELECT name, event_time, priority FROM events WHERE id = ?");
if(!$stmt2){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt2->bind_param('d',$eventId);
$stmt2->execute();
$stmt2->bind_result($sharedEventName, $sharedEventTime, $sharedEventPriority);
while($stmt2->fetch()){
  $eventName = $sharedEventName;
	$eventTime = $sharedEventTime;
	$priority = $sharedEventPriority;
}
$stmt2->close();

//This shares the event
$stmt3 = $mysqli->prepare("INSERT INTO events (user_id, name, event_time, priority, display) VALUES (?,?,?,?,?)");
if(!$stmt3){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt3->bind_param('dssd',$userId, $eventName, $eventTime, $priority, $display);
$stmt3->execute();
$stmt3->close();
echo json_encode(array(
	"success" => true
));
exit;

?>
