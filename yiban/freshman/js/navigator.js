/**
 * Created by yiban on 16/5/23.
 *  author:liuchengbin
 *  desc:js<->oc js<->android
 */

/*
 函数名称：browser
 函数作用：判断访问终端
 参数说明：无
*/
var browser = {
    versions: function() {
        var u = navigator.userAgent,
        app = navigator.appVersion;
        return {
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
/*
 函数名称：getLocation
 函数作用：获取地理位置
 参数说明：无
 */
function gethtml5location_fun() {
    if(browser.versions.android) {
        //android 调用方式
        window.local_obj.yibanhtml5location();
    }else if(browser.versions.ios) {
        ios_yibanhtml5location();
    }else {
        onerror('该终端类型暂不支持使用');
    }
}
/*
 函数名称：yibanhtml5location
 函数作用：客户端获取地理位置，异步返回位置信息，html根据返回信息做界面内容处理
 参数说明：postion  格式:{"longitude": "","latitude": "","address": ""}
 */
function yibanhtml5location(postion) {
    var editedHTML = document.getElementById("Myframe");
    var arr;
    if(browser.versions.android) {
        //android 调用方式
        arr=toArray(postion);
    //alert(obj.address);
    //"http://uri.amap.com/navigation?from="+getData(arr,"longitude")+","+getData(arr,"latitude")+",我的位置&to=117.957918,41.035858,新生报到地点&mode=walk&policy=1&src=mypage&coordinate=gaode&callnative=0";
    //"http://m.amap.com/navi/?start="+getData(arr,"longitude")+","+getData(arr,"latitude")+"&dest=117.932972,40.98046&destName=路线&naviBy=car&key=f8db27e5c30c9e44c41ebc248ebd1992";
    }else if(browser.versions.ios) {
        arr=ios_toArray(postion);
        //var editedHTML = document.getElementById("test");
    }
    setCookie('langitude',getData(arr,"longitude"));
    setCookie('latitude',getData(arr,"latitude"));
    }
/*
 函数名称：ios_toArray
 函数作用：ios将String类型数据变为数组类型
 参数说明：{"name":"","data":""}类型数组
*/
function ios_toArray(string){
    var arr=string.split("\'");
    var temp=new Array();
    for(i in arr){
        if(i%2==1)
        temp.push(arr[i]);
    }
    return temp;
}
/*
 函数名称：toArray
 函数作用：android将String类型数据变为数组类型
 参数说明：{"name":"","data":""}类型数组
*/
function toArray(string){
    var arr=string.split("\""); 
    var temp=new Array();
    for(i in arr){
        if(i%2==1)
        temp.push(arr[i]);
    }
    return temp;
}
/*
 函数名称：getData
 函数作用：查找array数组中对应名称的数据
 参数说明：索引为偶数的是名称，奇数是数据的数组，查找的数据名称
*/
function getData(arr,name){
    var i=arr.indexOf(name);
    return arr[++i];
}
/*
 函数名称：phone
 函数作用：拨打电话
 参数说明：电话号码
 */
function phone_fun(num) {
    var pre = /^1\d{10}$/;
    var tre = /^0\d{2,3}-?\d{7,8}$/;
    if (pre.test(num) || tre.test(num)) {
        if(browser.versions.android) {
            //android 调用方式
            window.local_obj.phone(num);
        }else if(browser.versions.ios) {
            phone(num);
        }else {
            onerror('该终端类型暂不支持使用');
        }
    }else {
        onerror('手机号格式错误');
    }
}

/*
 函数名称：mail
 函数作用：发邮件
 参数说明：email地址
 */
function mail_fun(email) {
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if(re.test(email)) {
        if(browser.versions.android) {
            //android 调用方式
            window.local_obj.mail(email);
        }else if (browser.versions.ios) {
            mail(email);
        }else {
            onerror('该终端类型暂不支持使用');
        }
    }else {
        onerror('邮箱地址格式错误');
    }
}

/*
 函数名称：encode
 函数作用：扫一扫
 参数说明：content内容
 */
function encode_fun() {
    if(browser.versions.android) {
        //android 调用方式
        window.local_obj.encode();
    }else if(browser.versions.ios) {
        encode();
    }else {
        onerror('该终端类型暂不支持使用');
    }
}

/*
 函数名称：getScanResult
 函数作用：扫一扫结果返回
 参数说明：二维码中必须包含“yiban_scan_result”标识否则跳转新的页面
 */
function getScanResult(info) {
    setCookie('scanresult',info);
    document.getElementById("scanresult").innerText = info;
}

/*
 函数名称：back
 函数作用：返回app
 参数说明：content内容
 */
function back_fun() {
    if(browser.versions.android) {
        //android 调用方式
        window.local_obj.back();
    }else if(browser.versions.ios) {
        back();
    }else {
        onerror('该终端类型暂不支持使用');
    }
}

/*
 函数名称：download
 函数作用：下载
 参数说明：地址
 */
function download_fun(vurl) {
    if(browser.versions.android) {
        //android 调用方式
        window.local_obj.download(vurl);
    }else if(browser.versions.ios) {
        download(vurl);
    }else {
        onerror('该终端类型暂不支持使用');
    }
}

/*
 函数名称：onerror
 函数作用：非客户端的错误处理
 参数说明：errorInfo  错误信息
 */
function onerror(errorInfo) {
    //根据实际情况可自行二次开发，原版基于方便测试用
    console.log(errorInfo);
    alert(errorInfo);
    var editedHTML = document.getElementById("yibanhtml5");
    editedHTML.textContent = errorInfo;
}

/*
 函数名称：mobile_api
 函数作用：调用客户端开放交互，传值详见相关交互说明
 参数说明：{action:"",params:{}}
 */
function mobile_api(jsonstr) {
    var tempJson = JSON.stringify(jsonstr);
    //alert(tempJson);
    if(browser.versions.android) {
        //android 调用方式
        window.local_obj.js2mobile(tempJson);
    }else if(browser.versions.ios) {
        js2mobile(tempJson);
    }else {
        onerror('该终端类型暂不支持使用');
    }
}
/*
 函数名称：onlyid_back
 函数作用：返回设备相对唯一标示码
 参数说明：易班app回调设定，无需用户调用
 */
function onlyid_back(result) {
    //根据实际情况可自行二次开发，原版基于方便测试用
    var editedHTML = document.getElementById("yibanhtml5");
    editedHTML.textContent = result;
}
/***/
/*
 函数名称：getCookie
 函数作用：获取cookie值
 参数说明：cookie名字
 */
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}
/*
 函数名称：setCookie
 函数作用：新增cookie
 参数说明：cookie名字，cookie值
 */
function setCookie(cname,cvalue){
    document.cookie = cname+"="+cvalue;
}
/*
 函数名称：delCookie
 函数作用：删除cookie
 参数说明：cookie名字
 */
function delCookie(cname){
    document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
/*
函数名称：AjaxLoad
 函数作用：利用ajax获取数据
 参数说明：cookie名字
*/
/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
    function AjaxLoad(opt) {
        opt = opt || {};
        opt.method = opt.method.toUpperCase() || 'GET';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        opt.success = opt.success || function () {};
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }
        else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }var params = [];
        for (var key in opt.data){
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        }
        else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        } 
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                opt.success(xmlHttp.responseText);
            }
        };
    }