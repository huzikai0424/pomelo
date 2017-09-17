<?php
if(!defined('THEME_URL'))   define('THEME_URL',get_template_directory_uri().'/');
define( 'OPTIONS_FRAMEWORK_DIRECTORY', get_template_directory_uri() . '/inc/' );
require_once dirname( __FILE__ ) . '/inc/options-framework.php';
if(is_admin()) require_once('player_setting.php');
//特色图片
add_theme_support('post-thumbnails');
//设置特色图片尺寸
set_post_thumbnail_size(800, 600, true);
//恢复后台友情链接
add_filter('pre_option_link_manager_enabled','__return_true');
/*禁用默认emoji表情*/
function disable_emojis() {
    global $wp_version;
    if ($wp_version >= 4.2) {
        remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
        remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
        remove_action( 'wp_print_styles', 'print_emoji_styles' );
        remove_action( 'admin_print_styles', 'print_emoji_styles' );
        remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
        remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
        remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
        add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
    }
}
add_action( 'init', 'disable_emojis' );
//去掉多余的head链接
remove_action( 'wp_head', 'wp_generator' );   
remove_action( 'wp_head', 'rsd_link' );   
remove_action( 'wp_head', 'wlwmanifest_link' ); 
remove_action( 'wp_head', 'wp_resource_hints', 2 );
add_filter('rest_enabled', '__return_false');
add_filter('rest_jsonp_enabled', '__return_false');
remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 );
// 去除顶部工具栏
show_admin_bar(false);
//自定义登录页面的LOGO图片
function my_custom_login_logo() {
    if(pomelo_option('admin-background')){
        $bg="body{background:url(".pomelo_option('admin-background').") no-repeat;background-size:cover;}";
        
    }
    else $bg="";
    echo '<style type="text/css">
        '.$bg.'
        .login h1 a {
        background-image:url("'.pomelo_option('head').'") !important;
        height: 220px !important; 
        width: 220px !important;
        border: 6px solid #FFFFFF;
        border-radius: 50%;
        background-size: 220px 220px;
        }
        .login label{
            font-size: 13px;
            font-family: "Microsoft YaHei";
        }
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px white inset;
        }
        .login input[type=text] {
        font-size: 16px !important;
        }
        input#wp-submit{
            width: 100%;
            margin-top: 20px;
        }
        .login form .input, .login input[type=text]{
            font-size: 18px;
        }
        input#rememberme{
            border-radius: 50%;
        }
    </style>';
}
add_action('login_head', 'my_custom_login_logo');

//自定义登录页面的LOGO提示为网站名称
add_filter('login_headertitle', create_function(false,"return get_bloginfo('name');"));
//自定义登录页面logo的链接
function wpjam_login_headerurl(){
    return home_url();
}
add_filter('login_headerurl', 'wpjam_login_headerurl');

