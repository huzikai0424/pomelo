<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 */ 
echo get_header();?>
<div id="wrap">
   <?php  while(have_posts()) : the_post(); ?>
    <div class="main">
    <div class="single-main">
    <div id="post-title">
        <h2 class="text-center"><?php echo wp_title("",true,right);?></h2>
    </div>
    <div id="post-content">
        <p><?php echo the_content();?></p>
    </div>
    <?php if (comments_open()) echo comments_template();else echo "<p id='close-comments'>评论已关闭</p>"?>
    </div>
    </div>
    <?php endwhile; ?>
</div>
<?php echo get_footer();?>
