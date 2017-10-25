<?php
require 'database.php';
session_start();
$currentUserId = $_SESSION['user_id'];
$currentUserName = $_SESSION['username'];
$one = 1;
$stmt = $mysqli->prepare("SELECT id, name, event_time, user_id, priority FROM events WHERE display = ? AND user_id = ? ");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	echo json_encode(array(
		"emptyTable" => true,
	));
	exit;
}
$stmt->bind_param('dd', $one, $currentUserId);
$stmt->execute();
$stmt->bind_result($eventId, $title, $time, $userId, $priority);
//print
//help from https://stackoverflow.com/questions/2467945/how-to-generate-json-file-with-php

$response = array();
$events= array();
while($stmt->fetch()){
	$responseTime=$time;
	$responseTitle=$title;
	$responseId=$eventId;
	$responsePriority;
	$posts[] = array('time'=> $responseTime, 'name'=> $responseTitle, 'id'=> $eventId, 'priority'=>$priority);
}

if(isset($posts)){
	$response['events'] = $posts;
	echo json_encode($response);
}
else{
	echo json_encode(array(
		"emptyTable" => true,
	));
}
$stmt->close();
exit;
?>
