<?php echo get_header(); ?>
<div id="wrap">
<div class="main">
<div class="single-main">
<?php 
	the_post();
	$views=get_post_meta($post->ID,"views",true);
	if(!$views)
		add_post_meta($post->ID,"views","0");
	update_post_meta($post->ID,"views",$views+1);
?>
	<div id="post-title">
		<h2 class="text-center"><?php echo the_title();?></h2>
	</div>
	<div>
		<p class="text-center">发布于<?php echo the_time("Y-m-d");?> / <?php echo $views?$views:"0";?>次浏览</p>
	</div>
	<div id="post-content">
		<p><?php echo the_content();?></p>
	</div>
	<?php 
		if(pomelo_option('modified_time')=='yes'){
			if ((get_the_modified_time('Y')*365+get_the_modified_time('z')) > (get_the_time('Y')*365+get_the_time('z'))){
			echo "<p class='last-update'>最后修改于：";
			echo the_modified_time('Y年n月j日 ag:i');
			echo "</p>";
		}
	}
	?>
	<?php if(pomelo_option("_zan")=='yes'):?>
	<div class="post-like">
	    <a href="javascript:;" data-action="ding" data-id="<?php the_ID(); ?>" class="postzan <?php if(isset($_COOKIE['post_zan_'.$post->ID])) echo 'done';?>">喜欢 <span class="count">
	        <?php if( get_post_meta($post->ID,'post_zan',true) ){
	            		echo get_post_meta($post->ID,'post_zan',true);
	                } else {
						echo '0';
					}?></span>
	    </a>
	</div>
	<?php endif;?>

	<div id="post-tag">
			TAGS:&nbsp;&nbsp;<?php if(has_tag()){ the_tags('','',''); }else{ echo '暂无标签'; } ?>
	</div>

	<div id="post-copyright">
		<span><?php echo _e('本站文章除注明转载/出处外，均为本站原创或翻译。若要转载但请务必注明出处，尊重他人劳动成果。');?></span>
		<span><?php echo _e('转载请注明出处链接 : ');?><a href="<?php the_permalink() ?>" rel="bookmark" title="本文固定链接 <?php the_permalink() ?>"><?php the_title() ?></a></span>
	</div>
	<?php if(pomelo_option('next_p')=='yes'):?>
	<div id="next_p">
		<div class="next_post_link"><?php echo next_post_link("<< %link");?></div>
		<div class="posts_nav_link"><?php echo previous_post_link(">> %link");?></div>
	</div>
	<?php endif;?>
	<?php if (comments_open()) echo comments_template();?>
</div>
</div>
</div>
<?php echo get_footer();?>