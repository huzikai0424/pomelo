//打字礼花特效
if(theme_var.input_color||theme_var.input_shake){
	POWERMODE.colorful = Boolean(theme_var.input_color); // ture 为启用礼花特效
	POWERMODE.shake = Boolean(theme_var.input_shake); // false 为禁用震动特效
	document.body.addEventListener('input', POWERMODE);
}
function l(){
    history.replaceState( // 刷新历史点保存的数据，给state填入正确的内容
    {   url: window.document.location.href,
        title: window.document.title,
        html: $(document).find("#wrap").html(), // 抓取主体部分outerHTML用于呈现新的主体。
    }, window.document.title, document.location.href);

}
// 函数：页面载入初始一次，解决Chrome浏览器初始载入时产生ajax效果的问题,并且监听前进后退事件
function a(){
    window.addEventListener( 'popstate', function( e ){  //监听浏览器后退事件
        if( e.state ){
        	document.title = e.state.title;
            $("#wrap").html( e.state.html ); //也可以用replaceWith ，最后这个html就是上面替换State后里面的html值  
			//rerun();
           //高亮重载 
            $('pre code').each(function(i, block) {
    			hljs.highlightBlock(block);
  			});
			//设置平铺背景
			var window_height=$(window).height();
			$('#bg').height(window_height);
			$(".top").height(window_height);
			$(window).resize(function(){
				var window_height=$(window).height();
				$(".top").height(window_height);
				$('#bg').height(window_height);
			});
		}
    });    
}
function setTime(a){
  	var mydate=new Date();
    var now=Date.parse(mydate.toLocaleDateString());
	var start=Date.parse(a);
	var day=(now-start)/1000/86400;
	var myHours="";
	var myMinutes="";
	var mySeconds="";
    myHours = mydate.getHours();
    myMinutes = parseInt(mydate.getMinutes())<10?"0"+mydate.getMinutes():mydate.getMinutes();
    mySeconds = parseInt(mydate.getSeconds())<10?"0"+mydate.getSeconds():mydate.getSeconds();
    if(!isNaN(day))
    demo.innerText="本博客已运行："+day+"天 "+myHours+"小时 "+myMinutes+"分 "+mySeconds+"秒 ";
    else
  	return false;
}


//进度条
if(!is_mobile()&&(theme_var.scrollbar=="yes")){
	$(window).scroll(function(){
	var s=$(window).scrollTop();
	var a=$(document).height();
	var b=$(window).height();
	var result=parseInt(s/(a-b)*100);
	$("#bar").css("width",result+"%");
	if(result>=0&&result<=19)
	$("#bar").css("background","#cccccc");
	if(result>=20&&result<=39)
	$("#bar").css("background","#50bcb6");
	if(result>=40&&result<=59)
	$("#bar").css("background","#85c440");
	if(result>=60&&result<=79)
	$("#bar").css("background","#f2b63c");
	if(result>=80&&result<=99)
	$("#bar").css("background","#FF0000");
	if(result==100)
	$("#bar").css("background","#5aaadb");
	});
}

