<?php echo get_header(); ?>
<div id="wrap">
<div class="top">
<?php 
if(pomelo_option("scene-image"))
	$bg_url=pomelo_option("scene-image");
else
	$bg_url="http://oijbbaxnm.bkt.clouddn.com/star.jpg";
?>
	<div id="bg" style='background: url("<?php echo $bg_url;?>");'></div>

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