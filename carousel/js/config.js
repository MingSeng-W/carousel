/**
 * Created by wanghongjie on 16/1/27.
 */
require.config({
    baseUrl:'js',
    paths:{
        jquery:'jquery-2.2.0.min',
        index:'index',
        hello:'hello'
    },
    shim:{
        jquery:{
            exports:'jquery'
        },
       hello:{
           exports:'person'
       },
      index:{
          deps:['jquery']
//          init:function(){
//              return{
////                  imgPlayer:'imgPlayer'
//              }
//          }
      }
    }
});
require(['jquery','index'],function(jquery,index){
    var bc=new bottomCircle($('#ico'));
    var ip=new imgPlayer($('.imgPlayer ul'),bc);
//        创建定时器
    var ti=new Timer(ip.next,4000,ip);
//        4.按钮绑定事件

    var pf=function(obj,func){
        return function(e){
            e.preventDefault();
            obj[func].call(obj);
            return false;
        };
    };
    var de=function(bottomCirlcleObj,obj,func){
        return function(e){
            e.preventDefault();
            console.log(obj);
            bottomCirlcleObj[func](obj);
        }
    }
//           绑定向前按钮
    $('#ico a').each(function(){
        var self=this;
//        alert(self);
        console.log($(this));
        return function(){
            $(this).on('click',function(){
                de(bc,$(this),'clicked');
            });
        }

    });
    $('.imgPlayer .btnLeft').click(pf(ip,'prev'));
//        绑定向后按钮
    $('.imgPlayer .btnRight').click(pf(ip,'next'));
//        绑定底部圆点
    $('.imgPlayer .active').click(pf(ip,'active'));
//        鼠标移入播放器，播放器停止
//        鼠标移出播放器，播放器开始
    $('.imgPlayer .nav_btn').mouseenter(pf(ti,'stop'))
        .mouseleave(pf(ti,'start'));
});