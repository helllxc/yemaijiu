/**
 * Created by ASUS on 2017/1/15.
 */
;(function($){
    $(function(){
        //最后一个checkbox默认勾上
        $(':checkbox')[1].checked = true;
        //遍历获取class属性
        var arr = []
        $('input:lt(5)').each(function(idx,item){
            arr.push($(item).attr("class"))
        })
        //当input获得焦点和失去焦点时，class改变;
        $('input:lt(5)').on('focus',function(){
            $('input:lt(5)').each(function(idx,item){
                if($(item).val()==''){
                    $(item).attr("class",arr[idx]);
                }else{
                    $(item).attr("class",'testing');
                }
            })
            $(this).attr("class","active");
            if($(this).index()==0) {
                $(this).next().show();
            }
        }).on('blur',function(idx,item){
            if($(this).val()=='') {
                var $idx = $(this).closest('li').index();
                $(this).attr("class",arr[$idx]);
            }else{
                $(this).attr('class','texzting')
            }
        });

        //监听输入的值改变提示
        $('#phone').on('keyup',function () {
            var $val = $(this).val();
            var reg = /^1[34578]\d{9}$/;
            if($val==''){
                $('li:first .error_hint span').html('请输入手机号');
            }else if(!reg.test($val)){
                $('li:first .error_hint span').html('请输入正确的手机号码');
                $('li:first .error_hint').show()
            }else{
                $('li:first .error_hint').hide();
            }
        })
        //输入密码框失去焦点时触发error_hint提示
        $('#password').on('blur',function () {
            var $val = $(this).val();
            var reg = /^[0-9a-zA-Z]{6,16}$/;
            if($val ==''){
                $(this).closest('li').find('.error_hint').html('请输入密码')
            }else if(!reg.test($val)){
                $(this).closest('li').find('.error_hint').html('密码请设为6-16位字母或数字')
                $(this).next('div').show();
            }else{
                $(this).next('div').hide();
            }
        })
        //两次密码输入不一致时
        $('#confirm').on('keyup',function(){
            var $value = $(this).val();
            var reg = /^[0-9a-zA-Z]{6,16}$/;
            if($value==''){
                console.log(1)
                $(this).next('div').find('span').html('请输入密码')
            }else if(!reg.test($value)){
                $(this).next('div').find('span').html('密码请设为6-16位字母或数字');
                $(this).next('div').show();
            }else if($('#confirm').val()!=$('#password').val()){
                $(this).next('div').find('span').html('两次输入密码不一致');
            }else{
                $(this).next('div').hide();
            }
        })

        $('.register_btn').click(function () {
            $('input:lt(5)').each(function(idx,item){
                if($(item).val()==''){
                    $(item).next('div').show();
                }
            })
            if($('.error_hint').is(":visible")){
                return false;
            }else{
                $.post('php/register.php',{
                    phone:$('#phone').val(),
                    password:$('#password').val()
                },function(response){
                    var $obj = eval('('+response+')');
                    if($obj.state){
                        window.location.href = 'login.html';
                    }else{
                        $('#phone').next('div').find('span').html($obj.message+'<a href="login.html">登录</a>');
                        $('#phone').next('div').show();
                        $('.phone').on("focus",function(){
                            $('#phone').next('div').find('span').css("display","none");
                        })
                    }
                });
            }
        })
    })
})(jQuery)