// 评论回复邮件通知
function comment_mail_notify($comment_id) {
  $comment = get_comment($comment_id);
  $parent_id = $comment->comment_parent ? $comment->comment_parent : '';
  $spam_confirmed = $comment->comment_approved;
  if (($parent_id != '') && ($spam_confirmed != 'spam')) {
    $mail_username = pomelo_option('mail_username') ? pomelo_option('mail_username') : "admin";
    $wp_email = $mail_username.'@' . preg_replace('#^www.#', '', strtolower($_SERVER['SERVER_NAME'])); //e-mail 发出点, no-reply 可改为可用的 e-mail.
    $to = trim(get_comment($parent_id)->comment_author_email);
    $subject = '您在 [' . get_option("blogname") . '] 的留言有了回复';
    $message = '
    <table border="1" cellpadding="0" cellspacing="0" width="600" align="center" style="border-collapse: collapse; border-style: solid; border-width: 1;border-color:#ddd;">
    <tbody>
          <tr>
            <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" height="48" >
                    <tbody><tr>
                        <td width="100" align="center" style="border-right:1px solid #ddd;">
                            <a href="'.home_url().'/" target="_blank">'. get_option("blogname") .'</a></td>
                        <td width="300" style="padding-left:20px;"><strong>您有一条来自 <a href="'.home_url().'" target="_blank" style="color:#6ec3c8;text-decoration:none;">' . get_option("blogname") . '</a> 的回复</strong></td>
                        </tr>
                    </tbody>
                </table>
            </td>
          </tr>
          <tr>
            <td  style="padding:15px;"><p><strong>' . trim(get_comment($parent_id)->comment_author) . '</strong>, 你好!</span>
              <p>你在《' . get_the_title($comment->comment_post_ID) . '》的留言:</p><p style="border-left: 3px solid #ddd;color: #999;background-color: #f5f5f5;padding: 10px 15px;">'
        . trim(get_comment($parent_id)->comment_content) . '</p><p>
              ' . trim($comment->comment_author) . ' 给你的回复:</p><p style="border-left: 3px solid #ddd;color: #999;background-color: #f5f5f5;padding: 10px 15px;">'
        . trim($comment->comment_content) . '</p>
        <center><a href="' . htmlspecialchars(get_comment_link($parent_id)) . '" target="_blank" style="background-color:#6ec3c8; border-radius:10px; display:inline-block; color:#fff; padding:15px 20px 15px 20px; text-decoration:none;margin-top:20px; margin-bottom:20px;">点击查看完整内容</a></center>
            </td>
          </tr>
          <tr>
            <td align="center" valign="center" height="38" style="font-size:0.8rem; color:#999;">Copyright © '.get_option("blogname").'</td>
          </tr>
          </tbody>
  </table>';
      $from = "From: \"" . get_option('blogname') . "\" <$wp_email>";
      $headers = "$from\nContent-Type: text/html; charset=" . get_option('blog_charset') . "\n";
      wp_mail( $to, $subject, $message, $headers );
  }
}
add_action('comment_post', 'comment_mail_notify');
//修改默认发送人
function new_mail_from($old) {
    $mail_username = pomelo_option('mail_username') ? pomelo_option('mail_username') : "admin";
    return $mail_username.'@' . preg_replace('#^www.#', '', strtolower($_SERVER['SERVER_NAME']));
}
function new_mail_from_name($old) {
    return get_option("blogname");
}
add_filter('wp_mail_from', 'new_mail_from');
add_filter('wp_mail_from_name', 'new_mail_from_name');
/*启用自己的表情*/
/**
 * Comments on the face
 */