// 设置cookie 
function setCookie(a,c){var b=30;var d=new Date();d.setTime(d.getTime()+b*24*60*60*1000);document.cookie=a+"="+escape(c)+";expires="+d.toGMTString()}
// 获取cookie
function getCookie(b){var a,c=new RegExp("(^| )"+b+"=([^;]*)(;|$)");if(a=document.cookie.match(c)){return unescape(a[2])}else{return null}}
//设置QQ信息
	function set_qqinfo(){
	if(getCookie('user_avatar') && getCookie('user_qq')&&getCookie('user_nicename') ){
			$('img#qq_avatar').attr('src',getCookie('user_avatar').substr(6));
			$('input#QQ').val(getCookie('user_qq'));
			$("#comment_info").html(getCookie('user_nicename')+" ▼");
			$("input#author").val(getCookie('user_nicename'));
			$("input#email").val(getCookie('user_qq')+"@qq.com");
	}
}
//判断登陆设备
function is_mobile() {
   	var sUserAgent = navigator.userAgent.toLowerCase();
   	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
   	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
   	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
   	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
   	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
   	var bIsAndroid = sUserAgent.match(/android/i) == "android";
   	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
   	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
   	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
   	    return true;
   	} else {
   	   return false;
   	}
}
//下拉显示
function xl(){

	$("article.index-article").each(function(i){
		var article_height=$("article.index-article .post-info").eq(i).offset().top;
		//滚动前先遍历一遍
		if($(window).height()+$(window).scrollTop()>=article_height)
			$("article.index-article").eq(i).addClass('animation-show');
		$(window).scroll(function(){
			var window_height=$(window).height();
			var scrolltop=$(window).scrollTop();
				//屏幕滚动高度+窗口显示高度>=文章的高度 就显示
				if(scrolltop+window_height>=article_height&&scrolltop)   
					$("article.index-article").eq(i).addClass("animation-show");
				//else if(scrolltop+window_height<article_height&&scrolltop)
					//$("article.index-article").eq(i).removeClass("animation-show");
			});
	});
}
//tip
function showtips(text){
	$("#theme_tips #tips_text").html(text);
	$("#theme_tips").addClass("showtips");
	setTimeout('$("#theme_tips").removeClass("showtips")',2000);
}
//格式化时间
function formatSeconds(value) { 
	var result="";
	var second = parseInt(value);// 秒 
	var minute = 0;
	minute = parseInt(second/60); 
	second = parseInt(second%60); 
	if(minute<=9)
		minute="0"+minute;
	if(second<=9)
		second="0"+second;
	if(second>0)
		result=minute+":"+second;
	else
		result=minute+":"+"00";
	return result;
}//格式化歌词
function parseLyric(lrc) {
    if(lrc === '') return '';
    var lyrics = lrc.split("\n");
    var lrcObj = new Array();
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');
        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj.push([time,clause]);
        }
    }
    return lrcObj;
}
//获取歌词并且显示歌词
function getlyric(url) {
	ul=$("ul#my_lyrics");
	ul.html("<li class='is_playing'>加载歌词中...</li>");
	lycobj='';
	lyric=new Array();
		$.ajax({
		async:true,
		timeout:3000,
		url:url,
		dataType:'text',
		success:function(result){
			lyric=parseLyric(result);
			ul.html('');
			$.each(lyric,function(k){
				ul.append("<li data-no='"+k+"' data-time='"+lyric[k][0]+"' class='lrc-item'>"+lyric[k][1]+"</li>");
			});
		},
		error:function(){
			ul.html("暂无歌词...");
		}
	});
	return;
}

