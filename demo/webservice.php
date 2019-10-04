<?php

$request = new SimpleXMLElement(@file_get_contents('php://input'));

$message = $request->xpath('/ipacu_request/message/@name');
$message = $message[0];

if ($message) {
	$response = simplexml_load_file($message.'.xml');
	header('Content-Type: text/xml');

  //  for debugging spinners
  switch ($message) {
    case 'get_satellite_params':
    case 'set_satellite_params':
      sleep(2);
      break;
  }

	print $response->asXML();
}