add_filter('smilies_src','custom_smilies_src',1,10);
function custom_smilies_src ($img_src, $img, $siteurl){
    return get_bloginfo('template_directory').'/images/smilies/'.$img;
}
function disable_emojis_tinymce( $plugins ) {
    return array_diff( $plugins, array( 'wpemoji' ) );
}
function smilies_reset() {
    global $wpsmiliestrans, $wp_smiliessearch, $wp_version;
    if ( !get_option( 'use_smilies' ) || $wp_version < 4.2)
        return;
    $wpsmiliestrans = array(
    ':mrgreen:' => 'icon_mrgreen.png',
    ':exclaim:' => 'icon_exclaim.png',
    ':neutral:' => 'icon_neutral.png',
    ':twisted:' => 'icon_twisted.png',
      ':arrow:' => 'icon_arrow.png',
        ':eek:' => 'icon_eek.png',
      ':smile:' => 'icon_smile.png',
   ':confused:' => 'icon_confused.png',
       ':cool:' => 'icon_cool.png',
       ':evil:' => 'icon_evil.png',
    ':biggrin:' => 'icon_biggrin.png',
       ':idea:' => 'icon_idea.png',
    ':redface:' => 'icon_redface.png',
       ':razz:' => 'icon_razz.png',
   ':rolleyes:' => 'icon_rolleyes.png',
       ':wink:' => 'icon_wink.png',
        ':cry:' => 'icon_cry.png',
  ':surprised:' => 'icon_surprised.png',
        ':lol:' => 'icon_lol.png',
        ':mad:' => 'icon_mad.png',
        ':sad:' => 'icon_sad.png',
    );
}
smilies_reset();
//返回表情标签
function fa_get_wpsmiliestrans(){
    global $wpsmiliestrans;
    $wpsmilies = array_unique($wpsmiliestrans);
    foreach($wpsmilies as $alt => $src_path){
        $output .= '<a class="add-smily" data-smilies="'.$alt.'"><img class="wp-smileys" src="'.get_bloginfo('template_directory').'/images/smilies/'.$src_path.'" /></a>';
    }
    return $output;
}
//文章编辑器中新增表情按钮
function fa_smilies_custom_button($context) {
    $context .= '<style>img.wp-smileys{height: auto !important;width:auto !important}.smilies-wrap{background:#fff;border: 1px solid #ccc;box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.24);padding: 5px 0;position: absolute;display:none}.smilies-wrap img{height:24px;width:24px;cursor:pointer;} .is-active.smilies-wrap{display:block}</style><a id="insert-media-button" style="position:relative" class="button insert-smilies add_smilies" title="添加表情" data-editor="content" href="javascript:;">
<span class="dashicons dashicons-admin-users"></span>添加表情</a><div class="smilies-wrap">'. fa_get_wpsmiliestrans() .'</div><script>jQuery(document).ready(function(){jQuery(document).on("click", ".insert-smilies",function() { if(jQuery(".smilies-wrap").hasClass("is-active")){jQuery(".smilies-wrap").removeClass("is-active");}else{jQuery(".smilies-wrap").addClass("is-active");}});jQuery(document).on("click", ".add-smily",function() { send_to_editor(" " + jQuery(this).data("smilies") + " ");jQuery(".smilies-wrap").removeClass("is-active");return false;});});</script>';
    return $context;
}
add_action('media_buttons_context', 'fa_smilies_custom_button');
//友链相关
function get_the_link_items($id = null){
    $bookmarks = get_bookmarks('orderby=date&category=' .$id );
    $output = '';
    if ( !empty($bookmarks) ) {
        $output .= '<ul class="link-info">';
        foreach ($bookmarks as $bookmark) {
            if($bookmark->link_image)
                $img_src="<div class='links-box'><div class='links-img'><img src='".$bookmark->link_image."' alt></div>";
            else
                $img_src="";
            $output .=  '<li class="link-item"><span class="link-name">'. $bookmark->link_name .'</span><a class="link-item-inner effect-apollo" href="' . $bookmark->link_url . '" target="_blank" >'.$img_src.'<div class="link-des" title="'.$bookmark->link_description.'"><span>'. wp_trim_words($bookmark->link_description,22) .'</span></div></div></a></li>';
        }
        $output .= '</ul>';
    }
    return $output;
}
     function get_link_items(){
    $linkcats = get_terms( 'link_category' );
    if ( !empty($linkcats) ) {
        foreach( $linkcats as $linkcat){            
            $result .=  '<h3 class="link-title">'.$linkcat->name.'</h3>';
            if( $linkcat->description ) $result .= '<div class="link-description">' . $linkcat->description . '</div>';
            $result .=  get_the_link_items($linkcat->term_id);
        }
    } else {
        $result = get_the_link_items();
    }
    return $result;
}
//管理员最近登录
add_action( 'wp_login', 'set_last_login' );
add_action( 'wp_logout', 'set_last_login_logout' );
function set_last_login() {
    $session_destroy=ini_get('session.gc_maxlifetime');
    update_user_meta( 1, 'last_login', time()+$session_destroy);
}
function set_last_logout() {
   update_user_meta( 1, 'last_login', time());
}
function last_login() {
    $time = get_user_meta( 1, 'last_login' )[0];
    if($time>time())
        $time=time();
    echo human_time_diff( $time );
}
//点赞功能
add_action('wp_ajax_nopriv_post_zan','post_zan');
add_action('wp_ajax_post_zan','post_zan');
function post_zan(){
    global $wpdb,$post;
    $id = $_POST["um_id"];
    $action = $_POST["um_action"];
    if ( $action == 'ding'){
        $specs_raters = get_post_meta($id,'post_zan',true);
        $expire = time() + 99999999;
        $domain = ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false; // make cookies work with localhost
        setcookie('post_zan_'.$id,$id,$expire,'/',$domain,false);
        if (!$specs_raters || !is_numeric($specs_raters)) {
            update_post_meta($id, 'post_zan', 1);
        } 
        else {
            update_post_meta($id, 'post_zan', ($specs_raters + 1));
        }
        echo get_post_meta($id,'post_zan',true);
    } 
    die;
}

