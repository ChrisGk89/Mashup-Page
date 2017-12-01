<?php

 /** 
 * Access Careerjet's job search from PHP
 *
 * PHP versions 4 and 5
 *
 * LICENSE: This source file is subject to version 3.0 of the PHP license
 * that is available through the world-wide-web at the following URI:
 * http://www.php.net/license/3_0.txt.  If you did not receive a copy of
 * the PHP License and are unable to obtain it through the web, please
 * send a note to license@php.net so we can mail you a copy immediately.
 *
 *
 * @package     Careerjet_API
 * @author      Thomas Busch <api@careerjet.com>
 * @copyright   2007-2015 Careerjet Limited
 * @licence     PHP http://www.php.net/license/3_01.txt
 * @version     3.6
 * @link        https://www.careerjet.com/partners/api/php/
 */


 /**
 * Class to access Careerjet's job search API
 *
 * Code example:
 * 
 * <code>
 *
 *  require_once "Careerjet_API.php";
 *  
 *  // Create a new instance of the interface for UK job offers
 *  $cjapi = new Careerjet_API('en_GB');
 *  
 *
 *  // Then call the search methods (see below for parameters)
 *  $result = $cjapi->search( array(
 *                                   'keywords' => 'java manager',
 *                                   'location' => 'London',
 *                                   'affid'    => '0afaf0173305e4b9',
 *                                 )
 *                           );
 *
 *  if ($result->type == 'JOBS') {
 *      echo "Got ".$result->hits." jobs: \n\n";
 *      $jobs = $result->jobs;
 *
 *      foreach ($jobs as &$job) {
 *          echo " URL: ".$job->url."\n";
 *          echo " TITLE: ".$job->title."\n";
 *          echo " LOC:   ".$job->locations."\n";
 *          echo " COMPANY: ".$job->company."\n";
 *          echo " SALARY: ".$job->salary."\n";
 *          echo " DATE:   ".$job->date."\n";
 *          echo " DESC:   ".$job->description."\n";
 *          echo "\n";
 *       }
 *   }
 *  
 *  </code>
 *     
 *
 * @package    Careerjet_API
 * @author     Thomas Busch <api@careerjet.com>
 * @copyright  2007-2015 Careerjet Limited
 * @link       https://www.careerjet.com/partners/api/php/
 */
class Careerjet_API {
  var $locale = '' ;
  var $version = '3.6';
  var $careerjet_api_content = '';

