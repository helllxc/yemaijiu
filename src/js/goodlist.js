/**
 * Created by ASUS on 2017/2/6.
 */
;(function ($) {

    //        ...............验证是否有保存用户名.....................

    $.post('php/confirm.php',function(response){
        var $obj = eval('('+response+')');
        if($obj.state){
            $('.userinfo').remove();
            $('<ul class="userinfo left"></ul>').html('<li style="height:16px;overflow:hidden;">您好，<a href="javascript:;" >'+$obj.clientName+'<img align="absmiddle" width="16" height="16" src="http://img11.yesmyimg.com/newWeb/images/global/member/s/MEMBER_LEVEL_NORMAL.png"></a></li><li class="bldr"><a href="javascript:;" class="txt-logout" >退出</a></li>').appendTo($('.header_top .swap'));
        }
    })
    $(function(){

        //................点击退出手动刷新页面..................................
        $('.txt-logout').click(function(){
            $.post('php/logout.php',function(data){
                window.location.reload();
            })
        })

//.......................获取cookie...............
        var carList;
        var cookies = document.cookie.split('; ');
        for(var i=0;i<cookies.length;i++){
            var arr = cookies[i].split('=');
            if(arr[0] === 'carlist'){
                carList = JSON.parse(arr[1]);
            }
        }
//            ...........................若存在cookie则改变顶部和右侧购物车的信息..........
        if(carList == undefined||carList.length==0){
            carList = [];
        }else{
            //顶部购物车信息更新
            $('<span class="count"></span>').appendTo('.center_right .shopcart');
            $('<div class="shopcart-list"></div>').appendTo(('.center_right .shopcart'));

            //右侧购物车信息更新
            $('.shopcart-list .empty').remove();
            console.log($('.ym-nBar-cart-txt'))
            $('<h2></h2>').html('最近加入').appendTo($('.ym-nBar-tab-cart .shopcart-list'));
            $('<ul/>').appendTo($('.shopcart-list'));
            var $sum = 0;
            $.each(carList,function(idx,ele){
                $('<li data-guid="'+ele.guid+'""></li>').html('<a href="javacript;"><img src="'+ele.imgUrl+'"><span class="name">'+ele.name+'</span><span class="en">'+ele.ename+'</span><span class="price"><strong>'+ele.price+'</strong> × <em>'+ele.qty+'</em></span></a><a class="btn-remove"></a>').appendTo($('.shopcart-list ul'))
                $sum = $sum + (ele.qty-0);
            })
            $('.ym-nBar-cart-num em').html($sum);
            $('.shopcart .count').html($sum);
        }

        $('.shopcart  .btn-shopcart').hover(function(){
            $(this).closest('div').find('.shopcart-list').show();
        },function(){
            $(this).closest('div').find('.shopcart-list').hide();
        })

        // ....................生成HTML页面...............

        //通过jason生成左侧导航栏
        $.getJSON("jason/classify.json",function(data){
            $.each(data,function (idx,item) {
                $('<div class="classify"></div>').appendTo($('.content_left'));

                $('<div class="goods_style"></div>').html('<h4>所有分类</h4>').appendTo($('.content_left .classify'));

                $('<div class="topsell"></div>').html('<h4>一周销量排行</h4><ul></ul>').appendTo($('.content_left .classify'));

                $('<div class="recommend"></div>').html('<h4>为你推荐</h4><ul></ul>').appendTo($('.content_left .classify'));

                $('<div class ="recommend"></div>').html('<ul></ul>').appendTo($('.main .goodsSelector'));

                $('<div class ="range"></div>').appendTo($('.main .goodsSelector'));

                //生成所有分类导航
                $.each(item.style,function(i,_item){
                    $('<div class="type-mod"></div>').html('<div class="goods_topic"><span></span><a href="">'+_item.topic+'</a></div><ul></ul>').appendTo($('.content_left .goods_style'));
                    $.each(_item.wine,function(index,arr){
                        $('<li/>').html('<a>'+arr+'</a>').appendTo($('.content_left .goods_style ul').eq(i))
                    })
                })
                //生成一周销量导航
                $.each(item.topSell,function(i,_item){
                    $('<li/>').html('<em>'+(i+1)+'</em><a class="image" href=""><img src="'+_item.url+'"></a><a class="name" href="">'+_item.name+'</a><a class="price" href="">￥<strong>'+_item.price+'</strong></a>').appendTo($('.classify .topsell ul'));
                })
                //生成推荐导航
                $.each(item.recommend,function(i,_item){
                    $('<li/>').html('<a class="image" href=""><img src="'+_item.img+'"></a><a href="" class="name">'+_item.name+'<span>'+_item.ename+'</span></a><a href="" class="price">￥<strong>'+_item.price+'</strong></a>').appendTo($('.classify .recommend ul'))
                })

                $.each(item.mainTop,function (i,_item){
                    $('<li/>').html('<a class="image" href=""><img src="'+_item.img+'"></a><a href="" class="name">'+_item.name+'<span>'+_item.ename+'</span></a><span class="slogon"></span><a href="" class="price">￥<strong>'+_item.price+'</strong></a><span class="btn-buy">加入购物车</span>').appendTo($('.goodsSelector .recommend ul'))
                })

                $.each(item.type,function(i,_item){
                    $('<dl/>').html('<dt>'+_item.name+': </dt><dd><div class="selector_range min"><a href="" class="on">不限</a></div></dd>').appendTo($('.goodsSelector .range'));
                    if(_item.more){
                        $('<span class="more">更多</span>').appendTo($('.goodsSelector .range dl').eq(i).find('.selector_range'))
                    }
                    $.each(_item.range,function(index,arr){
                        $('<a></a>').html('<span>'+arr+'</span>').appendTo($('.goodsSelector .range dl').eq(i).find('.selector_range'))
                    })
                })
                $('.goodsSelector .range dl:last').find('.selector_range').removeClass('min').addClass('price');
                $('<span class="customer_price"></span>').html('<input type="text"><em>-</em><input type="text"><input type="button" value="确认" class="btn-confirm">').appendTo($('.goodsSelector .range dl:last').find('.selector_range'));

                $('<div class="title"></div>').html('<ul></ul>').appendTo($('.main .goods'));
                $('<div class="nav"></div>').appendTo($('.main .goods'));
                $('<div class="goodlist"></div>').html('<ul class="clearfix"></ul>').appendTo($('.main .goods'));

                $.each(item.main,function(i,_item){
                    $.each(_item.topic,function(idnex,arr){
                        $('<li/>').html('<a href="">'+arr+'</a>').appendTo($('.main .goods .title ul'));
                    })
                })
                $($('.main .goods .title ul li:first').addClass('all'))
            })


            //默认葡萄酒是显示的
            $('.content_left .goods_style ul').eq(0).addClass('on');
            $('.goods_style .type-mod').eq(0).find('span').addClass('active');
            //点击span展开或收缩,span改变class
            $('.content_left .goods_style span').on('click',function(){
                console.log($(this).closest('div').next('ul').is(':visible'))
                if($(this).closest('div').next('ul').is(':visible')){
                    $(this).removeClass('active');
                    $(this).closest('div').next('ul').hide();
                }else{
                    $(this).addClass('active');
                    $(this).closest('div').next('ul').show()
                }
            })
            //一周销量排行前三个默认加class'hot'
            $('.classify .topsell ul li:lt(3)').find('em').addClass('hot');
            //hover添加移除class
            $('.classify .topsell ul li').hover(function(){
                    $(this).addClass('on');
                },function(){
                    $(this).removeClass('on');
                }
            )
            $('.classify .topsell ul li:gt(2)').hover(function(){
                $(this).find('em').addClass('hot')
            },function(){
                $(this).find('em').removeClass('hot');
            })

        })

        //对categorys hover 效果(dl出现,箭头向上)
        $('.categorys').hover(function(){
            $(this).find('.categroup').show();
            $(this).find('h3 .arrow').css('background-position','-160px -184px')

        },function(){
            $(this).find('.categroup').hide();
            $(this).find('h3 .arrow').css('background-position','-160px -175px')
        })
        //点击侧栏出现导航栏
        $('.categroup>dl').hover(function(){
            $(this).find('dd').animate({opacity:0.9,left:200},500).animate({}).show();
        },function(){
            $(this).find('dd').stop().animate({opacity:0,left:150},500).hide();
        });

        //默认page值为第一页
        $.post('php/goodslist.php',{page:1},function(response){
            $.each(JSON.parse(response),function(idx,item){
                //默认点击所有图片链接到详情页
                $('<li data-guid="'+item.indexid+'"></li>').html('<dl><dt><a class="pic" href="goods.html" target="_blank"><img src="'+item.src+'"></a></dt><dd class="base"><a href="" class="name"><span class="cn">'+item.name+'</span><span class="en">'+item.ename+'</span><span class="promo">'+item.information+'</span></a><p class="price"><span>￥<strong>'+item.price+'</strong></span></p></dd>' +
                    '<dd class="action"><p><a class="btn">加入购物车</a></p></dd><dd class="sum"><span class="rate"><strong>'+item.rank+'</strong>好评度</span><span class="comment"><a><strong>'+item.comment+'</strong></a>评论</span><span class="soldout"><strong>'+item.soldout+'</strong>售出</span></dd></dl>').appendTo($('.main .goodlist ul'));
            })

            addCookies();
        })
//                ...............................cookie保存..........................
        //点击商品页加入购物车按钮触发cookie改变
        function addCookies(){
            var $index = 0;
            $('.main .goodlist ul li .btn').on('click',function(){
                $index++;
                var $num = $('.ym-nBar-cart-num em').html();
                if($index==1){
                    $('.ym-nBar-cart-num em').html($index+($num-0))
                }else{
                    var $number = $('.ym-nBar-cart-num em').html();
                    $('.ym-nBar-cart-num em').html($number-0+1)
                }

                var $li = $(this).closest('li')
                var $img =  $li.find('img').clone();
                //获取小图路径
                var $src = $img.attr('src').replace(/110x180/ig,'60x98');
                var currentGUID = $li[0].getAttribute('data-guid');

                // 先创建一个对象保存当前商品信息
                var goodsObj = {};
                goodsObj.guid = currentGUID;
                goodsObj.qty = 1;
                goodsObj.name = $li.find('.cn').html();
                goodsObj.ename = $li.find('.en').html();
                goodsObj.price = $li.find('.price strong').html();
                goodsObj.imgUrl = $src;

                // 如果cookie为空，则直接添加
                if(carList.length===0){
                    // 添加到carList
                    carList.push(goodsObj);
                }else{
                    // 先判断cookie中有无相同的guid商品
                    for(var i=0;i<carList.length;i++){
                        // 如果商品已经存在cookie中，则数量+1
                        if(carList[i].guid === currentGUID){
                            carList[i].qty++;
                            break;
                        }
                    }

                    // 如果原cookie中没有当前商品
                    if(i===carList.length){
                        // 添加到carList
                        carList.push(goodsObj);
                    }

                }
                // 存入cookie
                // 把对象/数组转换诚json字符串：JSON.stringify()
                document.cookie = 'carlist=' + JSON.stringify(carList);



//                    ...............点击加入购物车，右侧的购物车信息更新.....................

                //购物车提示信息清空
                if( $('.shopcart-list .empty')[0]!==undefined){
                    //移除空购物车信息
                    $('.shopcart-list .empty').remove();

                    //在顶部购物车添加span 和 shopcart-list
                    $('<span class="count"></span>').html($index+($num-0)).appendTo('.center_right .shopcart');
                    $('<div class="shopcart-list"></div>').appendTo(('.center_right .shopcart'))

                    //右侧购物车添加元素
                    $('<h2></h2>').html('最近加入').appendTo($('.ym-nBar-tab-cart .shopcart-list'));
                    $('<ul/>').html('<li data-guid="'+$li.attr('data-guid')+'"><a href="javacript;"><img src="'+$src+'"><span class="name">'+$li.find('.cn').html()+'</span><span class="en">'+$li.find('.en').html()+'</span><span class="price"><strong>'+$li.find('.price strong').html()+'</strong> × <em>1</em></span></a><a class="btn-remove"></a><a class="btn-remove"></a></li>').appendTo($('.shopcart-list'));
                }else{
                    var bol;
                    //添加到两个购物车里
                    $('.shopcart-list ul li').each(function(idx,item){
                        if($(item).attr('data-guid')==$li.attr('data-guid')){
                            var index = $(item).find('.price em').html();
                            //修改产品个数
                            $(item).find('.price em').html((index-0)+1)
                            bol = true
                        }
                    })
                    if(!bol){
                        $('<li data-guid="'+$li.attr('data-guid')+'""></li>').html('<a href="javacript;"><img src="'+$src+'"><span class="name">'+$li.find('.cn').html()+'</span><span class="en">'+$li.find('.en').html()+'</span><span class="price"><strong>'+$li.find('.price strong').html()+'</strong> × <em>1</em></span></a><a class="btn-remove"></a>').appendTo($('.shopcart-list ul'))
                    }
                }
                //顶部购物车总数和右侧购物车总数相等
                $('.shopcart .count').html( $('.ym-nBar-cart-num em').html());

               // .....................输入框旁的购物车操作...............
                //hover效果(出现/消失)
                $('.shopcart  .btn-shopcart').hover(function(){
                    $(this).closest('div').find('.shopcart-list').show();
                },function(){
                    $(this).closest('div').find('.shopcart-list').hide();
                })
            })
        }

//                ........................点击分页效果.............................
        $('.main .page a').on('click',function(){
            $self = $(this);
            //a标签点击高亮
            $self.closest('.page').children().removeClass('on');
            $self.addClass('on');
            //点击分页
            //点击数据库请求数据;
            $.post('php/goodslist.php',{page:$self.html()},function(response){
                $('.goodlist ul').empty();
                $.each(JSON.parse(response),function(idx,item){
                    $('<li data-guid="'+item.indexid+'"></li>').html('<dl><dt><a class="pic" href=""><img src="'+item.src+'"></a></dt><dd class="base"><a href="" class="name"><span class="cn">'+item.name+'</span><span class="en">'+item.ename+'</span><span class="promo">'+item.information+'</span></a><p class="price"><span>￥<strong>'+item.price+'</strong></span></p></dd>' +
                        '<dd class="action"><p><a class="btn">加入购物车</a></p></dd><dd class="sum"><span class="rate"><strong>'+item.rank+'</strong>好评度</span><span class="comment"><a><strong>'+item.comment+'</strong></a>评论</span><span class="soldout"><strong>'+item.soldout+'</strong>售出</span></dd></dl>').appendTo($('.main .goodlist ul'));
                })
                addCookies();
            })
        })


        //点击右侧购物车弹出信息
        $('.ym-nBar-tab-cart').hover(function(){
            $(this).find('.ym-nBar-pop').show()
        },function(){
            $(this).find('.ym-nBar-pop').hide();
        })
    })
})(jQuery);