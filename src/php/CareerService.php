<?php
header("Access-Control-Allow-Origin: *");
require_once 'Careerjet_API.php';

$api = new Careerjet_API('sv_SE') ;
$page = 1 ;
$title = $_GET['title'];

$result = $api->search(array(
  'keywords' => $title,
  'location' => 'Växjö',
  'page' => $page ,
  'affid' => '678bdee048',
));

print_r(json_encode($result));

?>