function rerun(){
		//设置平铺背景
	var window_height=$(window).height();
	$('#bg').height(window_height);
	$(".top").height(window_height);
	$(window).resize(function(){
		var window_height=$(window).height();
		$(".top").height(window_height);
		$('#bg').height(window_height);
	});

	//防止图片放大导致撑破原来的模型
	$("article .post-img img").each(function(){
		var my_width=$(this).height();
		$(this).parent().css("height",my_width);
	});
	//隐藏loading动画
	setTimeout('$("div#loading").fadeOut()',800);
	//灯箱
	!function(a){a.extend({viewImage:function(b){var c=a.extend({target:"#post-content img",exclude:"",delay:300},b);a(c.exclude).attr("view-image",!1),a(c.target).click(function(){var b=a(this).attr("src"),d=a(this).attr("href"),e="",f="<style class='view-image-css'>.view-img{position:fixed;background:#fff;background:rgba(255,255,255,.92);width:100%;height:100%;top:0;left:0;text-align:center;padding:2%;z-index:999;cursor: zoom-out}.view-img img,.view-img span{max-width:100%;max-height:100%;position:relative;top:50%;transform: translateY(-50%);}.view-img span{height:2em;color:#AAB2BD;overflow:hidden;position:absolute;top:50%;left:0;right:0;width:120px;text-align:center;margin:-1em auto;}.view-img span:after{content:'';position:absolute;bottom:0;left:0;transform: translateX(-100%);width:100%;height:2px;background:#3274ff;animation:view-img-load .8s -0.1s ease-in-out infinite;}@keyframes view-img-load{0%{transform: translateX(-100%);}100%{transform: translateX(100%);}}</style>";return a(this).attr("view-image")||a(this).attr("rel")?void 0:(e=b?b:d,a("body").append(f+"<div class='view-img'><span>loading...</span></div>"),setTimeout(function(){var b=new Image;b.src=e,b.onload=function(){a(".view-img").html("<img src="+this.src+">")},a(".view-img").click(function(){a(".view-image-css").remove(),a(this).remove()})},c.delay),!1)})}})}(jQuery);
	jQuery.viewImage({
            'target' : '#post-content img', //需要使用ViewImage的图片
            'exclude': '.exclude img',    //要排除的图片
            'delay'  : 300                //延迟时间
        });
	//highlight代码高亮
	$('pre code').each(function(i, block) {
    	hljs.highlightBlock(block);
  	});
  	$("#more a").on("click", function(){
	    $(this).text("LOADING...");
	    $.ajax({
	  	type: "POST",
	      url: $(this).attr("href"),
	      success: function(data){
	        result = $(data).find(".content article.index-article");
	        nextHref = $(data).find("#more a").attr("href");
	        $(function(){
	        	xl();
	        });
	       	// 渐显新内容
	        $(".content").append(result.fadeIn(300));
	        $("#more a").removeClass("loading").text("加载更多");
	        if ( nextHref != undefined ) {
	          $("#more a").attr("href", nextHref);
	        } else {
	        // 若没有链接，即为最后一页，则移除导航
	          $("#more a").remove();
	          $("#more").append("<a style='color:#333' href='javascript:;'>没有更多了</a>");
	        }
	      }
	    });
	    return false;
	});
	//点赞功能
	$(".postzan").click(function(){
		var num=parseInt($(".count").text());
	
    if ($(this).hasClass("done")) {
    	showtips("您已经赞过啦！");
        return;
    } else {
        $(this).addClass("done");
        var z = $(this).data("id"), y = $(this).data("action"), x = $(this).children(".count");
        var w = {
            action: "post_zan",
            um_id: z,
            um_action: y
        };

        $.post(theme_var.ajax_url, w, function(A) {
            $(x).html(A);
        });
        $(".count").text(num+1);
        return false;
    }
	});

	set_qqinfo();//初始化
	//QQ获取
	$("input#QQ").on("blur",function(){
 		var qq=$("input#QQ").val();
		var reg=/^\d{5,10}$/; 
 		if(qq&&!reg.test(qq)){
 			showtips("QQ号输入有误");
			$("input#QQ").val("");
 			return false;
 		}
		if(qq){
 		$("input#email").val(qq+"@qq.com");//填QQ邮箱
 		//获取昵称
 		$.ajax({
 			type:'get',
 			url:theme_var.themeurl+'func_getqqinfo.php?type=getqqnickname&qq='+qq,
 			dataType:'jsonp',
			jsonpCallback:'portraitCallBack',
			success:function(data){
				$("input#author").val(data[qq][6]); //把昵称填入表单
				$("#comment_info").html(data[qq][6]+" ▼");//把昵称填入汇总div
				setCookie('user_qq',qq);	// 设置cookie
				setCookie('user_nicename',data[qq][6]);
				showtips("成功获取QQ昵称！");
			},
			error:function(){
				$("input#author,#input#email,input#QQ").val("");//获取失败清空表单
			}

 		});
 		//获取头像,分开获取是为了不暴露QQ号码
 		$.ajax({
 			type:'get',
 			url:theme_var.themeurl+'func_getqqinfo.php?type=getqqavatar&qq='+qq,
 			dataType:'jsonp',
			jsonpCallback:'qqavatarCallBack',
			success:function(data){
				$('img#qq_avatar').attr("src",data[qq]);
				setCookie('user_avatar',data[qq]);	// 设置cookie
				showtips("成功获取QQ头像！");
			},
			error:function(){
				$("input#author,#input#email,input#QQ").val("");//获取失败清空表单
			}
 		});
 		}
 		else{
 			$("input#email,input#author").val("");//清空昵称和邮箱
 		}
 		
	});
	
}
//返回顶部按钮
$(window).scroll(function(){
		if(($(window).scrollTop())>100)
			$("#go-top").fadeIn();
		else
			$("#go-top").fadeOut();
	});	