//文章形式
add_theme_support( 'post-formats', array( 'standard', 'image','audio','status') );
/**
 * WordPress 首页排除某些文章形式（Post Formats）
 * https://www.wpdaxue.com/exclude-post-formats-from-homepage.html
 */
function exclude_post_formats_from_homepage( $query ) {
    if( $query->is_main_query() && $query->is_home() ) { //判断首页主查询
        $tax_query = array( array( 
            'taxonomy' => 'post_format',
            'field' => 'slug',
            'terms' => array(
                //请根据需要保留要排除的文章形式
                'post-format-aside',
                'post-format-audio',
                'post-format-chat',
                'post-format-gallery',
                'post-format-image',
                'post-format-link',
                'post-format-quote',
                'post-format-status',
                'post-format-video'
                ),
            'operator' => 'NOT IN',
            ) );
        $query->set( 'tax_query', $tax_query );
    }
}
add_action( 'pre_get_posts', 'exclude_post_formats_from_homepage' );
add_post_type_support('page','post-formats');
/*
*comment_callback
*
*/
if(!function_exists('theme_comment')){
        function theme_comment($comment, $args, $depth){
            $GLOBALS['comment'] = $comment;
            ?>
                <li <?php comment_class(); ?> id="comment-<?php echo esc_attr(comment_ID()); ?>">
                    <div class="comment-body">
                        <div class="comment-author vcard">
                        <?php echo get_avatar( $comment, $args['avatar_size'] ); ?>
                            <cite class="fn">
                                <a href="<?php echo comment_author_url()?>" target="_blank"><?php echo comment_author();?></a>
                                <?php if(user_can($comment->user_id, 1)){echo '<a title="博主认证" class="admin">博主</a>';} ?>
                            </cite>
                            <span class="says">说道:</span>
                            <?php echo theme_get_useragent($comment->comment_agent);?>
                        </div>
                        <div class="comment-meta"><?php comment_date('Y-m-d G:i'); ?></div>
                        <?php comment_text(); ?>
                        <div class="reply"><?php comment_reply_link(array_merge($args, array('depth' => $depth, 'max_depth' => $args['max_depth']))); ?></div>
                    </div>
                </li>
            <?php
        }
    }
// 评论添加@ 
add_filter( 'get_comment_text' , 'comment_add_at', 20, 2); 
function comment_add_at( $get_comment_text, $comment = '') {
  if( $comment->comment_parent > 0) {
    $get_comment_text = '<a class="at" href="#comment-' . $comment->comment_parent . '">@'.get_comment_author( $comment->comment_parent ) . ' </a>' . $get_comment_text;
  }
  return $get_comment_text; // 返回添加@的函数,名称不能自定义
}
/**
 * 修改后台头像 
 * 若有qq字段则显示qq头像，若没有则显示gravatar 
 * @INLOJV http://www.inlojv.com
 */
add_filter( 'get_avatar', 'my_change_avatar', 11, 3 );
function my_change_avatar($avatar){
    global $comment;
    if( get_comment_meta( $comment->comment_ID, 'new_field_qq', true ) && preg_match('/^\d{6,11}$/',get_comment_meta( $comment->comment_ID, 'new_field_qq', true ))){
        $qq_number =  get_comment_meta( $comment->comment_ID, 'new_field_qq', true );
        $qqavatar = file_get_contents('http://ptlogin2.qq.com/getface?appid=1006102&imgtype=3&uin='.$qq_number);
        preg_match('/http:(.*?)&t/',$qqavatar,$m); // 匹配 http: 和 &t 之间的字符串
        return '<img src="'.stripslashes($m[1]).'" class="avatar avatar-40 photo" width="40" height="40"  alt="qq_avatar" />';
    }else{
        return $avatar ;
    }   
}

/**
 * 为没有Gravatar头像的用户加载随机头像
 * @author INLOJV
 * @URI  http://www.inlojv.com/20170521randomgravatar.html ‎
 * 
 */
