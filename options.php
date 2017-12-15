<?php
/**
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 */
function optionsframework_option_name() {
	// Change this to use your theme slug
	return 'pomelo-options';
}

/**
 * Defines an array of options that will be used to generate the settings page and be saved in the database.
 * When creating the 'id' fields, make sure to use all lowercase and no spaces.
 *
 * If you are making your theme translatable, you should replace 'theme-textdomain'
 * with the actual text domain for your theme.  Read more:
 * http://codex.wordpress.org/Function_Reference/load_theme_textdomain
 */

function optionsframework_options() {

	// 测试数据
	$test_array = array(
		'one' => __( 'One', 'theme-textdomain' ),
		'two' => __( 'Two', 'theme-textdomain' ),
		'three' => __( 'Three', 'theme-textdomain' ),
		'four' => __( 'Four', 'theme-textdomain' ),
		'five' => __( 'Five', 'theme-textdomain' )
	);

	// 复选框数组
	$multicheck_array = array(
		'one' => __( 'French Toast', 'theme-textdomain' ),
		'two' => __( 'Pancake', 'theme-textdomain' ),
		'three' => __( 'Omelette', 'theme-textdomain' ),
		'four' => __( 'Crepe', 'theme-textdomain' ),
		'five' => __( 'Waffle', 'theme-textdomain' )
	);

	// 复选框默认值
	$multicheck_defaults = array(
		'one' => '1',
		'five' => '1'
	);

	// 默认背景
	$background_defaults = array(
		'color' => '',
		'image' => '',
		'repeat' => 'repeat',
		'position' => 'top center',
		'attachment'=>'scroll' );

	// 默认排版
	$typography_defaults = array(
		'size' => '15px',
		'face' => 'georgia',
		'style' => 'bold',
		'color' => '#bada55' );

	// 排版设置
	$typography_options = array(
		'sizes' => array( '6','12','14','16','20' ),
		'faces' => array( 'Helvetica Neue' => 'Helvetica Neue','Arial' => 'Arial' ),
		'styles' => array( 'normal' => 'Normal','bold' => 'Bold' ),
		'color' => false
	);

	// 将所有分类(categories)放进数组
	$options_categories = array();
	$options_categories_obj = get_categories();
	foreach ($options_categories_obj as $category) {
		$options_categories[$category->cat_ID] = $category->cat_name;
	}

	// 将所有标签(tags)放进数组
	$options_tags = array();
	$options_tags_obj = get_tags();
	foreach ( $options_tags_obj as $tag ) {
		$options_tags[$tag->term_id] = $tag->name;
	}


	// 将所有页面（pages）加入数组
	$options_pages = array();
	$options_pages_obj = get_pages( 'sort_column=post_parent,menu_order' );
	$options_pages[''] = 'Select a page:';
	foreach ($options_pages_obj as $page) {
		$options_pages[$page->ID] = $page->post_title;
	}

	//如果使用图片单选按钮,定义一个目录路径
	$imagepath =  get_template_directory_uri() . '/images/';

	$options = array();

	$options[] = array(
		'name' => __( '基本设置', 'theme-textdomain' ),
		'type' => 'heading'
	);
    //以下开始基本设置
    $options[] = array(
		'name' => __( '个人头像', 'theme-textdomain' ),
		'desc' => __( '设置左侧导航和首页头像，建议大小：100*100;', 'theme-textdomain' ),
		'id' => 'head',
		'type' => 'upload'
	);
	$options[] = array(
		'name' => __( '博主昵称', 'theme-textdomain' ),
		'desc' => __( '显示在侧边栏', 'theme-textdomain' ),
		'id' => 'nickname',
		'std' => '',
		'type' => 'text',
		'class' => 'mini'
	);

	$options[] = array(
		'name' => __( '首页背景', 'theme-textdomain' ),
		'desc' => __( '最佳尺寸1920*1080', 'theme-textdomain' ),
		'id' => 'scene-image',
		'type' => 'upload'
	);
	$options[] = array(
		'name' => __( '后台登陆界面背景', 'theme-textdomain' ),
		'desc' => __( '最佳尺寸1920*1080', 'theme-textdomain' ),
		'id' => 'admin-background',
		'type' => 'upload'
	);
	$options[] = array(
		'name' => __( '站点icon', 'theme-textdomain' ),
		'desc' => __( '设置站点icon，建议大小：16*16，建议格式：ico或png', 'theme-textdomain' ),
		'id' => 'icon',
		'type' => 'upload'
	);

	$options[] = array(
		'name' => __( '网站关键词', 'theme-textdomain' ),
		'desc' => __( '各关键字间用半角逗号","分割，数量在5个以内最佳。', 'theme-textdomain' ),
		'id' => 'keywords',
		'std' => '',
		'type' => 'text'
	);

	$options[] = array(
		'name' => __( '网站描述', 'theme-textdomain' ),
		'desc' => __( '用简洁的文字描述本站点，建议小于50字。', 'theme-textdomain' ),
		'id' => 'description',
		'std' => '',
		'type' => 'text'
	);

	$options[] = array(
		'name' => __( '博主描述', 'theme-textdomain' ),
		'desc' => __( '一段自我描述的话，将显示在"首页"中。', 'theme-textdomain' ),
		'id' => 'admin-desc',
		'std' => '',
		//'placeholder' => 'Placeholder',
		'type' => 'text'
	);

	$options[] = array(
		'name' => __( '页脚信息', 'theme-textdomain' ),
		'desc' => __( '页脚说明文字。自动保留空格和换行，支持HTML代码，不支持js代码。', 'theme-textdomain' ),
		'id' => 'footer',
		'std' => 'Copyright © 2017 痴情的小五 · ',
		'type' => 'textarea'
	);
	
	$options[] = array(
		'name' => __( '统计代码', 'theme-textdomain' ),
		'desc' => __( '输入站长统计代码,请务必去掉&lt;script&gt;和&lt;/script&gt;标签。你也可以写自定义js,它将会显示在&lt;/body&gt;前。', 'theme-textdomain' ),
		'id' => 'tongji',
		'std' => '',
		'type' => 'textarea'
	);

	$options[] = array(
		'name' => __( 'ICP备案号', 'theme-textdomain' ),
		'desc' => __( '你的备案号', 'theme-textdomain' ),
		'id' => 'beian',
		'std' => '',
		'type' => 'text',
		'class' => 'mini'
	);

	//text-editor
	$options[] = array(
		'name' => __( '个性设置', 'theme-textdomain' ),
		'type' => 'heading'
	);

	$options[] = array(
		'name' => __( '博客运行时间统计', 'theme-textdomain' ),
		'desc' => __( '', 'theme-textdomain' ),
		'id' => 'blog_start_day',
		'std' => 'yes',
		'type' => 'radio',
		'options' => array(
		 'yes' => __('开启',''),
		 'no' => __('关闭','')
	));
	$options[] = array(
		'name' => __( '博客开启时间', 'theme-textdomain' ),
		'desc' => __( '格式： XXXX年/xx月/xx日，如2017/03/07，无需年月日', 'theme-textdomain' ),
		'id' => 'time-set',
		'std' => '',
		'placeholder' => '如：2017/03/07',
		'type' => 'text',
		'class' => 'mini'
	);
	$options[] = array(
		'name' => __( '显示文章最后修改时间', 'theme-textdomain' ),
		'desc' => __( '如果文章有过修改(不包括当天)，则把时间显示在文章末尾', 'theme-textdomain' ),
		'id' => 'modified_time',
		'std' => 'yes',
		'type' => 'radio',
		'options' => array(
		 'yes' => __('开启',''),
		 'no' => __('关闭','')
	));
	$options[] = array(
		'name' => __( 'QQ评论支持', 'theme-textdomain' ),
		'desc' => __( '', 'theme-textdomain' ),
		'id' => 'qq_comment',
		'std' => 'yes',
		'type' => 'radio',
		'options' => array(
		 'yes' => __('开启',''),
		 'no' => __('关闭','')
	));
	$options[] = array(
		'name' => __( '一言类型', 'theme-textdomain' ),
		'desc' => __( '在下方选择一言类型。如果不需要请选关闭，它将会显示在页脚处。', 'theme-textdomain' ),
		'id' => 'hitokoto',
		'std' => 'random',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => array(
		  'random' => __('全部随机',''),
		  'close' => __('关闭',''),
		  'a' => __('动画',''),
		  'b' => __('漫画',''),
		  'c' => __('游戏',''),
		  'd' => __('小说',''),
		  'e' => __('原创',''),
		  'f' => __('来自网络',''),
		  'g' => __('其他','')
		  )
	);
	$options[] = array(
		'name' => __( '显示顶部进度条', 'theme-textdomain' ),
		'desc' => __( '', 'theme-textdomain' ),
		'id' => 'scrollbar',
		'std' => 'yes',
		'type' => 'radio',
		'options' => array(
		 'yes' => __('开启',''),
		 'no' => __('关闭','')
	));
	$options[] = array(
		'name' => __( '邮件前缀', 'theme-textdomain' ),
		'desc' => __( '修改发件人的@前缀，用于发送系统邮件，不要使用中文，默认系统邮件地址为 admin@你的域名.com', 'theme-textdomain' ),
		'id' => 'mail_username',
		'std' => 'admin',
		'type' => 'text',
		'class' => 'mini'
	);
	$options[] = array(
		'name' => __( 'tooltip欢迎语', 'theme-textdomain' ),
		'desc' => __( '不填不会生效', 'theme-textdomain' ),
		'id' => 'welcome',
		'std' => '欢迎来到我的博客...',
		'type' => 'text',
	);
	$options[] = array(
		'name' => __( '显示动态标题(失去焦点时显示)', 'theme-textdomain' ),
		'desc' => __( '和下方选项同时设置后生效', 'theme-textdomain' ),
		'id' => 'change_title1',
		'std' => '',
		'placeholder' => '如：(つ ェ ⊂)我藏好了哦~',
		'type' => 'text'
	);
	$options[] = array(
		'name' => __( '显示动态标题(获得焦点时显示)', 'theme-textdomain' ),
		'desc' => __( '和上方选项同时设置后生效', 'theme-textdomain' ),
		'id' => 'change_title2',
		'std' => '',
		'placeholder' => '如：(*゜ロ゜)ノ被发现了~',
		'type' => 'text'
	);
	$options[] = array(
		'name' => __( '是否开启文章点赞', 'theme-textdomain' ),
		'desc' => __( '', 'theme-textdomain' ),
		'id' => '_zan',
		'std' => 'yes',
		'type' => 'radio',
		'options' => array(
		 'yes' => __('开启',''),
		 'no' => __('关闭','')
	));
	$options[] = array(
		'name' => __( '文章上一篇和下一篇', 'theme-textdomain' ),
		'desc' => __( '在文章末尾显示上一篇和下一篇', 'theme-textdomain' ),
		'id' => 'next_p',
		'std' => 'yes',
		'type' => 'radio',
		'options' => array(
		 'yes' => __('开启',''),
		 'no' => __('关闭','')
	));
	$options[] = array(
		'name' => __( '打字特效', 'theme-textdomain' ),
		'desc' => __( '给评论框增加打字特效', 'theme-textdomain' ),
		'id' => 'input',
		'std' => array(),
		'type' => 'multicheck',
		'options' => array(
		 'one' => __('烟花特效',''),
		 'two' => __('震动特效',''),
	));
	$options[] = array(
		'name' => __( '禁用选项', 'theme-textdomain' ),
		'desc' => __( '默认关闭,慎用！', 'theme-textdomain' ),
		'id' => 'debug',
		'std' => array(),
		'type' => 'multicheck',
		'options' => array(
		 'one' => __('禁止鼠标右键',''),
		 'two' => __('禁止选中文本',''),
		 'three'=>__('禁止F12调试','')
	));
	//看板娘
	$options[] = array(
		'name' => __( '看板娘', 'theme-textdomain' ),
		'type' => 'heading'
	);
	$options[] = array(
		'name' => __( '看板娘开关', 'theme-textdomain' ),
		'desc' => __( '显示萌萌哒的看板娘', 'theme-textdomain' ),
		'id' => 'wife_open',
		'std' => 'yes',
		'type' => 'radio',
		'options' => array(
		 'yes' => __('开启',''),
		 'no' => __('关闭','')
	));
	$options[] = array(
		'name' => __( '自动换装', 'theme-textdomain' ),
		'desc' => __( '没有放入服装文件前请不要开启！', 'theme-textdomain' ),
		'id' => 'wife_autoChange',
		'std' => 'no',
		'type' => 'radio',
		'options' => array(
		 'yes' => __('开启',''),
		 'no' => __('关闭','')
	));
	$options[] = array(
		'name' => __( '图床链接', 'theme-textdomain' ),
		'desc' => __( '如果本地引用,请留空', 'theme-textdomain' ),
		'id' => 'wife_photo_url',
		'std' => '',
		//'placeholder' => 'Placeholder',
		'type' => 'text'
	);
	$options[] = array(
		'name' => __( '看板娘一言类型', 'theme-textdomain' ),
		'desc' => __( '在下方选择一言类型,如果不需要请选关闭.它和页脚的一言相互独立', 'theme-textdomain' ),
		'id' => 'wife_hitokoto',
		'std' => 'random',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => array(
		  'random' => __('全部随机',''),
		  'close' => __('关闭',''),
		  'a' => __('动画',''),
		  'b' => __('漫画',''),
		  'c' => __('游戏',''),
		  'd' => __('小说',''),
		  'e' => __('原创',''),
		  'f' => __('来自网络',''),
		  'g' => __('其他','')
		  )
	);
	$options[] = array(
		'name' => __( '一言刷新间隔（单位：秒）', 'theme-textdomain' ),
		'desc' => __( '填0或者为空不刷新，时间间隔不要少于10，推荐30，填数字！！！', 'theme-textdomain' ),
		'id' => 'wife_hitokoto_refresh',
		'std' => '0',
		'type' => 'text',
		'class' => 'mini'
	);
	$options[] = array(
		'name' => __( '关于图床链接', 'theme-textdomain' ),
		'desc' => __( '填写到图片的目录，如www.baidu.com/a/1.png，请填写www.baidu.com/a，末尾不要加斜杠 /' ),
		'type' => 'info'
	);
	$options[] = array(
		'name' => __( '关于自动换装', 'theme-textdomain' ),
		'desc' => __( '主题默认只自带一种服装，想实现换装功能请先把服装文件下载放到主题live2d\model\textures目录或者图床，请勿修改文件名！没有放入服装文件前请不要开启自动换装！' ),
		'type' => 'info'
	);
	//music
	$options[] = array(
		'name' => __( '其他', 'theme-textdomain' ),
		'type' => 'heading'
	);
	$options[] = array(
		'name' => __( '播放器设置', 'theme-textdomain' ),
		'desc' => __( '请到后台子菜单中的"播放器设置"中添加歌单' , 'theme-textdomain' ),
		'type' => 'info'
	);
	
	$options[] = array(
		'name' => __( '无法获取歌单或者歌词', 'theme-textdomain' ),
		'desc' => __( '国外主机存在IP被墙而无法播放的情况，暂无解决办法。排除网络和主机问题后，若无法播放一般是因为API失效，请反馈博主修复。' , 'theme-textdomain' ),
		'type' => 'info'
	);
	$options[] = array(
		'name' => __( '温馨提示', 'theme-textdomain' ),
		'desc' => __( '此播放器手机端默认隐藏，且只支持网易云音乐链接。若想要手机端显示或者支持其他音乐链接，请禁用并选择其他音乐播放器插件。', 'theme-textdomain' ),
		'type' => 'info'
	);
	$options[] = array(
		'name' => __( '最后一些话', 'theme-textdomain' ),
		'desc' => __( '这是我第一次开发主题，经验不足。非常欢迎大家积极反馈此主题在日常使用中的BUG，也欢迎对主题提出各种修改意见。', 'theme-textdomain' ),
		'type' => 'info'
	);
	$options[] = array(
		'name' => __( '特别鸣谢', 'theme-textdomain' ),
		'desc' => __( '代码来源在代码中都有注释，感谢@Louie @Inlojv等大触的帮助。', 'theme-textdomain' ),
		'type' => 'info'
	);

	return $options;
}