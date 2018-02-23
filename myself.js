/*Created by lpb on 2017/4/1.*/
'use strict';
/*
 获取非行间样式:getStyle
 (return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];)
 说明:
 第一个参数为对象obj
 第二个参数为样式attr
 */
function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj)[attr];
  }
}

/*
 获取随机数:getRandom
 说明:
 获取从m到n之间的随机数,如getRandom(2,5)
 返回值：返回m到n之间的一个随机数
 */
function getRandom(m, n) {
  return parseInt(Math.random() * (n - m)) + m;
}

/*
 补零操作:toDouble
 说明:
 如果n小于10，返回0n，如（01,02...）
 如果n大于10，返回n
 返回值：返回字符串n
 */
function toDouble(n) {
  return n < 10 ? '0' + n : '' + n;
}

/*
 数组去重:findInArray
 说明：
 在数组中寻找一个元素是否存在，例如findInArray(arr1,2)
 返回值：
 如果a存在数组中，返回true
 如果a不存在数组中，返回false
 */
function findInArray(arr, a) {
  for (var i = 0; i < arr.length; i++) {
    if (a == arr[i]) {
      return true;
    }
  }
  return false;
}

/*
 数组去重:findInArrayByJson
 说明：(json方法)
 利用json中name的唯一特性
 返回值：返回新的数组
 */
function findInArrayByJson(array) {
  var json = {};
  for (var i = 0; i < array.length; i++) {
    json[array[i]] = 'xyz';
  }
  var array2 = [];
  for (var name in json) {
    array2.push(name);
  }
  return array2;
}

/*
获取父级元素下面className==sClass的元素:getByClass
说明：父级，className，例如getByClass(oDiv,'on')
返回值：获取一个包含要找的className的class数组
 */
function getByClass(oParent, sClass) {
  var aEle = oParent.getElementsByTagName('*');
  var arrResult = []; //用于存放符合条件的元素
  for (var i = 0; i < aEle.length; i++) {
    //当前  aEle[i].className
    var arr = aEle[i].className.split(' '); //把当前项的className按空格拆分成数组
    if (findInArray(arr, sClass)) { //找到了
      arrResult.push(aEle[i]);
    }
  }
  return arrResult;
}

/*
获取字符串中出现次数最多的字符及次数:findMostElementInString
说明：给定字符串，给出字符串中出现最多的字符及出现的次数
返回值：元素 + 个数/例如：(a:8)
 */
function findMostElementInString(str) {
  var json = {};
  for (var i = 0; i < str.length; i++) {
    if (json[str.charAt(i)]) {
      json[str.charAt(i)]++;
    } else {
      json[str.charAt(i)] = 1;
    }
  }
  var max = '';
  var maxCount = 0;
  for (var name in json) {
    if (json[name] > maxCount) {
      max = name;
      maxCount = json[name];
    }
  }
  return max + ':' + maxCount;
}

/*
倒计时:getDate
返回值：距离现在还有 day+'天'+hours+'小时'+minutes+'分钟'+seconds+'秒'；
 */
function getDate() {
  function getTime() {
    var oSetDate = new Date();
    oSetDate.setFullYear(2017, 3, 1);
    oSetDate.setHours(0, 0, 0);

    var oCurrentDate = new Date();
    var t = (oSetDate.getTime() - oCurrentDate.getTime()) / 1000;

    var day = parseInt(t / 86400);
    t = t % 86400;
    var hours = parseInt(t / 3600);
    t = t % 3600;
    var minutes = parseInt(t / 60);
    var seconds = parseInt(t % 60);

    return [].innerHTML = day + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒';
  }
  getTime();
  setInterval(getTime, 1000);
}

/*
毫秒转换:MillisecondToDate
把毫秒转为  x天y小时z分钟s秒
 */
function MillisecondToDate(ms) {
  var s = parseInt(ms / 1000); //秒
  var d = parseInt(s / (24 * 60 * 60)); //天数
  s %= 24 * 60 * 60; //去掉天的秒数
  var h = parseInt(s / (60 * 60)); //小时
  s %= 60 * 60; //去掉小时的秒数
  var m = parseInt(s / 60); //分钟
  s %= 60;
  var time = d + '天' + h + '小时' + m + '分钟' + s + '秒';
  return time;
}

/*
移动:doMove
说明：参数：（对象，属性，方向，距离，回调函数）
eg:( oDiv,'left',12,900,function(){ doMove(oDiv,'top',12,400);} )
 */
