<?php
	/**
	 Template Name: 友链
	 */ 
	 echo get_header();?>
<div id="wrap">
   <?php  while(have_posts()) : the_post(); ?>
    <div class="main">
    <div class="single-main">
		<div id="post-title"><h2>友链</h2></div>
		<div class="links-main">
            <?php echo get_link_items(); ?>
        </div>
        <div id="post-content">
            <p><?php echo the_content();?></p>
        </div>
        <?php if (comments_open()) echo comments_template();else echo "<p id='close-comments'>评论已关闭</p>"?>
    </div>
    </div>
    <?php endwhile; ?>
</div>
<?php echo get_footer();
