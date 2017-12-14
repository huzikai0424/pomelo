
var message_Path = wife_var.themeurl;
var home_Path = wife_var.themeurl;
function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

$(document).on('copy', function (){
    showMessage('你都复制了些什么呀，转载要记得加上出处哦~~', 5000);
});

$.ajax({
    cache: true,
    url: `${message_Path}/live2d/message.json`,
    dataType: "json",
    success: function (result){
        $.each(result.mouseover, function (index, tips){
            $(tips.selector).mouseover(function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.renderTip({text: $(this).text()});
               // showMessage(text, 3000);
            });
        });
        $.each(result.click, function (index, tips){
            $(tips.selector).click(function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.renderTip({text: $(this).text()});
               // showMessage(text, 3000);
            });
        });
    }
});

(function (){
    var text;
    if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = '嗨！来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友！';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = '嗨！ 来自 百度搜索 的朋友，<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
        }else if (domain == 'so') {
            text = '嗨！ 来自 360搜索 的朋友，<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
        }else if (domain == 'google') {
            text = '嗨！ 来自 谷歌搜索 的朋友，<br>欢迎阅读<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }else {
        if (window.location.href == `${home_Path}`) { //如果是主页
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？';
            } else if (now > 5 && now <= 7) {
                text = '早上好！一日之计在于晨，美好的一天就要开始了！';
            } else if (now > 7 && now <= 11) {
                text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
            } else if (now > 11 && now <= 14) {
                text = '中午了，工作了一个上午，现在是午餐时间！';
            } else if (now > 14 && now <= 17) {
                text = '午后很容易犯困呢，今天的运动目标完成了吗？';
            } else if (now > 17 && now <= 19) {
                text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~~';
            } else if (now > 19 && now <= 21) {
                text = '晚上好，今天过得怎么样？';
            } else if (now > 21 && now <= 23) {
                text = '已经这么晚了呀，早点休息吧，晚安~~';
            } else {
                text = '嗨~ 快来逗我玩吧！';
            }
        }else {
            text = '欢迎阅读<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }
    showMessage(text, 12000);
})();

//window.setInterval(showHitokoto,30000);

function showHitokoto(){
    $.getJSON('https://sslapi.hitokoto.cn/',function(result){
        showMessage(result.hitokoto, 5000);
    });
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    console.log('showMessage', text);
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}
loadlive2d("live2d", message_Path+"/live2d/model/get_wife.php");
var wife_postion=JSON.parse(localStorage.getItem("wife"));
if(wife_postion){
    $("#wife").css({"left":wife_postion.x,"top":wife_postion.y});
}
$(function(){
    var wife=document.getElementById("wife");
    wife.onmousedown=function(event){
        var e=window.event||event;
        var x=e.clientX-wife.offsetLeft;  
        var y=e.clientY-wife.offsetTop;     //老婆相对与浏览器可视窗口的坐标
        if(x>=0&&y>=0){
            document.onmousemove=function(event){
                var event=window.event||event;    
                var clientW=document.documentElement.clientWidth || document.body.clientWidth; //可视宽度
                var clientH=document.documentElement.clientHeight||document.body.clientHeight;  //可视高度
                wife.style.left=event.clientX-x+"px";   
                wife.style.top=event.clientY-y+"px";
                if(event.clientX-x<0){
                    wife.style.left=0;
                }
                else if(event.clientX-x>clientW-wife.offsetWidth){
                    wife.style.left=clientW-wife.offsetWidth+"px";
                }
                if(event.clientY-y<0){
                    wife.style.top=0;
                }
                else if(event.clientY-y>clientH-wife.offsetHeight){
                    wife.style.top=clientH-wife.offsetHeight+"px";
                }
            };
            document.onmouseup=function(e){
                var html="clientX="+e.clientX+"\nclientY="+e.clientY+"\noffsetleft="+wife.offsetLeft+"\noffsetTop="+wife.offsetTop;
                $('.message').text(html);
                localStorage.setItem("wife",JSON.stringify({"x":wife.style.left,"y":wife.style.top}));
                document.onmousemove=null;
                document.onmouseup=null;
            }
        }
        return false;
    };
});