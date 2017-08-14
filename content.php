<article class="index-article">
	<div class="post-info"><h2><a href="<?php echo the_permalink();?>"><?php echo the_title();?></a></h2>
		<div class="post-detial">
			<span><?php echo the_category(' ');?></span>
			<span><?php echo the_time("Y-m-d");?></span>
			<span><?php 
				$views=get_post_meta($post->ID,"views",true); 
				if(!$views) 
					echo "0次浏览";
				else 
					echo $views."次浏览";?>
			</span>
		</div>
	</div>
	<?php 
		$array_image_url = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full');
		if(isset($array_image_url[0])):?>
		<div class="post_img"><img src="<?php echo $array_image_url[0];?>" alt></div>
	<?php endif;?>
	<p><?php echo mb_strimwidth(strip_shortcodes(strip_tags(apply_filters('the_content', $post->post_content))), 0, 180,"...");?></p>
</article>