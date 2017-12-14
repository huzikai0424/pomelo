<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<meta charset="<?php echo bloginfo("charset");?>">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="description" content="<?php echo pomelo_option('description')?pomelo_option('description'):get_bloginfo("description");?>">
<?php if(pomelo_option('keywords')):?>
<meta name="keywords" content="<?php echo pomelo_option('keywords')?>">
<?php endif;?>
<title><?php 
	global $page, $paged;
	wp_title( '-', true, 'right' );
	bloginfo( 'name' );
	$site_description = pomelo_option('description')?pomelo_option('description'):get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) ) 
		echo " - $site_description";
	if ( $paged >= 2 || $page >= 2 ) 
		echo ' - ' . sprintf( __( '第 %s 页'), max( $paged, $page ) );?>
</title>
<?php if(pomelo_option('icon')) 
		echo "<link rel='shortcut icon' href=".pomelo_option('icon').">";
?>
<?php echo wp_head(); ?>
</head>
<body>
<div class="scrollbar" id="bar" style="width:0%"></div>
<div id="loading">
	<div id="loading-center">
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
		</div>
</div>
<div id="left-nav">
		<div class="author-nav">
		 	<a href="<?php echo home_url();?>"><img src="<?php echo pomelo_option('head')?>" alt="个人头像"></a>
		 	<p><?php echo pomelo_option("nickname");?></p>
		 	<p><?php echo last_login()?>前来过</p>
		</div>
		<div class="search-form">
			<form role="search" method="get" id="searchform" action="<?php echo home_url( '/' ); ?>">
    		<input type="text" value="" name="s" id="s" placeholder='搜索...'/>
         	<img src="<?php echo get_template_directory_uri();?>/images/search.png" alt="搜索">
   		 	</form>
		</div>
		<div class="admin-control">
			<a href="<?php echo home_url();?>/wp-admin"><span>控制台</span></a>
		</div>
		<?php wp_nav_menu(  
				array(  
				'container'       => 'div', //最外层容器标签名  
				'container_class' => 'main-nav', //最外层容器class名  
				'menu_class'      => 'sf-menu', //ul标签class  
				'menu_id'         => 'topnav',//ul标签id  
				))?>  
</div>
<div id="switch">
	<div id="iconfixed">
		<div class="icon"></div>
	</div>
</div>
<div id="go-top"></div>
<div id="theme_tips">
	<div id="tips_icon"><img src="<?php echo get_template_directory_uri();?>/images/tip.png" alt=""></div>
	<div id="tips_text">欢迎来到我的博客！</div>
</div>
<div id="wife">
    <div class="message" style="opacity:0"></div>
    <canvas id="live2d" width="280" height="250" class="live2d"></canvas>
</div>
<?php if(get_option('pomelo_player_setting')['music_open']=="1"):?>
<div id="player">
		<audio id="music"></audio>
	<div id="player_body">
		<div id="song_img">
			<img src="<?php echo get_template_directory_uri();?>/images/default_avater.jpg" alt="默认封面">
		</div>
		<div id="main">
			<div id="song_progress">
				<span class="play_current_bar" style="width: 0%;"></span>
				<span class="progress_op" style="left: 0%;"></span>
			</div>
			<p id="song_title"></p>
			<p id="song_singer"></p>
			<p id="song_time"><span id="currentTime">00:00</span>/<span id="endTime"></span></p>
			<div id="song_control">
				<div id="song_prev" title="上一首"></div>
				<div id="song_play" title="播放"></div>
				<div id="song_next" title="下一首"></div>
				<div id="song_playstyle" title="顺序播放"></div>
				<div id="song_volume">
					<div id="volume_icon" title="点击静音"></div>
					<div id="volume_regulate">
						<div id="volume_bar"><div id="volume_drag"></div></div>
					</div>
				</div>
			</div>
			<div id="player_listbtn"></div>
			<div id="player_lrcbtn"></div>
		</div>
	</div>
	<div id="player_right"></div>
	<div id="player_lrc">
		<div id="close_btn"></div>
		<ul id="my_lyrics"></ul>
	</div>
	<div id="player_list">
		<div id="player_listbar">
			<span>播放列表</span>
			<div id="player_listbar_icon"></div>
		</div>
		<div id="player_list_main"></div>
	</div>
</div>
<?php endif;?>
<script>
var playlist=<?php echo $playlist=get_option('pomelo_player_setting')['playlist']?get_option('pomelo_player_setting')['playlist']:music_default();?>;
<?php if(pomelo_option("welcome")):?>
setTimeout('showtips("<?php echo pomelo_option('welcome')?>");',1000);
<?php endif;?>
</script>


	
		