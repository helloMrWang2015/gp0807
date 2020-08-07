// 等待dom加载完成后执行的ready函数
$(function(){
    // 请求后台数据渲染页面
    $.ajax({
        url:'./data/goods.json',
        type:'get',
        dataType:'json',
        success:function(json){
            // 遍历得来数据渲染页面
            $.each(json,function(index,item){
                var goodDom = `
                <div class="goods">
                    <img src="${item.imgurl}" alt="">
                    <p>￥${item.price}</p>
                    <h3>${item.title}</h3>
                    <div code="${item.code}">加入购物车</div>
                </div>`
                // 将商品id放在加购上，点击时方便传递
                // 添加到页面
                $('.content').append(goodDom);
            })
        }
    })

    // 点击加入购物车，存在新增元素，事件委托
    $('.content').on('click','.goods div', function(){
        // 没有就创建一个空数组放进去
        var goodsarr = [];

        // 判断本地有没有存储数据,如果有，直接添加
        if(localStorage.getItem('goods')){
            goodsarr = JSON.parse(localStorage.getItem('goods'));
        }

        // 设置一个标志变量记录遍历结果
        var flag = false;
        var code = $(this).attr('code');
        // 判断数组对象中有没有这个商品id，如果有，num++，没有添加
        $.each(goodsarr,function(index,item){     
            if(item.code===code){
                item.num++;
                flag = true;
                return;
            }
        })
        // 如果没有相同元素，循环完毕flag还是false
        // 将新商品id和数量添加到goodsarr上
        if(!flag){
            goodsarr.push({'code':code,num:1})
        }

        //将处理完成的goodsarr放入localStorage中
        localStorage.setItem('goods',JSON.stringify(goodsarr)); 
    })

})