<?php
require("Meting.php");
//注册设置
add_action('admin_init','pomelo_setting');
function pomelo_setting(){
  register_setting('pomelo_setting_group','pomelo_player_setting');
}

//音乐API解析
use Metowolf\Meting;
$API = new Meting('netease');
function get_playlist($id,$type){
    global $API;
	if($type==1)
        $data=$API->format(true)->playlist((int)$id);
    else if($type==2)
        $data=$API->format(true)->album((int)$id);
    else return false;
    if($data)
        $result=json_decode($data,true);
    else 
        return false;
	$json=array();
    for($i=0;$i<count($result);$i++){
        $new_artist="";
        for($j=0;$j<count($result[$i]['artist']);$j++){
            if($j==0)
                $new_artist=$result[$i]['artist'][$j];
            else
                $new_artist=$new_artist."/".$result[$i]['artist'][$j];
        }
		$new_pic=json_decode($API->pic($result[$i]['pic_id']),true);
		$json[$i]['id']=$result[$i]['id'];
		$json[$i]['name']=$result[$i]['name'];
		$json[$i]['artist']=$new_artist;
		$json[$i]['pic_url']=str_replace("http://","https://",$new_pic['url']);
		$json[$i]['lyric_url']=THEME_URL."lrc.php?id=".$result[$i]['lyric_id'];
		$json[$i]['time']=$result[$i]['time'];
		}
	   return $json;
}
function music_default(){
    $playlist='[
    {
        "id": 139774,
        "name": "The truth that you leave",
        "artist": "Pianoboy",
        "pic_url": "https:\/\/p3.music.126.net\/9idkdzbel_-lYBP7Dv_dVQ==\/102254581395289.jpg?param=300z300&quality=100",
        "lyric_url": "http:\/\/localhost\/wordpress\/wp-content\/themes\/pomelo\/lrc.php?id=139774",
        "time": 223
    }
]';
  return $playlist;
}
//注册播放器后台
add_action('admin_menu', 'register_custom_menu_page');
function register_custom_menu_page() {
	add_menu_page('主题音乐设置', '播放器设置', 'manage_options','player_Setting','playersettingpage');

}
//播放器后台页面
/**
 * Setting page
 */
// 在后台加载css
function player_css() {
    wp_enqueue_style( 'player_setting', get_template_directory_uri() . '/css/player_setting.css' ); 
}
add_action( 'admin_enqueue_scripts', 'player_css' );

function playersettingpage(){ ?>
	<script>
		function check(){
			   var name = document.getElementById("music-type").value;
			   if(name ==  null || name == ''){
					alert("请选择类型!");
					return false;
			   }
			   return true;
			}
	</script>
  <div id="pomelo-player-body">
    <div class="pomelo-player-center">
      <h2>Pomelo 音乐播放器</h2>
      <div class="pomelo-search-box">
        <form action="<?php echo $_SERVER["REQUEST_URI"]; ?>" method="post" onsubmit="return check()">
          <select id="music-type" name="select">
              <option value="">选择类型</option>
              <option value="1">歌单</option>
              <option value="2">专辑</option>
          </select> 
          <input type="text" name="mid" id="mid" value="<?php echo isset($_POST['mid'])?$_POST['mid']:''; ?>"  placeholder="歌单或专辑ID" required />
          <input class="button" id="button" name="submit" type="submit" value="获取">
          <input type="hidden" name="getjson_to" value="<?php echo $_SERVER['REQUEST_URI']; ?>" />
        </form>
      </div>
      <form method="post" action="options.php">
      	<?php 
        settings_fields('pomelo_setting_group');
        $pomelo = get_option('pomelo_player_setting');
        $input = isset($_POST['mid'])?$_POST['mid']:''; 
        $type = isset($_POST['select'])?$_POST['select']:''; 
		$result="";
		if( $input && $type ){
			$result=json_encode(get_playlist($input,$type),JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
		}
			
		//echo "input=".$input."<br>";
        //echo "type=".$type;
      	?>
	   	  <textarea class="music-json" rows="8" cols="100" name="pomelo_player_setting[playlist]" readonly="readonly"><?php $playlist=empty($result)?$pomelo['playlist']:$result; echo $playlist;?></textarea>
	      <div class="pomelo-other">
			<input type="checkbox" name="pomelo_player_setting[music_open]" class="shuffle" value="1"  <?php if ($pomelo['music_open']) echo "checked";?>/><span>播放器开关</span>
	        <input type="checkbox" name="pomelo_player_setting[autoplay]"   class="autoplay" value="1" <?php if ($pomelo['autoplay']) echo "checked";?> /><span>自动播放</span>
		  </div>
        <input type="submit" name="save" class="button" value="保存设置" />
      </form>
		
      <?php if ( isset($_REQUEST['settings-updated']) ){
			echo '<div id="message" class="updated"><p>保存成功了(oﾟ▽ﾟ)o </p></div>';
      }?>
      <hr/>
      <div class="pomelo-ps">
      <p>歌单：http://music.163.com/#/playlist?id=<code>469469926</code>（数字即为歌单ID）</p>
      <p>专辑：http://music.163.com/#/album?id=<code>2857009</code>（数字即为专辑ID）</p>
      <p>如果获取歌单为空，那么请检查ID是否输入正确；如果歌曲不能正常不播放，请重新获取歌单数据，检查PHP版本不低于5.5。</p>
	  <p>获取到歌单别忘记点击<code>保存设置</code>哦~</p>
      <hr>
      <p>最后更新于2017.07.31 @<a href="https://cherryml.com">痴情的小五</a></p>
      </div>
    </div>
  </div>
<?php
}