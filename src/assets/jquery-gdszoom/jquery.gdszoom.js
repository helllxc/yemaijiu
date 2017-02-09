;(function($){
    $.fn.gdszoom = function(options){
        var defauls = {
            width:220,
            height:360,
            gap:0,
            position:'right',//right,bottom,left
        }

        var opt = $.extend({},defauls,options);

        return this.each(function(){
            var $self = $(this);

            
            // 初始化
            init();

            function init(){
                // 获取大图路径

                // 添加默认样式
                $self.addClass('gdszoom');

                // 生成html结构
                var $lens = $('<span/>').addClass('lens').hide().appendTo($self);


                // 设置样式
                // var bigLeft,bigTop;


                // 大图显示位置
                // if(opt.position === 'right'){
                //     bigTop = $smallImg.offset().top;
                //     bigLeft = $smallImg.offset().left + $smallImg.outerWidth() + opt.gap
                // }

                // $bigLens.css({
                //     width:opt.width,
                //     height:opt.height,
                //     left:bigLeft,
                //     top:bigTop
                // });



                // 计算小图和大图的比例
                var ratio;
                var bigLens;
                var bigImg;
                var $smallImg;
                var bigUrl;

                // 鼠标移入，显示大图和镜头
                $self.on('mouseenter',function(){
                    $lens.show();
                    $smallImg = $self.find('img');
                    //获取大图路径
                    bigUrl = $smallImg.attr('src').replace(/220x360/ig,'380x620');
                    $bigLens = $('<div/>').addClass('gdsbzoom').append('<img src="'+bigUrl+'"/>').hide().appendTo($self);
                    $bigLens.show();
                    // 大图图片
                    $bigImg = $bigLens.find('img')
                    ratio = $smallImg.outerWidth()/$bigImg.outerWidth();
                })

                // 鼠标移出，移出大图和镜头
                .on('mouseleave',function(){
                    $lens.hide();
                   $bigLens.remove();
                })

                // 鼠标移动效果
                .on('mousemove',function(e){
                    var _left = e.clientX- $lens.outerWidth()/2;
                    var _top = e.clientY - $lens.outerHeight()/2 -203;

                    // 防止移出边界
                    if(_left <= 0){
                        _left = 0;
                    }else if(_left >= $smallImg.outerWidth()-$lens.outerWidth()){
                        _left = $smallImg.outerWidth()-$lens.outerWidth();
                    }

                    if(_top <= 0){
                        _top = 0;
                    }else if(_top >= $smallImg.outerHeight()-$lens.outerHeight()){
                        _top = $smallImg.outerHeight()-$lens.outerHeight();
                    }

                    console.log(_top>($self.offset().top)/100,($self.offset().top/2))
                    if(_top>($self.offset().top)/100&&_top<($self.offset().top/2)){
                        $lens.css({
                            top:_top,
                            left:_left
                        });
                        // 大图显示
                        $bigImg.css({
                            top:-_top/ratio,
                            //left:-_left/ratio
                        })
                    }
                })  
            }
        });
    }
})(jQuery);