<section id="cd-timeline" class="cd-container">
		<div class="cd-timeline-block">
			<div class="cd-timeline-img cd-picture">
				<img src="<?php echo get_template_directory_uri();?>/images/cd-icon-picture.svg" alt="Picture">
			</div><!-- cd-timeline-img -->
			<div class="cd-timeline-content">
				<h2><?php echo the_title();?></h2>
				<p><?php echo the_content();?></p>
				<span class="cd-date"><?php echo the_time("Y-m-d");?></span>
			</div> <!-- cd-timeline-content -->
		</div> <!-- cd-timeline-block -->
</section> <!-- cd-timeline -->
	
