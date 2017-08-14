<?php
	/**
	 Template Name: 时光轴
	 */ 
	 echo get_header();?>
<div id="wrap">
<div id="time">
<header>
</header>
<div class="main">
<section id="cd-timeline" class="cd-container">
	<?php 
	$query=new WP_Query('posts_per_page=-1');
	while ( $query->have_posts() ){
		$query->the_post(); 
		$format = get_post_format(get_the_ID());
	if($format==='status'){
	?>
	<div class="cd-timeline-block">
		<div class="cd-timeline-img cd-picture">
		<?php echo get_avatar( get_the_author_email(), 90 ); ?>
		</div>
		<div class="cd-timeline-content">
			<h2><?php echo the_title();?></h2>
			<p><?php echo the_content();?></p>
			<span class="cd-date"><?php echo the_time("Y-m-d");?></span>
		</div>
	</div>
	<?php }} ?> 
</section>	
</div>
</div>
</div>
	<?php echo get_footer();