function doMove(obj, attr, dir, distance, endFn) {
  dir = parseInt(getStyle(obj, attr)) < distance ? dir : -dir;
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    var speed = parseInt(getStyle(obj, attr)) + dir;
    if (speed > distance && dir > 0 || speed < distance && dir < 0) {
      speed = distance;
    }
    obj.style[attr] = speed + 'px';
    if (speed == distance) {
      clearInterval(obj.timer);
      /*if(endFn){
       endFn();
       }*/
      endFn && endFn();
    }
  }, 30)
}

/*透明度:opacity
 * 说明:参数（对象，方向(正负)，最终透明度，渐变时间，回调函数）
 * eg:opacity(oDiv, 10, 0, 150);
 */
function opacity(obj, step, target, frequency, endFn) {
  var currentOpacity = getStyle(obj, 'opacity') * 100;
  step = currentOpacity < target ? step : -step;
  clearInterval(obj.alpha);
  obj.alpha = setInterval(function() {
    currentOpacity = getStyle(obj, 'opacity') * 100;
    var nextOpacity = currentOpacity + step;
    if (step > 0 && nextOpacity > target || step < 0 && nextOpacity < target) {
      nextOpacity = target;
    }
    obj.style.opacity = nextOpacity / 100;
    obj.style.filter = 'alpha(opacity:' + nextOpacity + ')';
    if (nextOpacity == target) {
      clearInterval(obj.alpha);
      endFn && endFn();
    }
  }, frequency);
}

/*
抖动:shake
说明：参数(对象，方向，回调函数)
eg:(oDiv,'left',function(){shake(oDiv,'top');})
 */
function shake(obj, direction, endFn) {
  var arr = [];
  var pos = parseInt(getStyle(obj, direction));
  var timer = null;
  var num = 0;

  for (var i = 20; i > 0; i -= 2) {
    arr.push(i, -i);
  }
  arr.push(0);

  clearInterval(obj.shake);
  obj.shake = setInterval(function() {
    obj.style[direction] = pos + arr[num] + 'px';
    num++;
    if (num === arr.length) {
      clearInterval(obj.shake);
      endFn && endFn();
    }
  }, 50)
}

/*
获取当前时间:getTime
返回值：eg：2017年4月9日星期日 17:55:20
 */
function getTime(obj) {
  function fnTime() {
    var myTime = new Date(),
      iYear = myTime.getFullYear(),
      iMonth = myTime.getMonth() + 1,
      iDate = myTime.getDate(),
      iDay = myTime.getDay(),
      iHours = myTime.getHours(),
      iMinutes = myTime.getMinutes(),
      iSeconds = myTime.getSeconds();

    switch (iDay) {
      case 0:
        iDay = '星期日';
        break;
      case 1:
        iDay = '星期一';
        break;
      case 2:
        iDay = '星期二';
        break;
      case 3:
        iDay = '星期三';
        break;
      case 4:
        iDay = '星期四';
        break;
      case 5:
        iDay = '星期五';
        break;
      case 6:
        iDay = '星期六';
        break;
    }

    var str = '';
    str = iYear + '年' + iMonth + '月' + iDate + '日 ' + iDay + ' ' + addZero(iHours) + ':' + addZero(iMinutes) + ':' + addZero(iSeconds);
    obj.innerHTML = str;
  }
  fnTime();
  setInterval(fnTime, 1000);
}
/*
透明:opacity
说明：参数(对象，频率，目标程度，实践间隔，回调函数)
 */
function opacity(obj, step, target, frequency, endFn) {
  var currentOpacity = getStyle(obj, 'opacity') * 100;
  step = currentOpacity < target ? step : -step;
  clearInterval(obj.alpha);
  obj.alpha = setInterval(function() {
    currentOpacity = getStyle(obj, 'opacity') * 100;
    var nextOpacity = currentOpacity + step;
    if (step > 0 && nextOpacity > target || step < 0 && nextOpacity < target) {
      nextOpacity = target;
    }
    obj.style.opacity = nextOpacity / 100;
    obj.style.filter = 'alpha(opacity:' + nextOpacity + ')';
    if (nextOpacity == target) {
      clearInterval(obj.alpha);
      endFn && endFn();
    }
  }, frequency);
}

