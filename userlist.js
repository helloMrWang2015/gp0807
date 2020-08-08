
// 功能一，进入页面请求数据渲染页面
;;(function(){
    pageAjax(1)
    // 点击下一页
    var page = 1;
    
    $('.next').click(function(){
        page++;

        if(page >= $('.num').length){
            page=$('.num').length;
        }

        pageAjax(page)
    })
    
    // 点击上一页
    $('.prev').click(function(){
        page--;
        if(page<=1){
            page=1;
        }
        pageAjax(page);
    })

    // 点击页码跳转
    $('.pagination').on('click','.num',function(){
        page = $(this).index('.num')+1;
        // console.log(page);
        pageAjax(page)
    })

    // 点击编辑
    var userId;
    $('.table').on('click','.edit',function(){
        // 获取当前数据放入模态框中
        var tds = $(this).parent().siblings('td');
        
        $('.name').val($(tds[1]).text())
        $('.sex').val($(tds[2]).text())
        $('.age').val($(tds[3]).text())
        $('.phone').val($(tds[4]).text())
        userId = $(tds[0]).text()
    })

    // 点击提交更改
    $('.submit').click(function(){

        $.ajax({
            url:'./userlist.php',
            type:'get',
            dataType:'json',
            data:{
                name:$('.name').val(),
                age:$('.age').val(),
                sex:$('.sex').val(),
                phone:$('.phone').val(),
                type:'update',
                userId:userId
            },
            success:function(json){
                alert(json.msg);
                $('#exampleModal').modal('hide');
                pageAjax(Math.ceil(userId/8))
                
            }
        })
    })

    // 点击删除
    $('.table').on('click','.delete',function(){
        var tds = $(this).parent().siblings('td');
        userId = $(tds[0]).text()
        $.ajax({
            url:'./userlist.php',
            type:'get',
            dataType:'json',
            data:{
                userId:userId,
                type:'delete'
            },
            success:function(json){
                alert(json.msg)
                console.log($('.num').length);
                if(Math.ceil(userId/8) < $('.num').length){
                    pageAjax(Math.ceil(userId/8))
                }else{
                    pageAjax(Math.floor(userId/8))
                }
                
            }
        })
    })




    // 提交添加用户
    $('.addIn').click(function(){
        // 空值判断
        if(!$('.addName').val()||!$('.addAge').val()||!$('.addSex').val()||!$('.addPhone').val()){
            alert("不能为空");
            return;
        }
        $.ajax({
            url:'./userlist.php',
            type:'get',
            dataType:'json',
            data:{
                type:'add',
                name:$('.addName').val(),
                age:$('.addAge').val(),
                sex:$('.addSex').val(),
                phone:$('.addPhone').val(),
            },
            success:function(json){
                $('#addUser').modal('hide');
                alert(json.msg)
                pageAjax($('.num').length);
                // 清空模态框数据
                $('.addName').val('');
                $('.addAge').val('');
                $('.addSex').val('');
                $('.addPhone').val('');
            }
        })
    })
})();





// 请求数据渲染页面
function pageAjax(page){
    $.ajax({
        url:'./userlist.php',
        type:'get',
        dataType:'json',
        data:{
            page:page,
            type:"page"
        },
        success:function(json){
            // console.log(json);
            // 渲染页面前清空上次数据
            var domStr = '';
            // 遍历拼接dom字符串
            $.each(json.data,function(index,item){
                domStr+=`<tr>
                        <td>${item[0]}</td>
                        <td>${item[1]}</td>
                        <td>${item[3]}</td>
                        <td>${item[2]}</td>
                        <td>${item[4]}</td>
                        <td>
                            <button class="btn btn-success btn-xs edit" data-toggle="modal" data-target="#exampleModal">
                                <span class="glyphicon glyphicon-pencil"></span>编辑
                            </button>
                            <button class="btn btn-danger btn-xs delete">
                                <span class="glyphicon glyphicon-remove"></span>删除
                            </button>                           
                        </td>
                    </tr>`
            })
            $('tbody').html(domStr);

            // 根据数据库总条数渲染分页器
            // 总页数=总数据/每一页数据   向上取整
            var num = Math.ceil(json.total/8);
            var numStr = ``;
            for(var i = 0;i < num;i++){
                numStr+=`<li class="num"><a href="#">${i+1}</a></li>`
            }
            // 清除上次dom结构
            $('.num').remove();
            // 添加到页面
            $('.prev').after(numStr);
            // 为当前页码添加样式
            $('.pagination li').eq(page).addClass('active');

            pageNum = json.total;
        }
    })
}