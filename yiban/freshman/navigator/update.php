<?php
$token = isset($token) ? $token : htmlentities($_GET['token'],ENT_QUOTES);
if(!empty($_POST['ksh'])){
    $ksh=$_POST['ksh'];
    $xh=$_POST['xh'];
    $xm=$_POST['xm'];
    $xb=$_POST['gender'];
    $info=array(
    'ksh' => $ksh,
    'xh'  => $xh,
    'xm'  => $xm,
    'xb'  => $xb
);
//var_dump($info);
}
/**
 * 包含SDK
 */
require("../classes/yb-globals.inc.php");
// 配置文件
require_once 'config.php';

//初始化配置信息，并获取token
$api = YBOpenApi::getInstance()->init($config['AppID'], $config['AppSecret'], $config['CallBack']);
$api->bind($token);
$stu=new Student($api);
$stu->getYBConfig();
$stu->setStuConfig($info);
$result=$stu->submit();
if($result['status']){
    $url = "success.php?token=".$token;
    $param=array('access_token' => $token,
                 'to_yb_uid' => $stu->getYBID(),
                 'content' => $stu->getStuName().'同学,您的信息提交成功!',
     );
    $api->QueryURL('https://openapi.yiban.cn/msg/letter',$param,true);
?>
    <script language='javascript' type='text/javascript'>window.location.href='<?=$url?>'</script>
<?php 
}else{
    if($result['error_code']==101||$result['error_code']==103){
         $url = "error.php?Msg=".$result['Msg'];
    ?>
   <script language='javascript' type='text/javascript'>window.location.href='<?=$url?>'</script>
    }
   
   <?php
}elseif ($result['error_code']==102) {
    ?>
    <script language='javascript' type='text/javascript'>alert('<?=$result['Msg']?>');window.history.back()</script>
    <?php
}
}