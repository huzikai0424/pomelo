<footer>
	<div id="hitokoto">
		<span id="hitokoto_p"></span>
		<a href="javascript:;" title="换一句吧" id="refresh" ><img class="refresh" src="<?php echo get_template_directory_uri();?>/images/refresh.png" alt ></a>
	</div>
	<div id="block">
	<span id="beian"><?php echo pomelo_option("beian")?pomelo_option("beian")." · ":""?></span>
	<span id="demo"></span>
	</div>
	<?php echo pomelo_option("footer")?>
	<span>Powered by <a href="https://cn.wordpress.org/">WordPress</a> · Theme  <a href="https://cherryml.com">Pomelo</a></span>
</footer>
<?php echo wp_footer();?>
<!--<?php echo get_num_queries(); ?> queries in <?php timer_stop(3); ?> seconds-->
</body>
</html>