$(document).ready(function(){
	$(document).on('click',"#emoji-logo",function(){
		//表情按钮开关
		if($(".smilies-wrap").css("display")=='none')
			$(".smilies-wrap").fadeIn(300);
		else
			$(".smilies-wrap").fadeOut(300);
	});
	//个人信息
	$(document).on('click',"#comment_info",function(){
		if($('#form_main').css("display")=='none')
			$('#form_main').fadeIn(300);
		else
			$('#form_main').fadeOut(300);
	});
	
	//表情点击隐藏
	$(document).on('click',".smilies-wrap a img.size-smiley",function(){
		$(".smilies-wrap").fadeOut(300);
	});
	//蒙版点击事件
	$(document).on('click',function(e){
		var target  = $(e.target);
		if(target.closest('#switch,#left-nav').length == 0){ 
			$('#wrap,#left-nav').removeClass('open');
			$('#switch').removeClass('botton-open');
		};
		if(target.closest('#comment_info,#form_main').length==0){
			var this_var=$("input#author").val();
			if(theme_var.is_admin){
				$("#comment_info").html("博主回复 ▼");
			}
			else{
				$("#comment_info").html($("input#author").val()+" ▼");
			}
			$("#form_main").hide();
		};
		if(target.closest("#emoji").length==0){
			$(".smilies-wrap").hide();
		}
	});
	//侧边导航
	$("#switch").click(function(e){   
		if($("#wrap").hasClass('open'))
		{
			$('#wrap,#left-nav').removeClass('open');
			$(this).removeClass('botton-open');
		}
		else
		{
			$('#wrap,#left-nav').addClass('open');
			$(this).addClass('botton-open');
		}

	});
	//返回顶部按钮
	$("div#go-top").click(function(){
		$('html,body').animate({
			scrollTop:'0px'
		},500,function(){
			$("#go-top").fadeOut();
		});
	});
	//插入表情
	$(".add-smily").click(function(){
		var txtArea = $("textArea")[0];
        var content = txtArea.value;
        var start = txtArea.selectionStart; //初始位置
       	txtArea.value = content.substring(0, txtArea.selectionStart) + $(this).data("smilies") + content.substring(txtArea.selectionEnd, content.length);
        var position = start + $(this).text().length;
        $("textArea").focus();
        txtArea.setSelectionRange(position, position);
	});
	//多级菜单
	$("ul#topnav .menu-item-has-children a").click(function(){
		if($(this).siblings("ul.sub-menu").css("display")=="none")
			$(this).siblings("ul.sub-menu").show();
		else
			$(this).siblings("ul.sub-menu").hide();
	});
	
	if(!is_mobile()&&(theme_var.music_open=="1")){
	var music=$("audio#music").get(0);
	var current_song;	//当前歌的id
	var pre_song;		//上一首歌的id
	var random_song;	//随机歌曲id
	var lyric_roll=false;//歌词是否滚动
	var volume=1;		 //默认音量
	var lrc_no=-1;		//歌词顺序
	var current_time=0;	//当前时间
	var playstyle=1; 	//0 顺序播放 1随机播放 2单曲循环
	var player_voich=false;
	var first_play=true;
	function get_music_url(id){
		if(id){
			$.ajax({
				type:"get",
				dataType:"json",
				url:theme_var.themeurl+'get_music.php?id='+id,
				success:function(data){
					$("audio#music").attr('src',data.url);//改变url
					if((theme_var.autoplay)==null&&(first_play)){
						first_play=false;
					}
					else play();
				}
			});
		}
	}
	var play=function(){
		$("#song_play").addClass("is_playing");
		$("#song_img img").addClass("rog");
		music.play();
		showtips("开始播放...");
	};
	var pause=function(){
		$("#song_play").removeClass("is_playing");
		$("#song_img img").removeClass("rog");
		music.pause();
		showtips("暂停播放...");
	}
	if(playstyle==0){
			$("#song_playstyle").attr({title:"顺序播放",class:"sequential"});
		}
		else if(playstyle==1){
			$("#song_playstyle").attr({title:"随机播放",class:"random"});
		}
		else if(playstyle==2){
			$("#song_playstyle").attr({title:"单曲循环",class:"repeat_once"});
		}
//切换歌曲
function select_song(id,bool){
	get_music_url(playlist[id-1].id);				//异步请求路径
	pre_song=current_song;
	$("#player_list_main").find(".player_songs").removeClass('blackbg');
	$(".player_songs[data-no='"+id+"']").addClass("blackbg");
	if(id!=current_song){
		current_song=id;
	}
	getlyric(playlist[id-1].lyric_url);				 //显示歌词
	endTime=playlist[id-1].time;					//结束时间
	$("p#song_title").text(playlist[id-1].name);  	 //歌曲名
	$("p#song_singer").text(playlist[id-1].artist);	 //歌手
	$("p#song_time #currentTime").text("00:00");	//开始时间
	$("p#song_time #endTime").text(formatSeconds(endTime)); //结束时间
	$("#song_img img").remove();
	$("#song_img").append('<img src="'+playlist[id-1].pic_url+'">');//歌曲图片
	$(".progress_op").css("left","0");
	$(".play_current_bar").css("width",+"0");   //进度条
	if(bool==false)
		return;
	//music.load();
	//play();
}
//生成随机数
function creat_random(current_song){
	var random_num=Math.floor(Math.random()*playlist.length+1);
	if(random_num!=current_song)
	{
		return random_num;
	}
	else
		return creat_random(current_song);
}

//歌词滚动
function lrc_rog(){
	if(lyric_roll){
		var ul=$("ul#my_lyrics");
	var l=-1;
	var long=lyric.length-1;
	if(currentTime<lyric[0][0])
		l=0;
	else if(currentTime>lyric[long][0])
		l=long;
	else {
		for(var k=0;k<long+1;k++){
			if(currentTime==lyric[k][0]){
				l=k;
				break;
			}
			else if(currentTime<lyric[k][0]){
				l=k-1;
				break;
			}
		}
	}
	if(lrc_no!=l){
				$(".playing").removeClass("playing");
				$(".lrc-item[data-no='"+l+"']").addClass('playing');
				lyric_top=$(".lrc-item[data-no='"+l+"']").offset().top-ul.offset().top+ul.scrollTop()-25;
				ul.animate({scrollTop:lyric_top+'px'},300,'swing');
				lrc_no=l;
			}
	}
}
//更新时间
function updatetime(){
	var percent=(currentTime/endTime).toFixed(4)*100;
	if(percent>100)
		percent=100;
	if(current_time!=currentTime){
		$("p#song_time #currentTime").text(formatSeconds(currentTime));
		current_time=currentTime;
	}
	$(".progress_op").css("left",percent+"%");
	$(".play_current_bar").css("width",percent+"%");
}
//播放时间监听事件
$("audio#music").on("timeupdate",function(){
	currentTime=music.currentTime.toFixed(0);
	updatetime();
	lrc_rog();
});
//结束监听
$("audio#music").on("ended",function(){
	$("#song_play").removeClass("is_playing");
	$("#song_img img").removeClass("rog");
	next_play();
});

	//歌单列表按钮
	$("#player_listbtn").click(function(){
		if($("#player_list").css("display")=='none'){
			$("#player_list").fadeIn(250);
			$(this).css("background-positionX","-"+154+"px");
		}
		else {
			$("#player_list").fadeOut(250);
			$(this).css("background-positionX","-"+222+"px");
		}
	});
	$("#player_listbar_icon").click(function(){
		$("#player_list").fadeOut(250);
		$("#player_listbtn").css("background-positionX","-"+222+"px");
	});
	//歌词按钮
	$("#player_lrcbtn").click(function(){
		if($("#player_lrc").css("display")=='none'){
			lyric_roll=true;
			$("#player_lrc").fadeIn(250);
			$(this).css("background-positionX","-"+475+"px");
		}
		else{
			lyric_roll=false;
			$("#player_lrc").fadeOut(250);
			$(this).css("background-positionX","-"+452+"px");
		}
	});
	//播放器回收
	$("#player_right").click(function(){
		var player=$("#player");
		if(player.hasClass('is_open')){
			player.css("left","-"+541+"px");
			player.removeClass("is_open");
			$("#player_list").fadeOut(250);
			$(this).css("background-positionX","-"+46+"px");
			$("#player_listbtn").css("background-positionX","-"+222+"px");
		}
		else{
			player.css("left","0");
			player.addClass("is_open");
			$(this).css("background-positionX","0");
		}
	});
	//歌词关闭
	$("#player_lrc #close_btn").click(function(){
		lyric_roll=false;
		$("#player_lrc").fadeOut(250);
		$("#player_lrcbtn").css("background-positionX","-"+452+"px");
	});
	//显示歌单
	for(var i=0;i<playlist.length;i++){
		var o=playlist[i];
		$("#player_list_main").append('<div class="player_songs" data-no="'+(i+1)+'"><div class="song_name">'+(i+1)+'.'+o.name+'</div><div class="song_author">'+o.artist+'</div><div class="song_time">'+formatSeconds(o.time)+'</div></div');
	}
	//歌单点击
	$(".player_songs").click(function(){
		song_no=$(this).data('no');
		if(song_no!=current_song){
			select_song(song_no);
			current_song=song_no;
	}
		else return; //相同歌曲点击不重载
	});
	
	//初始化第一首歌
	if(playlist[0]){
		select_song(1,false);
		current_song=1;
		pre_song=Math.floor(Math.random()*playlist.length+1);
	}
	else{
		$("audio#music").attr('src','');
		$("p#song_title").text("暂无歌曲");
		$("p#song_singer").text("暂无信息");
		$("p#song_time").text("");
		$("#song_img img").attr("src","../images/default_avater.jpg");
	}
	//play按钮
	$("#song_play").click(function(){
		if($(this).hasClass('is_playing')){
			pause();
		}
		else{
			$(this).addClass("is_playing");
			play();
		}
	});
	//进度条
	$("div#song_progress").click(function(e){
		var left=$("#song_progress").offset().left;
		music.currentTime=(e.pageX-left)/541*endTime;
		
	});
	//上一首
	$("#song_prev").click(function(){
		if(playstyle==2){
			select_song(current_song);
		}
		else if(playstyle==0){
			var pre_s=current_song-1;
			if(pre_s<1){
				pre_s=playlist.length;
			}
			select_song(pre_s);
		}
		else if(playstyle==1){
			select_song(pre_song);  //待优化
		}
	});
	//下一首
	function next_play(){
		//随机
		if(playstyle==1){
			random_song=creat_random(current_song);
			select_song(random_song);
		}
		//单曲
		else if(playstyle==2){
			select_song(current_song);
		}
		//顺序
		else if(playstyle==0){
			var next_song=current_song+1;
			if(next_song>playlist.length)
				next_song=1;
			select_song(next_song);
		}
	}
	//下一首
	$("#song_next").click(function(){
		next_play();
	});
	//播放方式
	$("#song_playstyle").click(function(){
		playstyle+=1;
		if(playstyle>2)
			playstyle=0;
		if(playstyle==0){
			$(this).attr({title:"顺序播放",class:"sequential"});
			showtips("顺序播放");
		}
		else if(playstyle==1){
			$(this).attr({title:"随机播放",class:"random"});
			showtips("随机播放");
		}
		else if(playstyle==2){
			$(this).attr({title:"单曲循环",class:"repeat_once"});
			showtips("单曲循环");
		} 
	});
	$("#volume_regulate,#volume_drag").mousedown(function(e){
		player_voich=true;
	}).mouseup(function(){
		player_voich=false;
	});
	$("#volume_regulate,#volume_drag").mousemove(function(e){
		if(player_voich){
			e.preventDefault();
			var player_vol=(e.pageX-$("#volume_regulate").offset().left)/71*100;
			if(player_vol>100)
				player_vol=100;
			else if(player_vol<0)
				player_vol=0;
			$("#volume_bar").css("width",player_vol+"%");
			music.volume=player_vol/100;
			volume=music.volume;
		}
	});
	$("#volume_regulate").click(function(e){
		e.preventDefault();
		player_vol=(e.pageX-$("#volume_regulate").offset().left)/71*100;
		if(player_vol>100)
			player_vol=100;
		else if(player_vol<0)
			player_vol=0;
		$("#volume_bar").css("width",player_vol+"%");
		music.volume=player_vol/100;
		volume=music.volume;
	});
	$("#volume_icon").click(function(){
		if($(this).hasClass("no_volume")){
			$(this).removeClass("no_volume");
			$("#volume_bar").css("width",volume*100+"%");
			{
				music.volume=volume;
				showtips('恢复声音');
			}
			
		}
		else{
			$(this).addClass("no_volume");
			$("#volume_bar").css("width",0+"%");
				music.volume=0;
				showtips('静音...');
		}
		
	});
}
	//博客开启时间
	if(theme_var.blog_start_day=="yes"){
		setInterval('setTime(theme_var.blog_time_set)',1000);
	}
	//禁止debug
	if(theme_var.debug['three']){
		window.onresize = function(){
		if( (window.outerWidth - window.innerWidth) > 20 || (window.outerHeight - window.innerHeight) > 100)
		alert("这里没什么好看的，还是看看内容把。");
		window.close(); 
		window.location="about:blank";
		}
	}
	if(theme_var.debug['one']){
		document.oncontextmenu = function(){event.returnValue = false;};
	}
	if(theme_var.debug['two']){
		document.onselectstart=function(){event.returnValue=false;};
	}
	if(theme_var.change_title1&&theme_var.change_title2){
		old_title=document.title;
			window.onblur = function() { 
			document.title=theme_var.change_title1;
		};
			window.onfocus = function() { 
			document.title=theme_var.change_title2; 
			setTimeout("document.title=old_title",3000); 
		}
	}
	function get_hitokoto(){
		var hitokoto_type=theme_var.hitokoto;
		var hitokoto_url="";
		if(hitokoto_type=="random")
			hitokoto_url=""
		else if(hitokoto_type=="close")
			return;
		else
			hitokoto_url="?c="+theme_var.hitokoto;
			$.ajax({
			type:'POST',
			url:'https://sslapi.hitokoto.cn/'+hitokoto_url,
			dataType:'json',
			timeout:4000,   
			success:function(data){
				$("#hitokoto_p").html(data.hitokoto+" --"+data.from);
			},
			error:function(){
				$("#hitokoto_p").html("一言好像又抽风了~ (゜-゜)つロ ");
			}
		});
	}
	
	$("#refresh").click(function(){
		get_hitokoto();
	})

	if(theme_var.hitokoto!="close"){
		get_hitokoto()
	}
	else{
		$("#hitokoto").remove();
	}
	//console
	if (window.console && window.console.log) {
	console.log("\n %c 痴情的小五 %c https://cherryml.com \n","color: #fff; background: #ffa628; padding:5px 0;","background: #efefef; padding:5px 0;");
    console.log("\n  ┏┓　　　┏┓  \n┏┛┻━━━┛┻┓  \n┃　　　　　　　┃  \n┃　　　━　　　┃  \n┃　┳┛　┗┳　┃  \n┃　　　　　　　┃  \n┃　　　┻　　　┃  \n┃　　　　　　　┃  \n┗━┓　　　┏━┛  \n　　┃　　　┃神兽保佑  \n　　┃　　　┃代码无BUG！ \n　　┃　　　┗━━━┓  \n　　┃　　　　　　　┣┓  \n　　┃　　　　　　　┏┛  \n　　┗┓┓┏━┳┓┏┛  \n　　　┃┫┫　┃┫┫  \n　　　┗┻┛　┗┻┛  ");
 }
	rerun();
	a();
	xl();
	set_qqinfo();
});
//ajax加载,pjax?
$(document).on('click',".content a,#primary a,.main-nav ul#topnav li a,#next_p a,#post-tag a,.author-nav a,.blog-name a",function(){
	var reqUrl=$(this).attr("href");
	if(typeof(reqUrl)=='undefined'||reqUrl=='')
		return false;
	$.ajax({
	  	type: "POST",
	      url: reqUrl,
	      dataType: "html",
	      beforeSend:function(){
	      	$("div#loading").show();
	      	$('#wrap,#left-nav').removeClass('open');
			$('#switch').removeClass('botton-open');
			l();
	      },
	      success: function(data){
			state = { 
                    url: reqUrl,
                    title: $(data).filter("title").text(),
                    html: $(data).siblings("#wrap").html(),
                };
			$("#wrap").html(state.html);	//替换新内容
			document.title=$(data).filter("title").text();	//改变标题
			window.history.pushState(state, $(data).filter("title").text(), reqUrl);//把历史记录塞进history，并改变url
            $(document).scrollTop(0);	//置顶
	        $("div#loading").fadeOut();		//隐藏loading动画
	       	rerun();						//回调函数
			xl();
			}
	      });
	     return false;
});
//ajax评论
jQuery(document).ready(function(jQuery) {
	var __cancel = jQuery('#cancel-comment-reply-link'),
		__cancel_text = __cancel.text(),
		__list = 'commentlist';//your comment wrapprer
	jQuery(document).on("submit", "#commentform", function() {
		jQuery.ajax({
			url: theme_var.ajax_url,
			data: jQuery(this).serialize() + "&action=ajax_comment",
			type: jQuery(this).attr('method'),
			beforeSend: addComment.createButterbar("提交中...."),
			error: function(request) {
				var t = addComment;
				t.createButterbar(request.responseText);
			},
			success: function(data) {
				jQuery('textarea').each(function() {
					this.value = ''
				});
				var t = addComment,
					cancel = t.I('cancel-comment-reply-link'),
					temp = t.I('wp-temp-form-div'),
					respond = t.I(t.respondId),
					post = t.I('comment_post_ID').value,
					parent = t.I('comment_parent').value;
				if (parent != '0') {
					jQuery('#respond').before('<ol class="children">' + data + '</ol>');
				} else if (!jQuery('.' + __list ).length) {
					if (theme_var.formpostion == 'bottom') {
						jQuery('#respond').before('<ul class="' + __list + '">' + data + '</ol>');
					} else {
						jQuery('#respond').after('<ul class="' + __list + '">' + data + '</ol>');
					}

				} else {
					if (theme_var.order == 'asc') {
						jQuery('.' + __list ).append(data); // your comments wrapper
					} else {
						jQuery('.' + __list ).prepend(data); // your comments wrapper
					}
				}
				t.createButterbar("提交成功");
				cancel.style.display = 'none';
				cancel.onclick = null;
				t.I('comment_parent').value = '0';
				if (temp && respond) {
					temp.parentNode.insertBefore(respond, temp);
					temp.parentNode.removeChild(temp)
				}
			}
		});
		return false;
	});
	addComment = {
		moveForm: function(commId, parentId, respondId) {
			var t = this,
				div, comm = t.I(commId),
				respond = t.I(respondId),
				cancel = t.I('cancel-comment-reply-link'),
				parent = t.I('comment_parent'),
				post = t.I('comment_post_ID');
			__cancel.text(__cancel_text);
			t.respondId = respondId;
			if (!t.I('wp-temp-form-div')) {
				div = document.createElement('div');
				div.id = 'wp-temp-form-div';
				div.style.display = 'none';
				respond.parentNode.insertBefore(div, respond)
			}!comm ? (temp = t.I('wp-temp-form-div'), t.I('comment_parent').value = '0', temp.parentNode.insertBefore(respond, temp), temp.parentNode.removeChild(temp)) : comm.parentNode.insertBefore(respond, comm.nextSibling);
			jQuery("body").animate({
				scrollTop: jQuery('#respond').offset().top - 180
			}, 400);
			parent.value = parentId;
			cancel.style.display = '';
			cancel.onclick = function() {
				var t = addComment,
					temp = t.I('wp-temp-form-div'),
					respond = t.I(t.respondId);
				t.I('comment_parent').value = '0';
				if (temp && respond) {
					temp.parentNode.insertBefore(respond, temp);
					temp.parentNode.removeChild(temp);
				}
				this.style.display = 'none';
				this.onclick = null;
				return false;
			};
			try {
				t.I('comment').focus();
			} catch (e) {}
			return false;
		},
		I: function(e) {
			return document.getElementById(e);
		},
		clearButterbar: function(e) {
			if (jQuery(".butterBar").length > 0) {
				jQuery(".butterBar").remove();
			}
		},
		createButterbar: function(message) {
			var t = this;
			t.clearButterbar();
			jQuery("body").append('<div class="butterBar butterBar--center"><p class="butterBar-message">' + message + '</p></div>');
			setTimeout("jQuery('.butterBar').remove()", 3000);
		}
	};
});


