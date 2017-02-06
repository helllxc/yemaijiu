/**
 * Created by ASUS on 2017/2/6.
 */
;(function($){
    $(function(){
        //当输入框有焦点时，去除相应的class背景
        var arr = [];
        $('input:lt(2)').each(function(idx,item){
            //获取去除textarea的class数组
            arr.push($(item).removeClass('textarea').attr('class'));
            $(item).addClass('textarea');
            //分别给item绑定聚焦和失焦事件
            $(item).on('focus',function () {
                $(item).removeClass(arr[idx]);
            }).on('blur',function(){
                if($(item).val()==''){
                    $(item).addClass(arr[idx]);
                }
            })
        });
        //电话号码输入框失去焦点时判定输入内容是否符合电话号码格式，不正确则创建span标签显示'请输入正确的E-mail或手机号'
        $('.email').on('blur',function(){
            var $val = $(this).val();
            //不知道哪来的email，所以只做电话号码验证
            var reg = /^1[34578]\d{9}$/;
            if($val ==''){
                $(this).next('span').html('请输入E-mail或手机号')
            }else if(!reg.test($val)){
                if($(this).closest('dd').find('span').length==0){
                    $('<span class="error_hint"></span>').html('请输入正确的E-mail或手机号').appendTo($(this).closest('dd'));
                }else{
                    $(this).next('span').html('请输入正确的E-mail或手机号');
                }
            }else{
                $(this).next('span').remove();
            }
        })
        //密码框失去焦点时若输入值为空时，跳出error_hint
        $('.password').on('blur',function(){
            if($(this).val()==''){
                if($(this).next('span').length==0){
                    $('<span class="error_hint"></span>').html('请输入密码').appendTo($(this).closest('dd'));
                }
            }else{
                if($(this).next('span').length==1){
                    $(this).next('span').remove();
                }
            }
        })
        //点击"登录"判断是否输入框为空,若不为空且无报错信息，则发送ajax请求;
        $('.btn').click(function(){
            if( $('.email').val()==''){
                $('<span class="error_hint"></span>').html('请输入正确的E-mail或手机号').appendTo($('.email').closest('dd'));
            }else if($('.password').val()==''){
                $('<span class="error_hint"></span>').html('请输入密码').appendTo($('.password').closest('dd'));
            }
            if($('.error_hint').is(":visible")){
                return false;
            }else{
                $.post('php/login.php',{
                    phone:$('input').eq(0).val(),
                    password:$('input').eq(1).val(),
                },function(data){
                    console.log(data)
                    var $obj = eval('(' + data + ')');
                    if($obj.state){
                        window.location.href = 'homepage.html';
                    } else {
                        alert($obj.message);
                    }
                })
            }
        })
    })
})(jQuery)