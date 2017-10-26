<?php
header("Content-Type: application/json;charset=UTF-8");
require_once('Meting.php');
use Metowolfs\Meting;
$id = (int)$_GET['id'];
if ($id) {
	$API = new Meting('netease');
	$data = $API->format(true)->url($id);
	$arr = array();
	$arr = json_decode($data);
	$url = preg_replace('/https?:\/\/m([78])c?/','//m$1',$arr->url);
	echo '{"url":"'.$url.'"}';
}else{
	echo 'false';
}