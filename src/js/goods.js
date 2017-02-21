/**
 * Created by ASUS on 2017/2/6.
 */
define(['../js/config.js'],function () {
    requirejs(['jquery','goods','zoom'],function ($,g,z) {
        // $.post('../php/confirm.php',function(response){
        //     var $obj = eval('('+response+')');
        //     if($obj.state){
        //         $('.userinfo').remove();
        //         $('<ul class="userinfo left"></ul>').html('<li style="height:16px;overflow:hidden;">您好，<a href="javascript:;" >'+$obj.clientName+'<img align="absmiddle" width="16" height="16" src="http://img11.yesmyimg.com/newWeb/images/global/member/s/MEMBER_LEVEL_NORMAL.png"></a></li><li class="bldr"><a href="javascript:;" class="txt-logout" >退出</a></li>').appendTo($('.header_top .wrap'));
        //     }
        // })
        $(function(){
            $.post('../php/confirm.php',function(response){
                var $obj = eval('('+response+')');
                if($obj.state){
                    $('.userinfo').remove();
                    $('<ul class="userinfo left"></ul>').html('<li style="height:16px;overflow:hidden;">您好，<a href="javascript:;" >'+$obj.clientName+'<img align="absmiddle" width="16" height="16" src="http://img11.yesmyimg.com/newWeb/images/global/member/s/MEMBER_LEVEL_NORMAL.png"></a></li><li class="bldr"><a href="javascript:;" class="txt-logout" >退出</a></li>').appendTo($('.header_top .wrap'));
                }
            })

            //................点击退出自动刷新页面..................................
            $('.txt-logout').click(function(){
                $.post('../php/logout.php',function(data){
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
//            ...........................若存在cookie则改变右侧和顶部购物车的信息..........
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

                // ..................生成HTML结构.....................
                var $sum = 0;
                $.each(carList,function(idx,ele){
                    $('<li data-guid="'+ele.guid+'""></li>').html('<a href="javacript;"><img src="'+ele.imgUrl+'"><span class="name">'+ele.name+'</span><span class="en">'+ele.ename+'</span><span class="price"><strong>'+ele.price+'</strong> × <em>'+ele.qty+'</em></span></a><a class="btn-remove"></a>').appendTo($('.shopcart-list ul'))
                    $sum = $sum + (ele.qty-0);
                })
                //获取并改变总商品数
                $('.ym-nBar-cart-num em').html($sum);
                $('.shopcart .count').html($sum);
            }

            //顶部购物车hover效果
            $('.shopcart  .btn-shopcart').hover(function(){
                $(this).closest('div').find('.shopcart-list').show();
            },function(){
                $(this).closest('div').find('.shopcart-list').hide();
            })

            // .....................头部导航栏操作.....................
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

            // .....................生成html页面...............
            //生成商品图
            //生成大图
            var $bigimgList = ["http://img18.yesmyimg.com/n/420/145/5145420/4463015_220x360.png","http://img19.yesmyimg.com/n/420/145/5145420/9647907_220x360.JPG","http://img18.yesmyimg.com/n/420/145/5145420/2325597_220x360.JPG","http://img09.yesmyimg.com/n/420/145/5145420/5873254_220x360.png"];
            var $smallimgList =["http://img18.yesmyimg.com/n/420/145/5145420/4463015_60x98.png","http://img19.yesmyimg.com/n/420/145/5145420/9647907_60x98.JPG","http://img18.yesmyimg.com/n/420/145/5145420/2325597_60x98.JPG","http://img09.yesmyimg.com/n/420/145/5145420/5873254_60x98.png"];
            $('<div class="image"></div>').html('<span class="btn-prev"></span><span class="btn-next"></span><em></em><a><img></a>').appendTo($('.promotion .promotion_pic .big'));
            //默认第一张显示
            $('.promotion .promotion_pic .big').find('img').attr('src',$bigimgList[0]);

            //生成下方小图
            $('<div class="small"></div>').html('<a class="prev disabled" href=""></a><div class="smallPic"><ul></ul></div><a class="next disabled" href=""></a>').appendTo($('.promotion .promotion_pic'));
            //生成li标签
            $.each($smallimgList,function(idx,item){
                $('<li/>').html('<img src="'+item+'">').appendTo($('.smallPic ul'));
            })
            $('.smallPic ul li:first').addClass('on');
            //点击小图高亮且大图src改变
            $('.smallPic ul').on('mouseenter','li',function(){
                $(this).closest('ul').children().removeClass('on');
                $(this).addClass('on');
                $('.promotion .promotion_pic .big').find('img').attr('src',$bigimgList[$(this).index()])
            })
            //点击左右按钮实现大图变化及小图高亮
            var $index;
            $('.promotion .promotion_pic .big').on('click','span',function(){
                $('.smallPic ul li').each(function(idx,item){
                    if($(item).attr('class')=='on'){
                        $index = $(this).index();
                    }
                })
                if($(this).attr('class')=='btn-next'){
                    if($index!=3){
                        $index++;
                        $('.smallPic ul').children().removeClass('on');
                        $('.smallPic ul li').eq($index).addClass('on');
                        $('.promotion .promotion_pic .big').find('img').attr('src',$bigimgList[$index])
                    }
                }else{
                    if($index!=0){
                        $index--;
                        $('.smallPic ul').children().removeClass('on');
                        $('.smallPic ul li').eq($index).addClass('on');
                        $('.promotion .promotion_pic .big').find('img').attr('src',$bigimgList[$index])
                    }
                }
            })
            //放大镜插件
            $('.big .image a').gdszoom();

            $('<div class="temperature clearfix"></div>').html('<span class="temp">仓位温度：<span class="temp-icon">11.3℃</span></span>商品ID : <span>5145420</span>').appendTo($('.promotion .promotion_pic'));
            $('<div class="share"></div>').html('<a href="#" class="addicon">加关注</a><div class="sharebox clearfix"><h4>分享到:</h4><div class="sharelist"><div class="share_icon"><a href="" class="sina"></a><a href="" class="qq"></a><a href="" class="renren"></a><a href="" class="qzone"></a><span class="more"></span></div><a class="right"></a></div></div>').appendTo($('.promotion .promotion_pic'));
//            左侧模块结束

//            ....................上部中部..................

            $.getJSON("../jason/promotion.json",function(data){
                $.each(data,function(idx,item){
                    //生成商品促销信息
                    $.each(item.promotion,function(i,_item){
                        $('<div></div>').html('<b>'+_item.header+'</b><em title="'+_item.contetn+'">'+_item.contetn+'</em>').appendTo($('.promotion_sales .cx dd'));
                    })
                    //生成comb图
                    $.each(item.group,function(i,_item){
                        $('<li/>').html('<a href="" class="image"><img src="'+_item.img+'" alt=""></a><p class="name"><a href="#" title="'+_item.cn+'">'+_item.cn+'</a></p><p class="price"><span><label>组合价</label><strong>'+_item.price+'</strong></span></p><input type="button">').appendTo($('.content .comb ul'));
                    })
                    //生成detail图
                    $.each(item.detail,function(i,_item){
                        $('<li/>').html('<span><b>'+_item.topic+'</b>'+_item.content+'</span>').appendTo($('.mainContent .tab .detail ul'));
                        $('.detail ul li').eq(i).find('span').css('background-position',_item.background);
                    })
                    //生成产品介绍信息
                    $.each(item.introuduce,function(i,_item){
                        if(_item.content){
                            $('<fieldset></fieldset>').html('<legend>'+_item.title+'</legend><dl><dd><p><strong>'+_item.head+'</strong></p><p>'+_item.content+'</p></dd><dt><img src="'+_item.img+'"></dt></dl>').appendTo($('.tab .procontent'));
                        }else if(_item.img){
                            $('<fieldset></fieldset>').html('<legend>'+_item.title+'</legend><p class="center"><img src="'+_item.img+'" alt=""></p>').appendTo($('.tab .procontent'));
                        }else{
                            $('<fieldset></fieldset>').html('<legend>'+_item.title+'</legend>'+_item.up+'<br><br> 郎格多克（Languedoc)<br>'+_item.dowm+'').appendTo($('.tab .procontent'));
                        }
                    })
                    //生成content内的评论
                    $.each(item.comment,function(i,_item){
                        $('<li/>').html('<div class="user"><a href="#"><img src="'+_item.img+'" alt=""></a><span>'+_item.username+'</span></div><div class="_detail"><b></b><h4><span class="rate"><i style="width:'+_item.width+'"></i></span><span>购买过<a href="#">拉昂城堡干红葡萄酒</a></span><span class="date right">'+_item.date+'</span></h4><div class="content">'+_item.comment+'</div><div class="content"><a href="#">(此评论来自"也买酒APP")</a><p><img src="http://img14.yesmyimg.com/images/event/2015/12/code.png" alt=""></p></div>' +
                            '<div class="action clearfix"><p class="reply"><a href="#" class="btn-reply">回复</a><a href="#" class="view-reply">共<span> 0</span>条回复</a></p><p class="action-rate"><a href="#">有用<span>('+_item.use+')</span></a><a href="#">没用<span>('+_item.unuse+')</span></a></p></div></div>').appendTo($('.comment_list ul'))
                    })
                })
            })
            //hover改变dd的高度
            $('.promotion_sales .cx dd').hover(function(){
                $(this).addClass('active');
            },function(){
                $(this).removeClass('active');
            })
            $('<span class="more"></div>').html('更多优惠<i></i>').appendTo($('.promotion_sales .cx dd'));



            // ...................商品购物操作.......................
            //选择数量事件
            $('.wineNum .prev').on("click",function(){
                var $value = $(this).next('input').attr('value');
                if($value!=1){
                    //商品数--
                    $(this).next('input').attr('value',$value-1);
                }
            })
            $('.wineNum .next').on("click",function(){
                var $value = $(this).prev('input').attr('value');
                //商品数++
                $(this).prev('input').attr('value',($value-0)+1);
            })


            //加入购物车点击事件
            $('.add a').click(function(){
                //改变右侧购物车商品总数量
                var $num = $('.ym-nBar-cart-num em').html();
                var $number = $('.wineNum  input').attr('value')-0;
                $('.ym-nBar-cart-num em').html($number+($num-0))

                //获取并添加cookie信息
                var $li = $(this).closest('li')
                var $img =  $li.find('img').clone();
                //获取小图路径
                var $src = 'http://img18.yesmyimg.com/n/420/145/5145420/4463015_110x180.png'.replace(/110x180/ig,'60x98');
                var currentGUID = 1;

                // 先创建一个对象保存当前商品信息
                var goodsObj = {};
                goodsObj.guid = currentGUID;
                goodsObj.qty = $('.wineNum  input').attr('value');
                goodsObj.name = "拉昂城堡干红葡萄酒";
                goodsObj.ename = "La Bastide Laurent";
                goodsObj.price = $('.promotion_price .price em').html();
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
                    $('.shopcart-list .empty').remove();

                    //在顶部购物车添加span 和 shopcart-list
                    $('<span class="count"></span>').html($index+($num-0)).appendTo('.center_right .shopcart');
                    $('<div class="shopcart-list"></div>').appendTo(('.center_right .shopcart'))
                    //在右侧购物车添加节点
                    $('<h2></h2>').html('最近加入').appendTo($('.shopcart-list'));
                    $('<ul/>').html('<li data-guid="1"><a href="javacript;"><img src="'+$src+'"><span class="name">拉昂城堡干红葡萄酒</span><span class="en">La Bastide Laurent</span><span class="price"><strong>'+$('.promotion_price .price em').html()+'</strong> × <em>'+$('.wineNum  input').attr('value')+'</em></span></a></li>').appendTo($('.shopcart-list'));
                }else{
                    //获取价格
                    var index =$('.shopcart-list .price em').html();
                    //修改产品个数
                    $('.shopcart-list .price em').html((index-0)+($('.wineNum  input').attr('value')-0))
                }
                //顶部购物车总数和右侧购物车总数相等
                $('.shopcart .count').html( $('.ym-nBar-cart-num em').html());
            });
            //点击右侧购物车弹出信息
            $('.ym-nBar-tab-cart').hover(function(){
                $(this).find('.ym-nBar-pop').show()
            },function(){
                $(this).find('.ym-nBar-pop').hide();
            })
        })
    })
})

