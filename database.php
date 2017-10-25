<?php
// Content of database.php

$mysqli = new mysqli('localhost', 'simono', 'Rushmore1998', 'calendar');

if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>
