/**
 * Created by Administrator on 2017/1/10 0010.
 */
/* 编写轮播图插件，要求如下：
- 是否自动轮播
- 是否显示小图
- 是否显示左右按钮
- 可设置轮播间隔时间
- 轮播类型: fade:淡入淡出, vertial:垂直滚动, horizontal:水平滚动, show:幻灯片
- 默认显示第几张图片
*/
;(function ($) {
    $.fn.shuffling = function(options){
        var defaults = {
            imglist:[],
            type:'fade',
            transform:true,
            smallPic:false,
            direction:false,
            time:3000,
            index:0,
            width:810,
            height:320
        }
        var opt = $.extend({},defaults,options);
        var len = opt.imglist.length;

       return this.each(function(){
            var $self = $(this);
            $self.addClass(opt.type);

            if(opt.type ==='fade'){
                $self.find('li').eq(opt.index).css('opacity','1');
                var imghtml = opt.imglist.map(function(url,idx){
                    return '<li><img src="'+url+'"/></li>';
                }).join('\n');
                $(this).html(imghtml);
                $(this).find("img").eq(opt.index).attr('opacity','1');
                var $index = opt.index;
                var  $lastindex = 0;
                if(opt.transform){
                    var $timer = setInterval(function(){
                        $index++;
                        if($index>=len){
                            $index =0;
                        }
                        var $li = $self.find('li').eq($index);
                        var $lastli = $self.find('li').eq($lastindex);
                        $li.animate({opacity:'1'},2000);
                        $lastli.animate({opacity:'0'},200);

                        $lastindex=$index;

                        if(opt.smallPic){
                            highlight();
                        }
                    },opt.time);
                }
            }

            if(opt.type ==='vertial'){
                //var len = opt.imglist.length;
                $self.css({top:-(opt.height)*(opt.index)});
                var $index = opt.index;
                if(opt.transform){
                   $self.parent('div').on('mouseenter',function(){
                       clearInterval($self.timer)
                   }).on('mouseleave',function(){
                       $self.timer = setInterval(function(){
                           $index++;
                           $self.animate({top:-(opt.height)*($index)},2000,function(){
                               if($index>= 4){
                                   $self.css({top:0});
                                   $index = 0;
                               }
                           } );
                           if(opt.smallPic){
                               highlight()
                           }
                       },opt.time)
                   }).trigger('mouseleave');
                }

            }

            if(opt.type ==='horizontal'){
                $img = $self.find('img')[0];
                $self.css({top:-($img.offsetWidth)*(opt.index)});

                if(opt.direction){
                    var $forward = $('<span/>').addClass('forward').html('&lt;');
                    $forward.insertAfter($self);

                    var $back = $('<span/>').addClass('back').html('&gt;');
                    $back.insertAfter($forward);

                    $forward.click(function(){
                        if($left ==-4050){
                            var $left = $self[0].offsetLeft;
                            $self.css({left:0});
                            $self.animate({left:$left-$img.offsetWidth},1000);
                        }else{
                            $self.animate({left:$left-$img.offsetWidth},1000);
                        }
                    })

                    $back.click(function(){
                        var $left = $self[0].offsetLeft;
                        if($left ==0){
                            $self.css({left:-4050});
                            $self.animate({left:$left+$img.offsetWidth},1000);
                        }else{
                            $self.animate({left:$left+$img.offsetWidth},1000);
                        }
                    })
                }

                if(opt.transform){
                    var $index = opt.index;
                    var $timer = setInterval(function(){
                        $index++;

                        $self.stop().animate({left:-($img.offsetWidth)*($index)},2000,function(){
                            if($index>= 4){
                                $self.css({left:0});
                                $index = 0;
                            }
                            if(opt.smallPic){
                                highlight()
                            }
                        } );
                    },opt.time)
                }
            }
            function  highlight(){
               $('.smallpic li').eq($index).animate({opacity:'1'}).siblings('li').animate({opacity:0.5});
            }        })
    }
})(jQuery)