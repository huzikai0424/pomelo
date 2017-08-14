<div id='comment-main'>
	<?php 
	include(TEMPLATEPATH . '/smiley.php');
		if(comments_open()){
			if(pomelo_option('qq_comment')=='no')
				$qq_comment='style="display:none"';
			else
				$qq_comment='';
			$comment_cols='<div id="comment_cols">
								<img id="qq_avatar" class="qq_avatar" src="//gravatar.com/avatar/?d=mm&s=100">
								<div id="comment_info" class="comment_info"> '.esc_attr($comment_author).'▼</div>
								<div id="emoji">
									<div id="emoji-logo"><span>^_^</span></div>
								</div>
								<div class="smilies-wrap notshow">'.$smilies.'</div>
							</div>';
			$args = array(
						'id_form'           => 'commentform',
						'id_submit'         => 'submit',
						'title_reply'       => '',
						'title_reply_to'    => '<div class="graybar"><i class="fa fa-comments-o"></i>' . esc_html__('Leave a Reply to') . ' %s' . '</div>',
						'cancel_reply_link' => esc_html__('取消回复'),
						'label_submit'      => esc_html__('提交评论'),
						'comment_field' =>  '<textarea placeholder="' . esc_attr__('留下来说几句吧') . '..." name="comment" class="commentbody" id="comment" rows="5" tabindex="1"></textarea>'.$comment_cols,
						'comment_notes_after' => '',
						'comment_notes_before' => '',
						'fields' => apply_filters( 'comment_form_default_fields', array(

							'QQ' =>
								'<div id="form_main"><input type="text"'.$qq_comment.' placeholder="' . esc_attr__('QQ') . ' ' . ( $req ? '(' . esc_attr__('选填') . ')' : '') . '" name="new_field_qq" id="QQ"  size="12" tabindex="2" ' . ($req ? "aria-required='true'" : '' ). ' />',
							'author' =>
								'<input type="text" placeholder="' . esc_attr__('昵称') . ' ' . ( $req ?  '(' . esc_attr__('必填') . ')' : '') . '" name="author" id="author" value="' . esc_attr($comment_author) . '" size="22" required="required"  tabindex="3" ' . ($req ? "aria-required='true'" : '' ). ' />',

							'email' =>
								'<input type="text" placeholder="' . esc_attr__('邮箱') . ' ' . ( $req ? '(' . esc_attr__('必填') . ')' : '') . '" name="email" id="email" value="' . esc_attr($comment_author_email) . '" size="22" required="required" tabindex="4" ' . ($req ? "aria-required='true'" : '' ). ' />',

							'url' =>
								'<input type="text" placeholder="' . esc_attr__('网站') . '" name="url" id="url" value="' . esc_attr($comment_author_url) . '" size="22"  tabindex="5" /></div>')

						)
					);
					comment_form($args);
				}
	?>

	<h3 class="line"><span><?php if (have_comments()) echo get_post($id)->comment_count." 条评论";else echo "暂无评论"?></span></h3>
		<ol class="commentlist">
				<?php echo wp_list_comments(array('avatar_size'=> 40,'callback'=>'theme_comment'));?>
		</ol>
</div>