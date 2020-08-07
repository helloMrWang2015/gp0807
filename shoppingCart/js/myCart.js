$(function(){

    if(localStorage.getItem('goods')){
        // 获取本地存储中商品id和数量
        var goodsarr = JSON.parse(localStorage.getItem('goods'));

        // 获取服务端数据
        $.ajax({
            url:'./data/goods.json',
            type:'get',
            dataType:'json',
            // data:
            success:function(json){
                // console.log(json);
                // 遍历localstorage中的数据，与获取的数据对比，取出商品id的信息
                $.each(goodsarr,function(index , item){
                    $.each(json,function( i , attr){
                        if(item.code===attr.code){
                            // 取出商品信息，渲染购物车
                            var goodStr = `
                            <li>
                                <img src="${attr.imgurl}" alt="">
                                <h3>${attr.title}</h3>
                                <p>${attr.price}</p>
                                <div class="num">
                                    <span style="border-right: none;" class="reduce">-</span>
                                    <input type="text" value="${item.num}">
                                    <span style="border-left: none;" class="add">+</span>
                                </div>
                                <em code="${item.code}">删除</em>
                            </li>`;
                            $('.list').append(goodStr);
                            return
                        }
                    })
                })

            }
        })


        // 点击删除物品事件
        $('.list').on('click','li em',function(){
            // 删除本地数据
            // 首先删除goodsarr中内容，需要获取下标
            var code = $(this).attr('code')
            $.each(goodsarr,function(index,item){
                if(item.code=== code){
                    // 删除从index开始的一个元素，改变原数组
                    goodsarr.splice(index,1);

                    // 找到后不终止函数，
                    return false;
                }
            })

            // 判断，如果goodsarr为空数组，删除localstorage中的goods
            if(goodsarr.length>0){
                localStorage.setItem('goods',JSON.stringify(goodsarr));
            }else{
                localStorage.removeItem('goods');
                var newLi = '<li style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</li>';
                $('.list').html(newLi);
            }

            // 删除dom结构
            $(this).parent().remove();
        })

        // 点击增加删除
        $('.list').on('click','.add',function(){
            var code = $(this).parent().siblings('em').attr('code');
            var $this = $(this);
            $.each(goodsarr,function(index,item){
                if(item.code===code){
                    item.num++;
                    // 更新数量
                    $this.siblings('input').val(item.num)
                    return;
                }
            })
            localStorage.setItem('goods',JSON.stringify(goodsarr));

            
        })

        $('.list').on('click','.reduce',function(){
            var code = $(this).parent().siblings('em').attr('code');
            var $this = $(this)
            $.each(goodsarr,function(index,item){
                if(item.code===code){
                    item.num--;
                    if(item.num<=0){
                        item.num = 1;
                    }
                    // 更新数量
                    $this.siblings('input').val(item.num)
                    return;
                }
            })
            localStorage.setItem('goods',JSON.stringify(goodsarr));

            
        })


        // 禁止选中
        $('.num').on('mousedown',function(e){
            e.preventDefault()
        })

    }else{
        var newLi = '<li style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</li>';
        $('.list').html(newLi);
    }
})
