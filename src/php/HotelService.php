<?php

/**
 *	This is the beginning of a PHP-based interface for 
 *	managing RSS-based information from kayak.com.
 *
 *	This application code is based on an earlier 
 *	example of Marc Jansen <marcbjorn.jansen@lnu.se>.
 *
 *	@author		Henrik Andersen <henrik.andersen@lnu.se>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	1.0.
 *	@since		2013-11-11
 */
class HotelService {

	//---------------------------------------------------
	//  Private constants
	//---------------------------------------------------
	
	/**
	 *	The URL to the data source (RSS feed). The current 
	 *	solution is not very good as the functionality is 
	 *	always limited to retrieve information from Växjö.
	 *	(/SE/vaxjo);
	 */
	const SERVICE_URI = 'http://www.kayak.com/h/rss/hotelrss/SE/vaxjo?mc=EUR';

	//---------------------------------------------------
	//  Constructor method
	//---------------------------------------------------
	
	/**
	 *	The class constructor.
	 */
	public function __construct() {

	}

	//---------------------------------------------------
	//  Public methods
	//---------------------------------------------------
	
	/**
	 *	Public method to get hotel information based on a 
	 *	minimum and maximum value (price per night).
	 *
	 *	@return null
	 */
	public function getHotel($priceMin = 0, $priceMax = 100) {
		$xml = $this->getServiceXML();
		if ($xml !== FALSE) {
			$xml = $this->priceFilter($xml, $priceMin, $priceMax);
			$xml = $this->trimResponse($xml);
		} else {
			$xml = new stdClass();
		}

		return json_encode($xml);
	}

	//---------------------------------------------------
	//  Private methods
	//---------------------------------------------------

	/**
	 *	Private method to get hotel information as 
	 *	SimpleXML.
	 *
	 *	@return SimpleXML
	 */
	private function getServiceXML() {
		$response = file_get_contents(self::SERVICE_URI);
		$response = utf8_encode($response);
		$response = simplexml_load_string($response);

		return $response;
	}

	/**
	 *	This method filters the hotel information based 
	 *	on price. The hotels that meet the criteria are 
	 *	returned in an array.
	 *
	 *	@param 	SimpleXML 	The XML data (as reference).
	 *	@param 	int 		The minimum price.
	 *	@param 	int 		The maximum price.
	 *
	 *	@return Array 
	 */
	private function priceFilter(&$xml, $priceMin, $priceMax) {
		$result = array();
		foreach ($xml->channel->item as $item) {
			$kyk = $item->children('http://www.kayak.com/h/rss/hotelextension');
			$price = (int)$kyk->price;
			if ($price < $priceMax && $price > $priceMin) {
				$entry = new stdClass();
				$entry->name = (string)$item->title;
				$entry->externalLink = (string)$item->link;
				$entry->price = $price;
				$entry->stars = (int)$kyk->stars;
				$result[] = $entry;
			}
		}

		return $result;
	}

	/**
	 *	This method removes illegal / unwanted characters 
	 *	from strings. The purpose is to present clean and 
	 *	readable information on the website.
	 *
	 *	@param SimpleXML  The data to be trimmed. 
	 *
	 *	@return SimpleXML
	 */
	private function trimResponse($response) {
		for ($i = 0; $i < count($response); $i++) {
			$response[$i]->name = $this->trimString($response[$i]->name, '@');
			$response[$i]->name = $this->trimString($response[$i]->name, '(');
		}

		return $response;
	}

	/**
	 *	This method is looking for a character in a 
	 *	string and removes all characters between the 
	 *	selected character and end of the string.
	 *
	 *	@param 	string 	Text to be trimmed.
	 *	@param 	string 	Start character.
	 *
	 *	@return string
	 */
	private function trimString($string, $char) {
		$pos = strrpos($string, $char);
		if ($pos !== false) {
		    $string = substr($string, 0, $pos);
		}

		return $string;
	}
}

/**
 *	Initializes an instance of the HotelService class and uses 
 *	the public method getHotel to search for suitable hotel. 
 *	The result is presentad as JSON.
 */
$priceMin = @$_GET['priceMin'];
$priceMax = @$_GET['priceMax'];
$service  = new HotelService();
print_r($service->getHotel($priceMin, $priceMax));

?>