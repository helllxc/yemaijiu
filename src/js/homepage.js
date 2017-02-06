/**
 * Created by ASUS on 2017/2/6.
 */
;(function($){
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

        //点击侧栏出现导航栏
        $('.categroup>dl').hover(function(){
            $(this).find('dd').animate({opacity:0.9,left:200},500).animate({}).show();
        },function(){
            $(this).find('dd').stop().animate({opacity:0,left:150},500).hide();
        });

        //生成轮播图，实现淡入淡出效果

        $('.p_area ul').shuffling({imglist:["img/hmepage/20170106110542512.jpg","img/hmepage/3.jpg","img/hmepage/20170106190551736.jpg","img/hmepage/3.jpg","img/hmepage/1920.jpg","img/hmepage/20170104140301650.jpg","../img/hmepage/1.jpg","img/hmepage/20161220091848149.jpg","img/hmepage/20170116161443903.jpg"],width:1920,height:500,time:4000});

        //生成brand轮播图
        var imglist = ['img/hmepage/brand1.jpg','img/hmepage/brand2.jpg','img/hmepage/brand3.jpg','img/hmepage/brand4.jpg','img/hmepage/brand5.jpg','img/hmepage/brand6.jpg']
        for(i=0;i<imglist.length;i++){
            var $li = $('<li/>');
            $li.css('left',150*i+300);
            $li.html('<img src = "'+imglist[i]+'">');
            $li.appendTo($('.pp .center ul'));
        }
        $('.pp .center ul li:first').css('left',0);


        //轮播图
        var index = 0;

        $('.pp .center ul').timer = setInterval(function(){
            index++;
            if(index>=imglist.length){
                $('.pp .center ul li:gt(0)').each(function(idx,item){
//                       $(item).animate({left:$(item).offset().left+300})
                    $(item).animate({left:parseInt($(item).css('left').slice(0,-2))+300})
                })
                index = 0;
            }else{
                $('.pp .center ul li').eq(index).animate({left:parseInt($('.pp .center ul li').eq(index).css('left').slice(0,-2))-300})
                //$('.pp .center ul li').eq(index).animate({left:$('.pp .center ul li').eq(index).offset().left-300})
            }
        },3000);


        for(i=1;i<=5;i++){
            $('<li/>').html('<a href="#"><img src = "img/hmepage/brand_logo'+i+'.jpg "></a>').appendTo($('.pp_bottom ul'))
        }
        for(i=0;i<33;i++){
            $.getJSON("jason/data.json",function(data){
                $.each(data,function(idx,item){
                    var $li = $('<li/>');
                    $li.html('<div class="parea"><a href="#"><img src="'+item.img+'" alt=""></a></div><div class="base"><a href="#">'+item.name+'</a><p class="price"><span>￥<strong>'+item.price+'</strong></span></p>').appendTo($('.comment ul'));
                    $.each(item.main,function(i,_item){
                        $('<div/>').addClass('_comment').html('<div class="user"><img src="'+item.userimg+'" alt=""><span>'+_item.user+'</span></div><p><span class="rank">"评分"<strong>'+_item.rank+'</strong></span><br><a href="#">'+_item.comment+'</a></p>').appendTo($li);
                    })
                })
            })
        }

        //hottabs鼠标移入触发效果，下方商品margin-top改变
        $('.selector_tab ._main .hottabs li').each(function(idx,item){
            $(item).on('mouseenter',function () {
                $(item).closest('ul').children().removeClass('active').eq(idx).addClass('active');
                $('.selector_tab ._main ._bd .goodslist').animate({marginTop:-idx*360},100)
            })
        })
        //默认第一个li高亮
        $('.selector_tab ._main .hottabs li').eq(0).addClass('active');

        //人气抢购产品倒计时函数
        $('.selector_tab ._main ._bd .prod-countdown').Countdowm();

//            ................................利用生成静态页面........................

        $.getJSON("jason/drink.json",function(data){
            $.each(data,function(idex,item){
                $(".jk").html('<div class="jk_header"><h2></h2><ul></ul></div><div class="jk_brand swap clearfix"><div class="jk_logo"><div class="brand"><ul></ul></div></div><div class="jk_main"><ul class="clearfix"></ul></div><div class="jk_logor"></div></div>');

                $.each(item.wine,function(idx,_item){
                    $('<li/>').html('<a>'+_item+'</a>').appendTo($('.jk .jk_header ul'));
                })
                $('.jk .jk_header ul li:last').addClass('more');
                $.each(item.logo,function(idx,_item){
                    $('<li/>').html('<a><img src = "'+_item+'"></a>').appendTo($('.jk .jk_logo ul'));
                })
                $.each(item.src,function(idx,_item){
                    $('<li/>').html('<a><img src = "'+_item+'"></a>').appendTo($('.jk .jk_main ul'));
                })
                $.each(item.rightpic,function(idx,_item){
                    $('<a/>').html('<img src="'+_item+'">').appendTo($('.jk .jk_logor'));
                })

                $('<div class="jk_mainleft clearfix"></div>').html('<div class="goodlist"></div>').appendTo($('.jk'))
                $.each(item.topic,function(idx,_item){
                    $('<h3><strong>'+_item+'</strong><a href="#" class="more">'+item.more+'</a></h3><ul></ul>').appendTo($('.jk .goodlist'));
                })
                $.each(item.top,function(idx,_item){
                    $('<li/>').html('<dl><dt><a href=""><img src="'+_item.img+'" alt=""></a></dt><dd class="base"><a href="">'+_item.picname+'<span>'+_item.ename+'</span></a><p class="price"><span>￥<strong>'+_item.price+'</strong></span></p></dd><dd class="sum"><span class="soldout">售出<strong>'+_item.soldout+'</strong></span><span class="rank">好评<strong>'+_item.rank+'</strong></span></dd></dl>').appendTo($('.jk .goodlist ul:first'));
                })
                $.each(item.buttom,function(idx,_item){
                    $('<li/>').html('<dl><dt><a href=""><img src="'+_item.img+'" alt=""></a></dt><dd class="base"><a href="">'+_item.picname+'<span>'+_item.ename+'</span></a><p class="price"><span>￥<strong>'+_item.price+'</strong></span></p></dd><dd class="sum"><span class="soldout">售出<strong>'+_item.soldout+'</strong></span><span class="rank">好评<strong>'+_item.rank+'</strong></span></dd></dl>').appendTo($('.jk .goodlist ul:last'));
                })

                $('<div class = "jk_right"></div>').html('<h4></h4><ul></ul>').appendTo($('.jk .jk_mainleft'));
                $.each(item.right,function(idx,_item){
                    $('<li/>').html('<em>'+(idx+1)+'</em><a class="pic"><img src = "'+_item.img+'"></a><a class="name">'+_item.name+'<span>'+_item.ename+'</span></a><span class="soldout">售出'+_item.soldout+'<strong></strong></span><span class="price">￥<strong>'+_item.price+'</strong></span>').appendTo($('.jk .jk_right ul'))
                })
                $('.jk .jk_right ul li:lt(3)').addClass('active');
                $('.jk .jk_main ul').Carousel();
            })
        })

        $.getJSON("jason/drink01.json",function(data){
            $.each(data,function(idex,item){
                $("._jk").html('<div class="_jk_header"><h2></h2><ul></ul></div><div class="_jk_main clearfix"><div class = "_jk_brand"><div class="_jk_logo"><div class="brand"><ul></ul></div></div><div class="main"><ul></ul></div><div class="_main"><ul></ul><div class="_goodlist"><ul></ul></div></div></div></div><div class="right"><h4></h4><ul></ul></div>');
                $.each(item.wine,function(idx,_item){
                    $('<li/>').html('<a>'+_item+'</a>').appendTo($('._jk ._jk_header ul'));
                })
                $('._jk ._jk_header ul li:last').addClass('more');
                $.each(item.logo,function(idx,_item){
                    $('<li/>').html('<a><img src = "'+_item+'"></a>').appendTo($('._jk ._jk_logo ul'));
                })
                $.each(item.src,function(idx,_item){
                    $('<li/>').html('<a><img src = "'+_item+'"></a>').appendTo($('._jk .main ul'));
                })

                $.each(item.topic,function(idx,_item){
                    $('<h3><strong>'+_item+'</strong><a href="#" class="more">'+item.more+'</a></h3><ul></ul>').appendTo($('._jk ._goodlist'));
                })
                $.each(item.top,function(idx,_item){
                    $('<li/>').html('<dl><dt><a href=""><img src="'+_item.img+'" alt=""></a></dt><dd class="base"><a href="">'+_item.picname+'<span>'+_item.ename+'</span></a><p class="price"><span>￥<strong>'+_item.price+'</strong></span></p></dd><dd class="sum"><span class="soldout">售出<strong>'+_item.soldout+'</strong></span><span class="rank">好评<strong>'+_item.rank+'</strong></span></dd></dl>').appendTo($('._jk ._goodlist ul:first'));
                })

                $.each(item.right,function(idx,_item){
                    $('<li/>').html('<em>'+(idx+1)+'</em><a class="pic"><img src = "'+_item.img+'"></a><a class="name">'+_item.name+'<span>'+_item.ename+'</span></a><span class="soldout">售出'+_item.soldout+'<strong></strong></span><span class="price">￥<strong>'+_item.price+'</strong></span>').appendTo($('._jk .right ul'))
                })
                $('._jk .right ul li:first').addClass('active');
                $('._jk .main ul').Carousel();
            })
        })

        $.getJSON("jason/drink.json",function(data){
            $.each(data,function(idex,item){
                $(".jk1").html('<div class="jk_header"><h2></h2><ul></ul></div><div class="jk_brand swap clearfix"><div class="jk_logo"><div class="brand"><ul></ul></div></div><div class="jk_main"><ul class="clearfix"></ul></div><div class="jk_logor"></div></div>');
                $.each(item.wine,function(idx,_item){
                    $('<li/>').html('<a>'+_item+'</a>').appendTo($('.jk1 .jk_header ul'));
                })
                $('.jk1 .jk_header ul li:last').addClass('more');
                $.each(item.logo,function(idx,_item){
                    $('<li/>').html('<a><img src = "'+_item+'"></a>').appendTo($('.jk1 .jk_logo ul'));
                })
                $.each(item.src,function(idx,_item){
                    $('<li/>').html('<a><img src = "'+_item+'"></a>').appendTo($('.jk1 .jk_main ul'));
                })
                $.each(item.rightpic,function(idx,_item){
                    $('<a/>').html('<img src="'+_item+'">').appendTo($('.jk1 .jk_logor'));
                })

                $('<div class="jk_mainleft clearfix"></div>').html('<div class="goodlist"></div>').appendTo($('.jk1'))
                $.each(item.topic,function(idx,_item){
                    $('<h3><strong>'+_item+'</strong><a href="#" class="more">'+item.more+'</a></h3><ul></ul>').appendTo($('.jk1 .goodlist'));
                })
                $.each(item.top,function(idx,_item){
                    $('<li/>').html('<dl><dt><a href=""><img src="'+_item.img+'" alt=""></a></dt><dd class="base"><a href="">'+_item.picname+'<span>'+_item.ename+'</span></a><p class="price"><span>￥<strong>'+_item.price+'</strong></span></p></dd><dd class="sum"><span class="soldout">售出<strong>'+_item.soldout+'</strong></span><span class="rank">好评<strong>'+_item.rank+'</strong></span></dd></dl>').appendTo($('.jk1 .goodlist ul:first'));
                })
                $.each(item.buttom,function(idx,_item){
                    $('<li/>').html('<dl><dt><a href=""><img src="'+_item.img+'" alt=""></a></dt><dd class="base"><a href="">'+_item.picname+'<span>'+_item.ename+'</span></a><p class="price"><span>￥<strong>'+_item.price+'</strong></span></p></dd><dd class="sum"><span class="soldout">售出<strong>'+_item.soldout+'</strong></span><span class="rank">好评<strong>'+_item.rank+'</strong></span></dd></dl>').appendTo($('.jk1 .goodlist ul:last'));
                })

                $('<div class = "jk_right"></div>').html('<h4></h4><ul></ul>').appendTo($('.jk1 .jk_mainleft'));
                $.each(item.right,function(idx,_item){
                    $('<li/>').html('<em>'+(idx+1)+'</em><a class="pic"><img src = "'+_item.img+'"></a><a class="name">'+_item.name+'<span>'+_item.ename+'</span></a><span class="soldout">售出'+_item.soldout+'<strong></strong></span><span class="price">￥<strong>'+_item.price+'</strong></span>').appendTo($('.jk1 .jk_right ul'))
                })
                $('.jk1 .jk_right ul li:lt(3)').addClass('active');
                $('.jk1 .jk_main ul').Carousel();
            })
        })

        $.getJSON("jason/drink.json",function(data){
            $.each(data,function(idex,item){
                $(".jk2").html('<div class="jk_header"><h2></h2><ul></ul></div><div class="jk_brand swap clearfix"><div class="jk_logo"><div class="brand"><ul></ul></div></div><div class="jk_main"><ul class="clearfix"></ul></div><div class="jk_logor"></div></div>');
                $.each(item.wine,function(idx,_item){
                    $('<li/>').html('<a>'+_item+'</a>').appendTo($('.jk2 .jk_header ul'));
                })
                $('.jk2 .jk_header ul li:last').addClass('more');
                $.each(item.logo,function(idx,_item){
                    $('<li/>').html('<a><img src = "'+_item+'"></a>').appendTo($('.jk2 .jk_logo ul'));
                })
                $.each(item.src,function(idx,_item){
                    $('<li/>').html('<a><img src = "'+_item+'"></a>').appendTo($('.jk2 .jk_main ul'));
                })
                $.each(item.rightpic,function(idx,_item){
                    $('<a/>').html('<img src="'+_item+'">').appendTo($('.jk2 .jk_logor'));
                })

                $('<div class="jk_mainleft clearfix"></div>').html('<div class="goodlist"></div>').appendTo($('.jk2'))
                $.each(item.topic,function(idx,_item){
                    $('<h3><strong>'+_item+'</strong><a href="#" class="more">'+item.more+'</a></h3><ul></ul>').appendTo($('.jk2 .goodlist'));
                })
                $.each(item.top,function(idx,_item){
                    $('<li/>').html('<dl><dt><a href=""><img src="'+_item.img+'" alt=""></a></dt><dd class="base"><a href="">'+_item.picname+'<span>'+_item.ename+'</span></a><p class="price"><span>￥<strong>'+_item.price+'</strong></span></p></dd><dd class="sum"><span class="soldout">售出<strong>'+_item.soldout+'</strong></span><span class="rank">好评<strong>'+_item.rank+'</strong></span></dd></dl>').appendTo($('.jk2 .goodlist ul:first'));
                })
                $.each(item.buttom,function(idx,_item){
                    $('<li/>').html('<dl><dt><a href=""><img src="'+_item.img+'" alt=""></a></dt><dd class="base"><a href="">'+_item.picname+'<span>'+_item.ename+'</span></a><p class="price"><span>￥<strong>'+_item.price+'</strong></span></p></dd><dd class="sum"><span class="soldout">售出<strong>'+_item.soldout+'</strong></span><span class="rank">好评<strong>'+_item.rank+'</strong></span></dd></dl>').appendTo($('.jk2 .goodlist ul:last'));
                })

                $('<div class = "jk_right"></div>').html('<h4></h4><ul></ul>').appendTo($('.jk2 .jk_mainleft'));
                $.each(item.right,function(idx,_item){
                    $('<li/>').html('<em>'+(idx+1)+'</em><a class="pic"><img src = "'+_item.img+'"></a><a class="name">'+_item.name+'<span>'+_item.ename+'</span></a><span class="soldout">售出'+_item.soldout+'<strong></strong></span><span class="price">￥<strong>'+_item.price+'</strong></span>').appendTo($('.jk2 .jk_right ul'))
                })
                $('.jk2 .jk_right ul li:lt(3)').addClass('active');
                $('.jk2 .jk_main ul').Carousel();
            })
        })

        $.getJSON("jason/drink01.json",function(data){
            $.each(data,function(idex,item){
                $("._jk1").html('<div class="_jk_header"><h2></h2><ul></ul></div><div class="_jk_main clearfix"><div class = "_jk_brand"><div class="_jk_logo"><div class="brand"><ul></ul></div></div><div class="main"><ul></ul></div><div class="_main"><ul></ul><div class="_goodlist"><ul></ul></div></div></div></div><div class="right"><h4></h4><ul></ul></div>');
                $.each(item.wine,function(idx,_item){
                    $('<li/>').html('<a>'+_item+'</a>').appendTo($('._jk1 ._jk_header ul'));
                })
                $('._jk1 ._jk_header ul li:last').addClass('more');
                $.each(item.logo,function(idx,_item){
                    $('<li/>').html('<a><img src = "'+_item+'"></a>').appendTo($('._jk1 ._jk_logo ul'));
                })
                $.each(item.src,function(idx,_item){
                    $('<li/>').html('<a><img src = "'+_item+'"></a>').appendTo($('._jk1 .main ul'));
                })

                $.each(item.topic,function(idx,_item){
                    $('<h3><strong>'+_item+'</strong><a href="#" class="more">'+item.more+'</a></h3><ul></ul>').appendTo($('._jk1 ._goodlist'));
                })
                $.each(item.top,function(idx,_item){
                    $('<li/>').html('<dl><dt><a href=""><img src="'+_item.img+'" alt=""></a></dt><dd class="base"><a href="">'+_item.picname+'<span>'+_item.ename+'</span></a><p class="price"><span>￥<strong>'+_item.price+'</strong></span></p></dd><dd class="sum"><span class="soldout">售出<strong>'+_item.soldout+'</strong></span><span class="rank">好评<strong>'+_item.rank+'</strong></span></dd></dl>').appendTo($('._jk1 ._goodlist ul:first'));
                })

                $.each(item.right,function(idx,_item){
                    $('<li/>').html('<em>'+(idx+1)+'</em><a class="pic"><img src = "'+_item.img+'"></a><a class="name">'+_item.name+'<span>'+_item.ename+'</span></a><span class="soldout">售出'+_item.soldout+'<strong></strong></span><span class="price">￥<strong>'+_item.price+'</strong></span>').appendTo($('._jk1 .right ul'))
                })
                $('._jk1 .right ul li:first').addClass('active');
                $('._jk1 .main ul').Carousel();
            })
        })
    })

})(jQuery)