/*
 设置样式:setStyle
 用法：
 1.两个参数，如setStyle(oDiv,{width:'200px',height:'200px',...})
 2.三个参数，如setStyle(oDiv,'width','200px')
 */
function setStyle() {
  var obj = arguments[0]; //实参的第一个为obj
  if (arguments.length == 2) { //如果实参数组长度为2
    var json = arguments[1]; //实参的第二个为json
    for (var name in json) {
      obj.style[name] = json[name];
    }
  } else { //否则
    //var name = arguments[1];
    //var value = arguments[2];
    obj.style[arguments[1]] = arguments[2]; //实参的第二个第三个参数分别为name,value
  }
}

/*
获取物体的绝对位置：getAbsolutePosition
用法：
函数参数为要获取的元素
返回值：
为Json格式{left，top}如：getPosition(oDiv3).left
 */
function getAbsolutePosition(obj) {
  let left = 0;
  let top = 0;
  while (obj) {
    left += obj.offsetLeft;
    top += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return [left, top];
}

/*事件绑定:addEvent
 * 用法：
 * obj：添加对象
 * sEv：事件，比如click、mouseover...
 * fn:事件函数
 * */
function addEvent(obj, sEv, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(sEv, fn, false); //主流高级浏览器
  } else if (obj.attachEvent) { //IE8以下
    obj.attachEvent('on' + sEv, fn)
  }
}

/*事件解绑:removeEvent
 * 用法：
 * obj：添加对象
 * sEv：事件，比如click、mouseover...
 * fn:事件函数
 * */
function removeEvent(obj, sEv, fn) {
  if (obj.addEventListener) {
    obj.removeEventListener(sEv, fn, false); //主流高级浏览器
  } else if (obj.attachEvent) { //IE8以下
    obj.detachEvent('on' + sEv, fn)
  }
}
/*滚轮事件:addWheelEvent
 * */
function addWheelEvent(obj, fn) {
  function wheel(ev) {
    var oEvent = ev || event;
    var bDown = oEvent.wheelDelta ? (oEvent.wheelDelta < 0) : (oEvent.detail > 0); //是否向下
    fn && fn(bDown); //滚动的方向已经确定，可以做一些有用的事情了
  }
  if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) { //判断是否为firefox
    obj.addEventListener('DOMMouseScroll', wheel, false);
  } else {
    addEvent(obj, 'mousewheel', wheel);
  }
}
/*
 * CSS3属性操作:getStyleCSS3
 * 参数：obj,attr,value
 * 返回值：eg: getStyleCSS3(oDiv,'transform','rotate(30deg)');
 * */
function getStyleCSS3(obj, attr, value) {
  let str = attr.charAt(0).toUpperCase() + attr.substring(1);
  obj.style['Moz' + str] = value; //FF
  obj.style['Webkit' + str] = value; //Chrome
  obj.style['O' + str] = value; //Opera
  obj.style['mz' + str] = value; //IE
  //obj.style[attr] = value;
}
/*
* Ajax请求
* 参数:(请求方式,接口地址,数据,成功的回调)
* eg:(get,'/user',function(data){},function(){})
*    ajax('get','getNews.php','',function(data) {
     var data = JSON.parse( data );
     var oUl = document.getElementById('ul1');
     var html = '';
     for (var i=0; i<data.length; i++) {
     html += '<li><a href="">'+data[i].title+'</a> [<span>'+data[i].date+'</span>]</li>';
     }
     oUl.innerHTML = html;
     });
 */
function ajax(method, url, data, success) {
  var xhr = null;
  try {
    xhr = new XMLHttpRequest();
  } catch (e) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  if (method == 'get' && data) {
    url += '?' + data;
  }
  xhr.open(method, url, true);
  if (method == 'get') {
    xhr.send();
  } else {
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        success && success(xhr.responseText);
      } else {
        alert('出错了,Err：' + xhr.status);
      }
    }
  }
}

/*
domReady函数
说明：模拟window.onload功能
参数:domReady(fn) fn为要执行的函数
 */
function domReady(fn) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function() {
      fn && fn();
    }, false);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState == 'complete') {
        fn && fn();
      }
    });
  }
}

/*
返回字符串长度，汉子计数为2
  */
function getStrLength(str) {
  var a = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      a += 2;
    } else {
      a++;
    }
  }
  return a;
}

/*
获取url中的参数
 */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null)
    return decodeURI(r[2]);
  return null; //返回参数值
}

