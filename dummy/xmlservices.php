<?php

$request = new SimpleXMLElement(@file_get_contents('php://input'));

$message = $request->xpath('/ipacu_request/message/@name');
$message = $message[0];

if ($message) {
	$response = simplexml_load_file('xmlservices/'.$message.'.xml');
	header('Content-Type: text/xml');
	print $response->asXML();
}