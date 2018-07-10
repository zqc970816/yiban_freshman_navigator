<?php
	$dorm_num=htmlentities($_GET['dorm_num'],ENT_QUOTES);
    $langitude=$_COOKIE['langitude'];
    $latitude=$_COOKIE['latitude'];
?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">

    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <title>步行路径规划</title>
    <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
        <script type="text/javascript" src="../js/navigator.js"></script>
        <script type="text/javascript" src="../js/dump.js"></script>
        <script src="https://res.wx.qq.com/open/libs/weuijs/1.0.0/weui.min.js"></script>
        <link rel="stylesheet" type="text/css" href="../style/dist/style/weui.css">
        <link rel="stylesheet" type="text/css" href="../style/dist/example/example.css">
    <link rel="stylesheet" href="https://cache.amap.com/lbs/static/main.css"/>
    <script type="text/javascript"
            src="https://webapi.amap.com/maps?v=1.4.2&key=2249bb2128d7c5e601e58c5896674036"></script>
    <style type="text/css">
         #panel {
            text-align: center;
            position: fixed;
            background-color: white;
            max-height: 100%;
            overflow-y: auto;
            top: 10px;
            right: 10px;
            max-width: 300px;
        }
    </style>
    <script type="text/javascript">
        function go(direction){
            var to;
            switch (direction) {
                case 1: to=[117.956981,41.034801];
                        break;
                case 2: to=[117.956267,41.035314];
                        break;
                case 4: to=[117.95476,41.034957];
                        break;
                case 5: to=[117.954085,41.034438];
                        break;
                case 6: to=[117.9544,41.035204];
                        break;
                case 7: to=[117.955355,41.035286];
                        break;
                case 8: to=[117.95622,41.035668];
                        break;
            }
                //基本地图加载
            var map = new AMap.Map("mapContainer", {
                        resizeEnable: true,
                        center:to,//地图中心点
                        zoom: 16 //地图显示的缩放级别
            });
            AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
            function(){
                        //map.addControl(new AMap.ToolBar());

                        map.addControl(new AMap.Scale());

                        //map.addControl(new AMap.OverView({isOpen:true}));
            });
            //步行导航
            AMap.service(["AMap.Walking"], function() {
                var MWalk = new AMap.Walking({
                    map: map,
                    //panel: "panel",
                    autoFitView:true
                }); //构造路线导航类
                //根据起终点坐标规划步行路线
                //MWalk.search([116.379028,39.865042], [116.427281,39.903719], function(status, result){
                MWalk.search([<?=$langitude;?>,<?=$latitude;?>], to, function(status, result) {
                    if(status=='complete'){
                        timeform="分钟";
                        time=(result.routes[0].time)/60;
                        if(time>=100){
                            time=time/60;
                            timeform="小时";
                        }
                        document.getElementById("distance").innerText = "您距离<?=$dorm_num?>号宿舍楼"+result.routes[0].distance+"米";
                        document.getElementById("time").innerText = "步行需要约"+time+timeform;
                    }
                });
            });
        }
    </script>
</head>
<body onload="go(<?=$dorm_num?>)">
<div id="mapContainer" style="height:100%"></div>
<div id="panel" style="border: 2px solid rgba(255, 128, 0, 0.2);border-radius: 5px;border-color: #FF8000;">
    <div class="weui-cell" id="distance"></div>
    <div class="weui-cell" id="time"></div>
</div>

        
  <script type="text/javascript" src="https://webapi.amap.com/demos/js/liteToolbar.js"></script>
  
</body>
</html>