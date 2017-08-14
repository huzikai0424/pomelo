<?php echo get_header(); ?>
<div id="wrap">
<div class="top">
	<div id="bg"></div>
	<div class="info">
		<div class="info-box">
			<div class="blog-name">
				<div class="blog-logo">
					<img src="<?php echo pomelo_option('head')?>" alt="个人头像">
				</div>
				<a href="<?php echo home_url();?>"><h1><?php echo bloginfo('name')?></h1></a>
			</div>
			<div class="motto">
				<p><?php echo pomelo_option('admin-desc');?></p>
			</div>
		</div>
	</div>
</div>
<?php if(pomelo_option("scene-image")):?>
<script>
$("#bg").css("background","url(<?php echo pomelo_option('scene-image')?>)");
</script>
<?php endif;?>
	<div class="main">
	<div class="content">
		<?php while ( have_posts() ) : the_post(); ?>
		<?php get_template_part( 'content', get_post_format() ); ?>
		<?php endwhile; ?>
	</div>
		<div id="more"><?php next_posts_link(__('加载更多')); ?></div>
	</div>
</div>
<?php echo get_footer();?>