add_filter( 'get_avatar' , 'inlojv_custom_avatar' , 10 , 5 );
function inlojv_custom_avatar( $avatar, $id_or_email, $size, $default, $alt) {
        global $comment,$current_user;
        // $id_or_email的值：后台右上角登录用户头像为id，其他为邮箱，下面做一个判断
        $current_email =  is_int($id_or_email) ? get_user_by( 'ID', $id_or_email )->user_email : $id_or_email;
        
        $email = !empty($comment->comment_author_email) ? $comment->comment_author_email : $current_email ;

        $random_avatar_arr = array(
            '//wx1.sinaimg.cn/square/6b002b97gy1ffs6ulm8ojj20690690sl.jpg',
            '//wx1.sinaimg.cn/square/6b002b97gy1ffs6ulfp76j2069069t8p.jpg',
            '//wx1.sinaimg.cn/square/6b002b97gy1ffs6ukuo5dj2069069a9w.jpg',
            '//wx1.sinaimg.cn/square/6b002b97gy1ffs6ujijfoj206z05l746.jpg',
            '//wx1.sinaimg.cn/square/6b002b97gy1ffs6uimd6zj207705edfr.jpg'
        );

        $email_hash = md5(strtolower(trim($email)));

        $random_avatar = array_rand($random_avatar_arr,1);
        
        $src = $random_avatar_arr[$random_avatar] ;
        
        // JV提示：d参数404 onerror 方法 - 速度最快
        $avatar = "<img alt='{$alt}' src='//secure.gravatar.com/avatar/{$email_hash}?d=404' onerror='javascript:this.src=\"{$src}\";this.onerror=null;' class='avatar avatar-{$size} photo' height='{$size}' width='{$size}' />";
        
        // JV提示：d参数default_img 方法 - 速度稍逊
        // $src = urlencode( $src );
        //$avatar = "<img alt='{$alt}' src='//secure.gravatar.com/avatar/{$email_hash}?d={$src}' class='avatar avatar-{$size} photo' height='{$size}' width='{$size}' />";

    return $avatar;
}
//新增QQ字段
add_action('wp_insert_comment','_insert_qq_field',10,2);
function _insert_qq_field($comment_ID,$commmentdata){
    $qq = isset($_POST['new_field_qq']) ? $_POST['new_field_qq'] : false;  
    update_comment_meta($comment_ID,'new_field_qq',$qq);
}
// 后台评论中显示qq字段
add_filter( 'manage_edit-comments_columns', 'add_comments_columns' );
add_action( 'manage_comments_custom_column', 'output_comments_qq_columns', 10, 2 );
function add_comments_columns( $columns ){
    $columns[ 'new_field_qq' ] = __( 'QQ号' );        // 新增列名称
    return $columns;
}
function output_comments_qq_columns( $column_name, $comment_id ){
    switch( $column_name ) {
        case "new_field_qq" :
         // 这是输出值，可以拿来在前端输出，这里已经在钩子manage_comments_custom_column上输出了
        echo get_comment_meta( $comment_id, 'new_field_qq', true );
        break;
    }
}
//禁止加载默认jq库
function my_enqueue_scripts() {
    wp_deregister_script('jquery');
}
add_action( 'wp_enqueue_scripts', 'my_enqueue_scripts', 1 );
//引入脚本
function theme_enqueue_scripts() { 
    if(!is_admin()){
        wp_enqueue_style('stylesheet', THEME_URL.'style.css', array(), null ); 
        wp_enqueue_style('highlight',  THEME_URL.'css/monokai-sublime.css', array(), null ); 
        wp_enqueue_script('jquery',    THEME_URL.'js/jquery-3.2.1.min.js' , array(),'3.2.1', true); 
        if(pomelo_option('input')['one']||pomelo_option('input')['two']){
            wp_enqueue_script('input', THEME_URL.'js/input.min.js',array(),false,true);
        }
        wp_enqueue_script('highlight', THEME_URL.'js/highlight.pack.js' , array(), false,true);  
        wp_enqueue_script('theme_js',  THEME_URL.'js/script.js' , array(), '1.0', true);
        // 脚本本地化：后端给前端准备的变量
        wp_localize_script( 'theme_js', 'theme_var', 
            array(
                'themeurl'        => get_template_directory_uri().'/',
                'homeurl'         => site_url().'/',
                'ajax_url'        => admin_url('admin-ajax.php'),
                'order'           => get_option('comment_order'),
                'formpostion'     => 'bottom', //默认为bottom，如果你的表单在顶部则设置为top。
                'input_color'     => pomelo_option('input')['one'],
                'input_shake'     => pomelo_option('input')['two'],
                'blog_start_day'  => pomelo_option('blog_start_day'),
                'blog_time_set'   => pomelo_option('time-set'),
                'debug'           => pomelo_option('debug'),
                'change_title1'   => pomelo_option('change_title1'),
                'change_title2'   => pomelo_option('change_title2'),
                'scrollbar'       => pomelo_option('scrollbar'),
                'hitokoto'        => pomelo_option('hitokoto'),
                'music_open'      => get_option('pomelo_player_setting')['music_open'],
                'autoplay'        => get_option('pomelo_player_setting')['autoplay'],
                'is_admin'        => is_user_logged_in()
            )
        );
    }
}
//注销直接跳转原先的页面
function logout_redirect($logouturl, $redir) {
if (isset( $_SERVER["HTTPS"] ) AND $_SERVER["HTTPS"] == "on" ) {
    $http='https://';
}
else
    $http='http://';
$redir = $http.$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
return $logouturl . '&redirect_to=' . urlencode($redir);
}

