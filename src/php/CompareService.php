<?php
	// Code by Marc Jansen
  header("Access-Control-Allow-Origin: *");

	$months = array('january', 'february', 'march', 'april', 'may', 'june', 'juli', 'august', 'september', 'octobre', 'novembre', 'decembre');

	$day = $_GET['day'];
	$month = $_GET['month'] - 1;
	$year = $_GET['year'];
	$town = $_GET['town'];

	$xml_source = file_get_contents('http://api.wolframalpha.com/v2/query?input=weather%20' . $town . '%20' . $months[$month] . '%20' . $day . '%20' . $year . '&appid=TU57XY-69H7Y4AJQG');
	$xml = simplexml_load_string($xml_source);

	$entry = new stdClass();
	foreach ($xml->pod as $pod) {
		if ($pod->attributes()->id == 'WeatherSummary:WeatherData') {
			$text = (string)$pod->subpod->plaintext;
			$text = str_replace(' |', ':', $text);
			$text = nl2br($text);
			$entry->townText = $text;
		}
	}

	$town = 'V%C3%A4xj%C3%B6';
	$xml_source = file_get_contents('http://api.wolframalpha.com/v2/query?input=weather%20' . $town . '%20' . $months[$month] . '%20' . $day . '%20' . $year . '&appid=TU57XY-69H7Y4AJQG');
	$xml = simplexml_load_string($xml_source);
	foreach ($xml->pod as $pod) {
		if ($pod->attributes()->id == 'WeatherSummary:WeatherData') {
			$text = (string)$pod->subpod->plaintext;
			$text = str_replace(' |', ':', $text);
			$text = nl2br($text);
			$entry->vxuText = $text;
		}
	}


	echo json_encode($entry);
?>