/*
js绑定事件，适用于任何浏览器
eg:eventBind(document, 'click', bodyClick);
 */
function eventBind(obj, eventType, callBack) {
  if (obj.addEventListener) {
    obj.addEventListener(eventType, callBack, false);
  } else if (window.attachEvent) {
    obj.attachEvent('on' + eventType, callBack)
  } else {
    obj['on' + eventType] = callBack;
  }
}
/*
获取当前浏览器js版本
 */
function getJsVersion() {
  var n = navigator;
  var u = n.userAgent;
  var apn = n.appName;
  var v = n.appVersion;
  var ie = v.indexOf('MSIE ');
  if (ie > 0) {
    apv = parseInt(i = v.substring(ie + 5));
    if (apv > 3) {
      apv = parseFloat(i);
    }
  } else {
    apv = parseFloat(v);
  }
  var isie = (apn == 'Microsoft Internet Explorer');
  var ismac = (u.indexOf('Mac') >= 0);
  var javascriptVersion = "1.0";
  if (String && String.prototype) {
    javascriptVersion = '1.1';
    if (javascriptVersion.match) {
      javascriptVersion = '1.2';
      var tm = new Date;
      if (tm.setUTCDate) {
        javascriptVersion = '1.3';
        if (isie && ismac && apv >= 5) javascriptVersion = '1.4';
        var pn = 0;
        if (pn.toPrecision) {
          javascriptVersion = '1.5';
          a = new Array;
          if (a.forEach) {
            javascriptVersion = '1.6';
            i = 0;
            o = new Object;
            tcf = new Function('o', 'var e,i=0;try{i=new Iterator(o)}catch(e){}return i');
            i = tcf(o);
            if (i && i.next) {
              javascriptVersion = '1.7';
            }
          }
        }
      }
    }
  }
  return javascriptVersion;
}

/*
 获取当前点击事件的Object对象
 */
