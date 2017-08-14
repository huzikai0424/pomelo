<?php
	/**
	 Template Name: 友链
	 */ 
	 echo get_header();?>
<div id="wrap">
   <?php  while(have_posts()) : the_post(); ?>
    <div class="main">
    <div class="links">
    <h2 style="text-align:center">友链</h2>
    
        <article <?php post_class("post-item"); ?>>
            <div class="links-main">
                <?php echo get_link_items(); ?>
            </div>
            <div id="post-content">
                <p><?php echo the_content();?></p>
            </div>
            <?php 
                if (comments_open()) 
                echo comments_template();
            ?>
        </article>
    </div>
    </div>
    <?php endwhile; ?>
</div>
<?php echo get_footer();
