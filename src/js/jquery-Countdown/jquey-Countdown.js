/**
 * Created by ASUS on 2017/1/26.
 */
;(function($){
    $.fn.Countdowm = function(options){
        var defaults ={
            date:"2017-1-29 12:00:00"
        }
        var opt = $.extend({},defaults,options);

        return this.each(function(){
            var $self = $(this);
            var end_time = Date.parse(opt.date);
            $self.timer = setInterval(function(){
                var time = Date.now();
                var countdown = end_time -time;
                var day = Math.floor((countdown/1000)/86400);
                var hour = Math.floor((countdown/3600000)%24);
                var min = Math.floor((countdown/60000)%60);
                $self.find('.tcd-d').html(day);
                $self.find('.tcd-h').html(hour);
                $self.find('.tcd-m').html(min);

                if(countdown<=0){
                    clearInterval($self.timer)
                }
            })
        })
    }
})(jQuery);