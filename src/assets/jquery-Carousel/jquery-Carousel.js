/**
 * Created by ASUS on 2017/1/25.
 */
//轮播图插件
//功能:创建轮播点，实现轮播效果（从左向右->从右向左）
;(function($){
        $.fn.Carousel = function (options) {
            var defaults = {
                direction:true,
                index:0,
                time:3000,
                width:760,
                height:250
            }
            var opt = $.extend({},defaults,options);

            var $len = $(this).find('li').length;

            return this.each(function () {
                var $self = $(this);
                //初始化生成span
                $self.closest('div').addClass('carousel');
                $('<div class="page"></div>').appendTo($self.closest('div'));
                for(i=1;i<=$len;i++){
                    $('<span/>').html(i).appendTo(($self).next('div'));
                }
                $self.next('div').children().eq(0).addClass('active');

               $self.closest('div').find('.page').on('click','span',function(){

                   opt.index =$(this).index()-1;
                   showpic();
               })

                //鼠标移入移出
                $self.closest('div').on('mouseenter',function(){
                    clearInterval($self.timer)
                }).on('mouseleave',function(){
                    $self.timer = setInterval(function(){
                    showpic();
                    },opt.time);
                }).trigger('mouseleave');

                function showpic(){
                    if(opt.direction){
                        opt.index++;
                        if(opt.index>=$len-1){
                            opt.direction = false;
                            opt.index = $len-1;
                        }
                    }else{
                        opt.index--;
                        if(opt.index<=0) {
                            opt.direction = true;
                        }
                    }
                    $self.animate({left:-opt.index*opt.width},2000);
                    $self.next('div').children().removeClass('active').eq(opt.index).addClass('active');
                }
            })
        }
})(jQuery);