add_filter('logout_url', 'logout_redirect', 10, 3);

add_action( 'wp_enqueue_scripts', 'theme_enqueue_scripts' );
// 纯英文日文评论拦截
function scp_comment_post( $incoming_comment ) {
    $pattern = '/[一-龥]/u';
    if(!preg_match($pattern, $incoming_comment['comment_content'])) {// 禁止全英文评论
        fa_ajax_comment_err( "写点中文吧！ You should  enter some Chinese characters !" );
    }
    $pattern = '/[あ-んア-ン]/u';
    if(preg_match($pattern, $incoming_comment['comment_content'])) {// 禁止日文评论
        fa_ajax_comment_err( "中国語入力してください!" );
    }
  return( $incoming_comment );
}
add_filter('preprocess_comment', 'scp_comment_post');

//ajax评论@bigfa
if(!function_exists('fa_ajax_comment_err')) :

    function fa_ajax_comment_err($a) {
        header('HTTP/1.0 500 Internal Server Error');
        header('Content-Type: text/plain;charset=UTF-8');
        echo $a;
        exit;
    }

endif;

if(!function_exists('fa_ajax_comment_callback')) :

    function fa_ajax_comment_callback($comment, $args, $depth){
        $comment = wp_handle_comment_submission( wp_unslash( $_POST ) );
        if ( is_wp_error( $comment ) ) {
            $data = $comment->get_error_data();
            if ( ! empty( $data ) ) {
                fa_ajax_comment_err($comment->get_error_message());
            } else {
                exit;
            }
        }
        $user = wp_get_current_user();
        do_action('set_comment_cookies', $comment, $user);
        $GLOBALS['comment'] = $comment; 
        ?>
        <li <?php comment_class(); ?> id="comment-<?php echo esc_attr(comment_ID()); ?>">
            <div class="comment-body">
                <div class="comment-author vcard">
                    <?php  echo get_avatar( $comment, $args['avatar_size'] ); ?>
                        <cite class="fn">
                            <a href="<?php echo comment_author_url()?>"><?php echo comment_author();?></a>
                            <?php if(user_can($comment->user_id, 1)){echo '<a title="博主认证" class="admin">博主</a>';} ?>
                        </cite>
                        <span class="says">说道:</span>
                        <?php echo theme_get_useragent($comment->comment_agent);?>
                        </div>
                        <div class="comment-meta"><?php comment_date('Y-m-d G:i'); ?></div>
                        <?php comment_text(); ?>
                        <div class="reply"><?php comment_reply_link(array_merge($args, array('depth' => $depth, 'max_depth' => $args['max_depth']))); ?></div>
            </div>
        </li>
        <?php die();
    }

