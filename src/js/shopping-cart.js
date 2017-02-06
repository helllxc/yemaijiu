/**
 * Created by ASUS on 2017/2/6.
 */
;(function ($) {
    $.post('php/confirm.php',function(response){
        var $obj = eval('('+response+')');
        if($obj.state){
            $('.userinfo').remove();
            $('<ul class="userinfo left"></ul>').html('<li style="height:16px;overflow:hidden;">您好，<a href="javascript:;" >'+$obj.clientName+'<img align="absmiddle" width="16" height="16" src="http://img11.yesmyimg.com/newWeb/images/global/member/s/MEMBER_LEVEL_NORMAL.png"></a></li><li class="bldr"><a href="javascript:;" class="txt-logout" >退出</a></li>').appendTo($('.header_top .wrap'));
        }
    })
    $(function(){
        // ..............点击退出刷新..............
        $('.txt-logout').click(function(){
            $.post('php/logout.php',function(data){
                window.location.reload();
            })
        })
//.........................cookies操作................................
        var carList;
        var cookies = document.cookie.split('; ');
        for(var i=0;i<cookies.length;i++){
            var arr = cookies[i].split('=');
            if(arr[0] === 'carlist'){
                carList = JSON.parse(arr[1]);
            }
        }

        if(carList){
            var subPrice = 0;
            var sum = 0;
            $('<div class="ps clearfix"></div>').html('<span class="ps-num"><b></b><i></i></span><div class="transfer"><label for="" ><b></b>由也买酒配送</label></div>').appendTo($('.list-cart ul li:first'));
            $('<div class="goodscontent"></div>').html('<div class="title"><table><tbody><tr> <td height="34" width="8%"><input type="checkbox" name="checkbox" checked="checked"><label for="checkbox0_t" style="cursor: pointer;">全选</label> </td> <td>商品名称</td> <td width="13%">单价</td> <td width="13%">数量</td> <td width="13%">小计</td> <td width="13%">&nbsp;</td></tr></tbody></table></div>').appendTo($('.list-cart ul li:first'));
            $('<div class="goodslist"></div>').html('<table><tbody></tbody></table>').appendTo('.list-cart ul .goodscontent');
            $('<div class="footer"></div>').html('<ul> <li><input class="e-selall selectAll selectAll_1-normal" type="checkbox" name="checkbox" checked="checked"> <label>全选</label> </li> <li class="removeSelectedGoods">批量删除</li> <li class="addSelectedFavorite clicktr">批量加入收藏夹</li> </ul>').appendTo($('.list-cart ul li:first'));

            for(var i=0;i<carList.length;i++){
                sum  = sum + (carList[i].qty-0);
                subPrice = (carList[i].price*carList[i].qty)-0+subPrice;
                $('<tr data-guid="'+carList[i].guid+'"></tr>').html('<td width="8%" class="choose"><input type="checkbox" checked="checked"></td><td width="8%" class="pic"><a href="#"><img alt="" src="'+carList[i].imgUrl+'"></a></td><td class="pic"><a href="" class="title">'+carList[i].name+'<br>'+carList[i].ename+'</a>' +
                    '</td><td width="13%" class="price">￥<b>'+carList[i].price+'</b></td><td width="13%" class="num"><span><a href="#" class="reduce"></a><input type="text" value="'+carList[i].qty+'"><a href="#" class="add"></a></span></td><td class="xj-price" width="13%">￥<b>'+carList[i].price*carList[i].qty+'</b></td><td class="edit" width="13%"><a href=""> 加入收藏夹 </a><br><a href="#" class="del">删除</a></td>').appendTo($('.goodslist tbody'))
            }
            $('.ps .ps-num b ').html(sum);
            $('<div class="total"></div>').html('<span>商品件数：<b>'+sum+'</b>件</span><span class="subprice"><b>￥<i>'+subPrice+'</i></b></span><span class="buy_yh">优惠券<b>￥<em>0</em></b></span>').appendTo($('.list-cart ul .chosenResult'))
            //                ........................全选效果(默认全选).............
            //点击全选选中所有和取消所有
            $('.title td:first input').click(function(){
                if($(this).prop("checked")){
                    console.log($('.choose input '));
                    $('.choose input ').attr('checked',true);
                }else{
                    $('.choose input ').attr('checked',false);
                }
            })

            //批量删除（删除选中商品）
            $('.footer li').eq(1).click(function () {
                console.log($('.goodslist input:checked'))
                $('.goodslist input:checked').each(function(i,ele) {
                    $self = $(ele)
                    delCookies();
                });
            })
        }

        //删除键删除cookie
        $('.goodslist .edit .del').click(function(){
            $self = $(this)
            delCookies();
        })

        function delCookies(){
            console.log(carList)
            $.each(carList,function(idx,item){
                if(item){
                    if((item.guid)==$self.closest('tr').attr('data-guid')){
                        console.log(item.guid);
                        carList.splice(idx,1);
                    }
                    document.cookie = 'carlist=' + JSON.stringify(carList);
                    //删除节点
                    $self.closest('tr').remove();
                }
            })
        }

        //按加减键增加减少商品数量
        //按减键:减少商品数量，小计价格改变，商品总数改变,改变cookie并保存;
        var $bolean;
        $('.goodslist .num .reduce').click(function(){
            var $value = $(this).next('input').attr('value');
            if($value!=1){
                $(this).next('input').attr('value',$value-1);
            }
            //小计价格改变
            $(this).closest('tr').find('.xj-price b').html($(this).closest('tr').find('.price b').html()*($value-1))
            //总价改变
            var $price = $('.subprice b i').html();
            $('.subprice b i').html($price-$(this).closest('tr').find('.price b').html())

        })
        $('.goodslist .num .add').click(function(){
            var $value = $(this).prev('input').attr('value');
            $(this).prev('input').attr('value',($value-0)+1);
            //小计价格改变
            $(this).closest('tr').find('.xj-price b').html($(this).closest('tr').find('.price b').html()*($value-0+1))
            //总价改变
            var $price = $('.subprice b i').html();
            $('.subprice b i').html($price-0+($(this).closest('tr').find('.price b').html()-0))
        })

//.................+ - 键触发效果......................
        $('.num input').on('change',function(){
            $self = $(this)
            $.each(carList,function(idx,ele){
                if(ele.guid==$self.closest('tr').attr('data-guid')){
                    ele.qty = $self.attr('value')
                    document.cookie = 'carlist=' + JSON.stringify(carList);
                }
            })
        })
        //trigger('change')手动触发效果
        $('.num a').on('click',function(){
            $('.num input').trigger('change');
        })

    });
})(jQuery)