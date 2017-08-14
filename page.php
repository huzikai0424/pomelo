<?php echo get_header();?>
<div id="wrap">
   <?php  while(have_posts()) : the_post(); ?>
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
        <h2 class="text-center"><?php echo wp_title("",true,right);?></h2>
    </div>
    <div id="post-content">
        <p><?php echo the_content();?></p>
    </div>
    <?php 
        if (comments_open()) 
        echo comments_template();
    ?>
        
    </div>
    </div>

    <?php endwhile; ?>
</div>
<?php echo get_footer();?>