 /**
  * Creates client to Careerjet's API
  *
  * <code>
  *  $cjapi = new Careerjet_API($locale);
  * </code>
  * 
  * Available locales:
  *
  * <pre>
  *   LOCALE     LANGUAGE         DEFAULT LOCATION     CAREERJET SITE
  *   cs_CZ      Czech            Czech Republic       https://www.careerjet.cz
  *   da_DK      Danish           Denmark              https://www.careerjet.dk
  *   de_AT      German           Austria              https://www.careerjet.at
  *   de_CH      German           Switzerland          https://www.careerjet.ch
  *   de_DE      German           Germany              https://www.careerjet.de
  *   en_AE      English          United Arab Emirates https://www.careerjet.ae
  *   en_AU      English          Australia            https://www.careerjet.com.au
  *   en_CA      English          Canada               https://www.careerjet.ca
  *   en_CN      English          China                https://www.career-jet.cn
  *   en_HK      English          Hong Kong            https://www.careerjet.hk
  *   en_IE      English          Ireland              https://www.careerjet.ie
  *   en_IN      English          India                https://www.careerjet.co.in
  *   en_MY      English          Malaysia             https://www.careerjet.com.my
  *   en_NZ      English          New Zealand          https://www.careerjet.co.nz
  *   en_OM      English          Oman                 https://www.careerjet.com.om
  *   en_PH      English          Philippines          https://www.careerjet.ph
  *   en_PK      English          Pakistan             https://www.careerjet.com.pk
  *   en_QA      English          Qatar                https://www.careerjet.com.qa
  *   en_SG      English          Singapore            https://www.careerjet.sg
  *   en_GB      English          United Kingdom       https://www.careerjet.com
  *   en_US      English          United States        https://www.careerjet.com
  *   en_ZA      English          South Africa         https://www.careerjet.co.za
  *   en_TW      English          Taiwan               https://www.careerjet.com.tw 
  *   en_VN      English          Vietnam              https://www.careerjet.vn
  *   es_AR      Spanish          Argentina            https://www.opcionempleo.com.ar
  *   es_BO      Spanish          Bolivia              https://www.opcionempleo.com.bo
  *   es_CL      Spanish          Chile                https://www.opcionempleo.cl
  *   es_CR      Spanish          Costa Rica           https://www.opcionempleo.co.cr
  *   es_DO      Spanish          Dominican Republic   https://www.opcionempleo.com.do
  *   es_EC      Spanish          Ecuador              https://www.opcionempleo.ec
  *   es_ES      Spanish          Spain                https://www.opcionempleo.com
  *   es_GT      Spanish          Guatemala            https://www.opcionempleo.com.gt
  *   es_MX      Spanish          Mexico               https://www.opcionempleo.com.mx
  *   es_PA      Spanish          Panama               https://www.opcionempleo.com.pa
  *   es_PE      Spanish          Peru                 https://www.opcionempleo.com.pe
  *   es_PR      Spanish          Puerto Rico          https://www.opcionempleo.com.pr
  *   es_PY      Spanish          Paraguay             https://www.opcionempleo.com.py
  *   es_UY      Spanish          Uruguay              https://www.opcionempleo.com.uy
  *   es_VE      Spanish          Venezuela            https://www.opcionempleo.com.ve
  *   fi_FI      Finnish          Finland              https://www.careerjet.fi
  *   fr_CA      French           Canada               https://www.option-carriere.ca
  *   fr_BE      French           Belgium              https://www.optioncarriere.be
  *   fr_CH      French           Switzerland          https://www.optioncarriere.ch
  *   fr_FR      French           France               https://www.optioncarriere.com
  *   fr_LU      French           Luxembourg           https://www.optioncarriere.lu
  *   fr_MA      French           Morocco              https://www.optioncarriere.ma
  *   hu_HU      Hungarian        Hungary              https://www.careerjet.hu
  *   it_IT      Italian          Italy                https://www.careerjet.it
  *   ja_JP      Japanese         Japan                https://www.careerjet.jp
  *   ko_KR      Korean           Korea                https://www.careerjet.co.kr
  *   nl_BE      Dutch            Belgium              https://www.careerjet.be
  *   nl_NL      Dutch            Netherlands          https://www.careerjet.nl
  *   no_NO      Norwegian        Norway               https://www.careerjet.no
  *   pl_PL      Polish           Poland               https://www.careerjet.pl
  *   pt_PT      Portuguese       Portugal             https://www.careerjet.pt
  *   pt_BR      Portuguese       Brazil               https://www.careerjet.com.br
  *   ru_RU      Russian          Russia               https://www.careerjet.ru
  *   ru_UA      Russian          Ukraine              https://www.careerjet.com.ua
  *   sv_SE      Swedish          Sweden               https://www.careerjet.se
  *   sk_SK      Slovak           Slovakia             https://www.careerjet.sk
  *   tr_TR      Turkish          Turkey               https://www.careerjet.com.tr
  *   uk_UA      Ukrainian        Ukraine              https://www.careerjet.ua
  *   vi_VN      Vietnamese       Vietnam              https://www.careerjet.com.vn
  *   zh_CN      Chinese          China                https://www.careerjet.cn
  * </pre>
  *
  */

  function Careerjet_API( $locale = 'en_GB' )
  {
    $this->locale = $locale;
  }

  /**
   * @ignore
   **/

