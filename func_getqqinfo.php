<?php
header("content-Type: text/html; charset=utf-8");
ERROR_REPORTING(0);
$type = @$_GET['type'] ? $_GET['type'] : '';
if(empty($type)){
	exit;
}
if($type == "getqqnickname"){
	$qq = isset($_GET['qq']) ? addslashes(trim($_GET['qq'])) : '';
	if(!empty($qq) && is_numeric($qq) && strlen($qq) > 4 && strlen($qq) < 13){
		$qqnickname = file_get_contents('https://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins='.$qq); // API
		if($qqnickname){
			$qqnickname = mb_convert_encoding($qqnickname, "UTF-8", "GBK");
			echo $qqnickname;
		}else{
			exit('404');
		}
	}
}
if($type == "getqqavatar"){
	$qq = isset($_GET['qq']) ? addslashes(trim($_GET['qq'])) : '';
	if(!empty($qq) && is_numeric($qq) && strlen($qq) > 4 && strlen($qq) < 13){
		$qqavatar = file_get_contents('https://ptlogin2.qq.com/getface?appid=1006102&imgtype=3&uin='.$qq);  // API
		if($qqavatar){
			echo str_replace("pt.setHeader","qqavatarCallBack",$qqavatar);
		}else{
			exit("404");
		}
	}
}