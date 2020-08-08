<?php
header('Content-Type:text/html;charset=utf-8');
// 接收页码
$page = $_REQUEST['page'];
// 接收请求目的
$type = $_REQUEST['type'];

// 接收的更新数据
$name = $_REQUEST['name'];
$age = $_REQUEST['age'];
$sex = $_REQUEST['sex'];
$phone = $_REQUEST['phone'];
$userId = $_REQUEST['userId'];

// 连接服务器
$link = mysqli_connect('localhost','root','root','db_gp_03');
if(!$link){
    echo '{"err":-1,"msg":"连接失败"}';
    die();
}
$page=1;
$type='update';
// 判断请求目的
if($type==='page'){
    
    // 查询数据总条数，渲染标签页
    $all_sql = 'select * from users';
    // 查询数据库
    $all_res = mysqli_query($link,$all_sql);
    $all_res = mysqli_fetch_all($all_res);
    // 获取数据库所有数据条数
    $total = mysqli_affected_rows($link);

    // 从数据库中取一页的数据
    $start = ($page-1)*8;
    $page_sql = "select * from users order by id limit $start,8";
    $page_res = mysqli_query($link,$page_sql);
    $page_arr = mysqli_fetch_all($page_res);
    // 得出的是php数组，要转成json字符串给前端发送过去
    $data = json_encode($page_arr,JSON_UNESCAPED_UNICODE);
    if(count($page_arr)>0){
        echo '{"err":1,"msg":"分页数据","total":'.$total.',"data":'.$data.'}';
    }else{
        echo '{"err":1,"msg":"分页数据","total":"","data":""}';
    }
    

}else if($type === 'updata'){
    // 设置更新数据
    $update_sql = "update user set name='$name',age='$age',sex='$sex',phone='$phone' where id='$userId'";
    $update_res = mysqli_query($link,$update_sql);

    if(mysqli_affected_rows($link) > 0){
        echo '{"err":1,"msg":"修改成功"}';
    }else{
        echo '{"err":0,"msg":"修改失败"}';
    }
}else{
    echo '{"err":0,"msg":"参数错误"}';
}

mysqli_close($link);
?>