  function call($fname , $args)
  {
    $url = 'https://public.api.careerjet.net/'.$fname.'?locale_code='.$this->locale;

    if (empty($args['affid'])) {
      return (object) array(
        'type' => 'ERROR',
        'error' => "Your Careerjet affiliate ID needs to be supplied. If you don't " .
                   "have one, open a free Careerjet partner account."
      );
    }

    foreach ($args as $key => $value) {
      $url .= '&'. $key . '='. urlencode($value);
    }

    if (empty($_SERVER['REMOTE_ADDR'])) {
      return (object) array(
        'type' => 'ERROR',
        'error' => 'not running within a http server'
      );
    }

    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
      $ip = $_SERVER["HTTP_CF_CONNECTING_IP"];
    } elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
      $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
      // For more info: http://en.wikipedia.org/wiki/X-Forwarded-For
      $ip = trim(array_shift(array_values(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']))));
    } else {
      $ip = $_SERVER['REMOTE_ADDR'];
    }

    $url .= '&user_ip=' . $ip;
    $url .= '&user_agent=' . urlencode($_SERVER['HTTP_USER_AGENT']);
    
    // determine current page
    $current_page_url = '';
    if (!empty ($_SERVER["SERVER_NAME"]) && !empty ($_SERVER["REQUEST_URI"])) {
      $current_page_url = 'http';
      if (!empty ($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") {
        $current_page_url .= "s";
      }
      $current_page_url .= "://";
  
      if (!empty ($_SERVER["SERVER_PORT"]) && $_SERVER["SERVER_PORT"] != "80") {
        $current_page_url .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
      } else {
        $current_page_url .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
      }
    }

    $header = "User-Agent: careerjet-api-client-v" . $this->version . "-php-v" . phpversion();
    if ($current_page_url) {
      $header .= "\nReferer: " . $current_page_url;
    }

    $careerjet_api_context = stream_context_create(array(
      'http' => array('header' => $header)
    ));

    $response = file_get_contents($url, false, $careerjet_api_context);
    return json_decode($response);
  }
  
  
  /**
   * Performs a search using Careerjet's public search API
   * 
   * Code example:
   *
   * <code>
   *   $result = $cjapi->search(array(
   *                                   'keywords'   => 'java',
   *                                   'location'   => 'London',
   *                                   'pagesize'   => 10,
   *                                   'affid'      => '0afaf0173305e4b9',
   *                                 )
   *                          );
   * </code>
   * 
   * If the given location is not ambiguous, you can use this object like that:
   *
   * <code>
   *   if ($result->type == 'JOBS') {
   *      echo "Got ".$result->hits." jobs: \n";
   *      echo " On ".$result->pages." pages \n";
   *      $jobs = $result->jobs;
   *
   *      foreach ($jobs as &$job) {
   *          echo " URL: ".$job->url."\n";
   *          echo " TITLE: ".$job->title."\n";
   *          echo " LOC:   ".$job->locations."\n";
   *          echo " COMPANY: ".$job->company."\n";
   *          echo " SALARY: ".$job->salary."\n";
   *          echo " DATE:   ".$job->date."\n";
   *          echo " DESC:   ".$job->description."\n";
   *          echo " SITE:   ".$job->site."\n";
   *          echo "\n" ;
   *       }
   *   }
   * </code>
   *
   * If the given location is ambiguous, result contains a list of suggested locations:
   *
   * <code>
   *   if ($result->type == 'LOCATIONS') {
   *       echo "Suggested locations:\n";
   *       $locations = $result->locations;
   *       
   *       foreach ($locations as &$loc) {
   *           echo $loc."\n" ;
   *       }
   *   }
   * </code>
   *
   * @param   array  $args
   *
   * map of search parameters
   *
   * Example: array( 'keywords' => 'java manager',
   *                 'location' => 'london', ... );
   *
   * All values of keys MUST be encoded either in ASCII or UTF8.
   * If you use this API within a webpage, make sure:
   *   - That your pages are served in utf-8 encoding OR
   *   - Your job search form begins like that :
   *        <form accept-charset="UTF-8"
   *
   *
   * MANDATORY PARAMETERS
   *
   * The following parameters is mandatory:
   *  - <b>affid:</b><br>
   *    Affiliate ID provided by Careerjet<br>
   *    Requires to open a Careerjet partner account<br>
   *    https://www.careerjet.com/partners/
   *
   * FILTERS
   *
   * All filters have default values and are not mandatory:
   *  - <b>keywords:</b><br>
   *    Keywords to search in job offers. Example: 'java manager'<br>
   *    Default: none (Returns all offers from default country)
   *  - <b>location:</b><br>
   *    Location to search job offers in. Examples: 'London', 'Paris'<br>
   *    Default: none (Returns all offers from default country)
   *  - <b>sort:</b><br>
   *    Type of sort.<br>
   *    Available values are 'relevance' (default), 'date', and 'salary'.
   *  - <b>start_num:</b><br>
   *    Num of first offer returned in entire result space should be >= 1 and <= Number of hits<br>
   *    Default: 1 
   *  - <b>pagesize:</b><br>
   *    Number of offers returned in one call<br>
   *    Default: 20
   *  - <b>page:</b><br>
   *    Current page number (should be >=1)<br>
   *    If set, will override start_num<br>
   *    The maxumum number of page is given by $result->pages
   *  - <b>contracttype:</b><br>
   *    Character code for contract types:<br>
   *    'p'    - permanent job<br>
   *    'c'    - contract<br>
   *    't'    - temporary<br>
   *    'i'    - training<br>
   *    'v'    - voluntary<br>
   *    Default: none (all contract types)
   *  - <b>contractperiod:</b><br>
   *    Character code for contract contract periods:<br>
   *    'f'     - Full time<br>
   *    'p'     - Part time<br>
   *    Default: none (all contract periods)
   *
   * @return object(stdClass)  An object containing results
   *
   */
  function search($args)
  {
    $result =  $this->call('search' , $args);
    if ($result->type == 'ERROR') {
      trigger_error( $result->error );
    }
    return $result;
  }
}

?>