function getEvent() {
  if (document.all) {
    return window.event; //如果是ie
  }
  func = getEvent.caller;
  while (func != null) {
    var arg0 = func.arguments[0];
    if (arg0) {
      if ((arg0.constructor == Event || arg0.constructor == MouseEvent) ||
        (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
        return arg0;
      }
    }
    func = func.caller;
  }
  return null;
}

/*
字符串截取方法
 */
function getCharacterLength(charStr, cutCount) {
  if (charStr == null || charStr == '') return '';
  var totalCount = 0;
  var newStr = '';
  for (var i = 0; i < charStr.length; i++) {
    var c = charStr.charCodeAt(i);
    if (c < 255 && c > 0) {
      totalCount++;
    } else {
      totalCount += 2;
    }
    if (totalCount >= cutCount) {
      newStr += charStr.charAt(i);
      break;
    } else {
      newStr += charStr.charAt(i);
    }
  }
  return newStr;
}

/*
js弹出新窗口全屏
 */
function alertNewWindow() {
  var tmp = window.open("about:blank", "", "fullscreen=1")
  tmp.moveTo(0, 0);
  tmp.resizeTo(screen.width + 20, screen.height);
  tmp.focus();
  tmp.location.href = '//www.che168.com/pinggu/eva_' + msgResult.message[0] + '.html';
  var config_ = "left=0,top=0,width=" + (window.screen.Width) + ",height=" + (window.screen.Height);
  window.open('//www.che168.com/pinggu/eva_' + msgResult.message[0] + '.html', "winHanle", config_);
  //模拟form提交打开新页面
  var f = document.createElement("form");
  f.setAttribute('action', '//www.che168.com/pinggu/eva_' + msgResult.message[0] + '.html');
  f.target = '_blank';
  document.body.appendChild(f);
  f.submit();
}

/*
全选、全不选,需要引入Jquery
 */
function selectAll(objSelect) {
  if (objSelect.checked == true) {
    $("input[name='chkId']").attr("checked", true);
    $("input[name='chkAll']").attr("checked", true);
  } else if (objSelect.checked == false) {
    $("input[name='chkId']").attr("checked", false);
    $("input[name='chkAll']").attr("checked", false);
  }
}

/*
js判断浏览器
 */
function judgeBrowser() {
  if (document.all) {
    alert("IE浏览器");
  } else {
    alert("非IE浏览器");
  }
  if (!!window.ActiveXObject) {
    alert("IE浏览器");
  } else {
    alert("非IE浏览器");
  }
  //判断是IE几
  var isIE = !!window.ActiveXObject;
  var isIE6 = isIE && !window.XMLHttpRequest;
  var isIE8 = isIE && !!document.documentMode;
  var isIE7 = isIE && !isIE6 && !isIE8;
  if (isIE) {
    if (isIE6) {
      alert("ie6");
    } else if (isIE8) {
      alert("ie8");
    } else if (isIE7) {
      alert("ie7");
    }
  }
}

/*
JS判断两个日期大小
eg: 2012-09-09 与2012-9-9 两种格式的对比
得到日期值并转化成日期格式，replace(/-/g, "/")是根据验证表达式把日期转化成长日期格式，这样再进行判断就好判断了
notice:需要引入Jquery
 */
function ValidateDate() {
  var beginDate = $("#t_datestart").val();
  var endDate = $("#t_dateend").val();
  if (beginDate.length > 0 && endDate.length > 0) {
    var sDate = new Date(beginDate.replace(/-/g, "/"));
    var eDate = new Date(endDate.replace(/-/g, "/"));
    if (sDate > eDate) {
      alert('开始日期要小于结束日期');
      return false;
    }
  }
}
/*
移除事件
 */
function moveBind(objId, eventType, callBack) {
  var obj = document.getElementById(objId);
  if (obj.removeEventListener) {
    obj.removeEventListener(eventType, callBack, false);
  } else if (window.detachEvent) {
    obj.detachEvent('on' + eventType, callBack);
  } else {
    obj['on' + eventType] = null;
  }
}

/*
回车提交
需要引入Jquery
 */
function enterSubmit() {
  event = (event) ? event : ((window.event) ? window.event : "")
  keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
  if (keyCode == 13) {
    $("#SubmitLogin").onclick();
  }
}

/*
js执行计时器
 */
function implementTimer() {
  var timeStart = new Date().getTime();
  var timesEnd = new Date().getTime();
  console.log(timesEnd - timeStart);
  document.getElementById("time").innerHTML = timesEnd - timeStart;
}

/*
js写cookie
 */
function setCookie(name, value, expires, path, domain) {
  if (!expires) expires = -1;
  if (!path) path = "/";
  var d = "" + name + "=" + value;
  var e;
  if (expires < 0) {
    e = "";
  } else if (expires == 0) {
    var f = new Date(1970, 1, 1);
    e = ";expires=" + f.toUTCString();
  } else {
    var now = new Date();
    var f = new Date(now.getTime() + expires * 1000);
    e = ";expires=" + f.toUTCString();
  }
  var dm;
  if (!domain) {
    dm = "";
  } else {
    dm = ";domain=" + domain;
  }
  document.cookie = name + "=" + value + ";path=" + path + e + dm;
}
/*
js读cookie
 */
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length))
    }
  }
  return null
}

/*
Ajax 请求
 */
function Ajax() {
  var self = this;
  this.options = {
    type: 'GET',
    async: true,
    contentType: 'application/x-www-form-urlencoded',
    url: 'about:blank',
    data: null,
    success: {},
    error: {}
  };
  this.getXmlHttp = function() {
    var xmlHttp;
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
    }
    if (!xmlhttp) {
      alert('您的浏览器不支持AJAX');
      return false;
    }
    return xmlhttp;
  };
  this.send = function() {
    C.each(self.options, function(key, val) {
      self.options[key] = (args[key] == null) ? val : args[key];
    });
    var xmlHttp = new self.getXmlHttp();
    if (self.options.type.toUpperCase() == 'GET') {
      xmlHttp.open(self.options.type, self.options.url + (self.options.data == null ? "" : ((/[?]$/.test(self.options.url) ? '&' : '?') + self.options.data)), self.options.async);
    } else {
      xmlHttp.open(self.options.type, self.options.url, self.options.async);
      xmlHttp.setRequestHeader('Content-Length', self.options.data.length);
    }
    xmlHttp.setRequestHeader('Content-Type', self.options.contentType);
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200 || xmlHttp.status == 0) {
          if (typeof self.options.success == 'function') self.options.success(xmlHttp.responseText);
          xmlHttp = null;
        } else {
          if (typeof self.options.error == 'function') self.options.error('Server Status: ' + xmlHttp.status);
        }
      }
    };
    xmlHttp.send(self.options.type.toUpperCase() == 'POST' ? self.options.data.toString() : null);
  };
  this.send();
}