endif;
add_action('wp_ajax_nopriv_ajax_comment', 'fa_ajax_comment_callback');
add_action('wp_ajax_ajax_comment', 'fa_ajax_comment_callback');


/**
 * 获取用户UA信息
 */
// 浏览器信息
function theme_get_browsers($ua){
  $title = 'unknow';
  $icon = 'unknow'; 
    if (preg_match('#MSIE ([a-zA-Z0-9.]+)#i', $ua, $matches)) {
    $title = 'Internet Explorer '. $matches[1];
    if ( strpos($matches[1], '7') !== false || strpos($matches[1], '8') !== false)
      $icon = 'ie8';
    elseif ( strpos($matches[1], '9') !== false)
      $icon = 'ie9';
    elseif ( strpos($matches[1], '10') !== false)
      $icon = 'ie10';
    else
      $icon = 'ie';
    }elseif (preg_match('#Edge/([a-zA-Z0-9.]+)#i', $ua, $matches)){
    $title = 'Microsoft Edge '. $matches[1];
        $icon = 'edge';
  }elseif (preg_match('#Firefox/([a-zA-Z0-9.]+)#i', $ua, $matches)){
    $title = 'Firefox '. $matches[1];
        $icon = 'firefox';
  }elseif (preg_match('#CriOS/([a-zA-Z0-9.]+)#i', $ua, $matches)){
    $title = 'Chrome for iOS '. $matches[1];
    $icon = 'crios';
  }elseif (preg_match('#Chrome/([a-zA-Z0-9.]+)#i', $ua, $matches)) {
    $title = 'Google Chrome '. $matches[1];
    $icon = 'chrome';
    if (preg_match('#OPR/([a-zA-Z0-9.]+)#i', $ua, $matches)) {
      $title = 'Opera '. $matches[1];
      $icon = 'opera15';
      if (preg_match('#opera mini#i', $ua)) $title = 'Opera Mini'. $matches[1];
    }
  }elseif (preg_match('#Safari/([a-zA-Z0-9.]+)#i', $ua, $matches)) {
    $title = 'Safari '. $matches[1];
    $icon = 'safari';
  }elseif (preg_match('#Opera.(.*)Version[ /]([a-zA-Z0-9.]+)#i', $ua, $matches)) {
    $title = 'Opera '. $matches[2];
    $icon = 'opera';
    if (preg_match('#opera mini#i', $ua)) $title = 'Opera Mini'. $matches[2];   
  }elseif (preg_match('#Maxthon( |\/)([a-zA-Z0-9.]+)#i', $ua,$matches)) {
    $title = 'Maxthon '. $matches[2];
    $icon = 'maxthon';
  }elseif (preg_match('#360([a-zA-Z0-9.]+)#i', $ua, $matches)) {
    $title = '360 Browser '. $matches[1];
    $icon = '360se';
  }elseif (preg_match('#SE 2([a-zA-Z0-9.]+)#i', $ua, $matches)) {
    $title = 'SouGou Browser 2'.$matches[1];
    $icon = 'sogou';
  }elseif (preg_match('#UCWEB([a-zA-Z0-9.]+)#i', $ua, $matches)) {
    $title = 'UCWEB '. $matches[1];
    $icon = 'ucweb';
  }elseif(preg_match('#wp-(iphone|android)/([a-zA-Z0-9.]+)#i', $ua, $matches)){ // 1.2 增加 wordpress 客户端的判断
    $title = 'wordpress '. $matches[2];
    $icon = 'wordpress';
  }
  
  return array(
    $title,
    $icon
  );
}