/*
JS 加载到顶部LoadJS
 */
function loadJS(url, fn) {
  var ss = document.getElementsByName('script'),
    loaded = false;
  for (var i = 0, len = ss.length; i < len; i++) {
    if (ss[i].src && ss[i].getAttribute('src') == url) {
      loaded = true;
      break;
    }
  }
  if (loaded) {
    if (fn && typeof fn != 'undefined' && fn instanceof Function) fn();
    return false;
  }
  var s = document.createElement('script'),
    b = false;
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', url);
  s.onload = s.onreadystatechange = function() {
    if (!b && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
      b = true;
      if (fn && typeof fn != 'undefined' && fn instanceof Function) fn();
    }
  };
  document.getElementsByTagName('head')[0].appendChild(s);
}
/*
js绑定事件
 */
function bindEvent(objId, eventType, callBack) { //适用于任何浏览器的绑定
  var obj = document.getElementById(objId);
  if (obj.addEventListener) {
    obj.addEventListener(eventType, callBack, false);
  } else if (window.attachEvent) {
    obj.attachEvent('on' + eventType, callBack);
  } else {
    obj['on' + eventType] = callBack;
  }
}

/*
js添加script标签
 */
function JSLoad(args) {
  s = document.createElement("script");
  s.setAttribute("type", "text/javascript");
  s.setAttribute("src", args.url);
  s.onload = s.onreadystatechange = function() {
    if (!s.readyState || s.readyState == "loaded" || s.readyState == "complete") {
      if (typeof args.callback == "function") args.callback(this, args);
      s.onload = s.onreadystatechange = null;
      try {
        s.parentNode && s.parentNode.removeChild(s);
      } catch (e) {}
    }
  };
  document.getElementsByTagName("head")[0].appendChild(s);
}

/*
清空 LoadJS 加载到顶部的js引用
 */
function ClearHeadJs(src) {
  var js = document.getElementsByTagName('head')[0].children;
  var obj = null;
  for (var i = 0; i < js.length; i++) {
    if (js[i].tagName.toLowerCase() == "script" && js[i].attributes['src'].value.indexOf(src) > 0) {
      obj = js[i];
    }
  }
  document.getElementsByTagName('head')[0].removeChild(obj);
};

/*
按Ctrl + Entert 直接提交表单
*/
function ctrlEnterSubmit() {
  evt = evt ? evt : (window.event ? window.event : null);
  if (13 == evt.keyCode && evt.ctrlKey) {
    evt.returnValue = false;
    evt.cancel = true;
    PostData();
  }
}

/*
获取当前时间
 */
function getCurrentDate() {
  function add_zero(temp) {
    if (temp < 10) return "0" + temp;
    else return temp;
  }
  var d = new Date();
  var y = d.getYear() + 1900;
  var month = add_zero(d.getMonth() + 1);
  var days = add_zero(d.getDate());
  var hours = add_zero(d.getHours());
  var minutes = add_zero(d.getMinutes());
  var seconds = add_zero(d.getSeconds());
  var str = y + '-' + month + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
  return str;
};

/*
倒计时
limitTime:倒计时时间，单位为秒
callFn：回调函数
 */
setTime(limitTime,callFn) {
  this.timer = setInterval(() => {
	var h = 0,
	  m = 0,
	  s = 0,
	  remainTime = 0;
	num -= 1;
	if (num == 0) {
	  callFn(); //计时器为0时执行的函数
	}
	remainTime = limitTime - num;
	s = num % 60;
	m = parseInt(num / 60);
	h = parseInt(num / 60 / 60);
	return h + ":" + m + ":" + s;
  }, 1000);
}

/*
vue中倒计时
定义变量
timer: null,
totalTime: 0,
limitTime:0,
timeCount：0
 */
 countDown() {
  if (Number(this.timeCount) > 0) {
	var total = Number(this.timeCount) * 100,
	  ss = 0,
	  ms = 0;
	this.timer = setInterval(() => {
	  total--;
	  if (total <= 0) {
		clearInterval(this.timer);
		this.timeCount = "00:00";
		this.totalTime = this.limitTime;
		this.nextSubmit("", "");
	  } else {
		ss = this.formateTime(Math.floor(total / 100));
		ms = this.formateTime(total - Math.floor(total / 100) * 100);
		this.timeCount = String(ss + ":" + ms);
		this.totalTime = total;
	  }
	}, 10);
  }
}