// 操作系统信息
function theme_get_os($ua){
  $title = 'unknow';
  $icon = 'unknow';
  if (preg_match('/win/i', $ua)) {
    if (preg_match('/Windows NT 10.0/i', $ua)) {
      $title = "Windows 10";
      $icon = "windows_win10";
    }elseif (preg_match('/Windows NT 6.1/i', $ua)) {
      $title = "Windows 7";
      $icon = "windows_win7";
    }elseif (preg_match('/Windows NT 5.1/i', $ua)) {
      $title = "Windows XP";
      $icon = "windows";
    }elseif (preg_match('/Windows NT 6.2/i', $ua)) {
      $title = "Windows 8";
      $icon = "windows_win8";
    }elseif (preg_match('/Windows NT 6.3/i', $ua)) {
      $title = "Windows 8.1";
      $icon = "windows_win8";
    }elseif (preg_match('/Windows NT 6.0/i', $ua)) {
      $title = "Windows Vista";
      $icon = "windows_vista";
    }elseif (preg_match('/Windows NT 5.2/i', $ua)) {
      if (preg_match('/Win64/i', $ua)) {
        $title = "Windows XP 64 bit";
      } else {
        $title = "Windows Server 2003";
      }
      $icon = 'windows';
    }elseif (preg_match('/Windows Phone/i', $ua)) {
      $matches = explode(';',$ua);
      $title = $matches[2];
      $icon = "windows_phone";
    }
  }elseif (preg_match('#iPod.*.CPU.([a-zA-Z0-9.( _)]+)#i', $ua, $matches)) {
    $title = "iPod ".$matches[1];
    $icon = "iphone";
  } elseif (preg_match('#iPhone OS ([a-zA-Z0-9.( _)]+)#i', $ua, $matches)) {// 1.2 修改成 iphone os 来判断 
    $title = "Iphone ".$matches[1];
    $icon = "iphone";
  } elseif (preg_match('#iPad.*.CPU.([a-zA-Z0-9.( _)]+)#i', $ua, $matches)) {
    $title = "iPad ".$matches[1];
    $icon = "ipad";
  } elseif (preg_match('/Mac OS X.([0-9. _]+)/i', $ua, $matches)) {
    if(count(explode(7,$matches[1]))>1) $matches[1] = 'Lion '.$matches[1];
    elseif(count(explode(8,$matches[1]))>1) $matches[1] = 'Mountain Lion '.$matches[1];
    $title = "Mac OSX ".$matches[1];
    $icon = "macos";
  } elseif (preg_match('/Macintosh/i', $ua)) {
    $title = "Mac OS";
    $icon = "macos";
  } elseif (preg_match('/CrOS/i', $ua)){
    $title = "Google Chrome OS";
    $icon = "chrome";
  }elseif (preg_match('/Linux/i', $ua)) {
    $title = 'Linux';
    $icon = 'linux';
    if (preg_match('/Android.([0-9. _]+)/i',$ua, $matches)) {
      $title= $matches[0];
      $icon = "android";
    }elseif (preg_match('#Ubuntu#i', $ua)) {
      $title = "Ubuntu Linux";
      $icon = "ubuntu";
    }elseif(preg_match('#Debian#i', $ua)) {
      $title = "Debian GNU/Linux";
      $icon = "debian";
    }elseif (preg_match('#Fedora#i', $ua)) {
      $title = "Fedora Linux";
      $icon = "fedora";
    }
  }
  return array(
    $title,
    $icon
  );
}

function theme_get_useragent($ua){
    $browser = theme_get_browsers($ua);
    $os = theme_get_os($ua);
    return '<span class="useragent-info">来自 '. $browser[0] .'&nbsp;in&nbsp;'. $os[0] .' </span>';
}
//不知道有啥用
function reset_password_message( $message, $key ) { 
    if ( strpos($_POST['user_login'], '@') ) { $user_data = get_user_by('email', trim($_POST['user_login'])); } else { $login = trim($_POST['user_login']); $user_data = get_user_by('login', $login); } $user_login = $user_data->user_login; $msg = __('有人要求重设如下帐号的密码：'). "\r\n\r\n"; $msg .= network_site_url() . "\r\n\r\n"; $msg .= sprintf(__('用户名：%s'), $user_login) . "\r\n\r\n"; $msg .= __('若这不是您本人要求的，请忽略本邮件，一切如常。') . "\r\n\r\n"; $msg .= __('要重置您的密码，请打开下面的链接：'). "\r\n\r\n"; $msg .= network_site_url("wp-login.php?action=rp&key=$key&login=" . rawurlencode($user_login), 'login') ; return $msg; } add_filter('retrieve_password_message', reset_password_message, null, 2);