/**
 * Created by wanghongjie on 16/1/27.
 */
(function($){
    //    底部圆点类
    var bottomCircle=function(obj) {
        this.circleCon = obj;
//        圆点总数
        this.count = obj.children('a').length;
//        当前的圆点对象序号
        this.curentCircleIndex = 0;
//        圆点数组
        this.circleArray=obj.children();
    }
//        被点击的的圆点对象
//        方法:
//        为圆点应用激活样式
    bottomCircle.prototype.addActiveClass=function(n){
        this.circleCon.children().each(function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            }
        });
        this.circleCon.children().eq(n).addClass('active');
//        console.log("hahah");

    };
//        跳到第n个圆点
    bottomCircle.prototype.goto=function(n){
        this.curentCircleIndex=n;
        console.log("curentCircleIndex"+this.curentCircleIndex);
        this.addActiveClass(n);

    };
    bottomCircle.prototype.clicked=function(clickObj){
//        alert("i am");
        console.log("点击对象"+clickObj);
        this.goto(clickObj.prevAll('a').length+1);
    }

    window.bottomCircle=bottomCircle;

//        1.图片播放器
    var imgPlayer=function($s,bottomCircleObj){
//            图片列表
        this.slider=$s;
//            当前图片
        this.current=0;
//            图片总数
        this.count=$s.children('.imgSingle').length;
//            播放器的宽度
        this.width= $s.children('.imgSingle').first().width();

//            当前底部圆点的序号
        this.cirlcles=bottomCircleObj;
    }
//        播放第n张图片
    imgPlayer.prototype.go=function(n){
//        console.log('slider对象'+this.slider);
        console.log(n);
        if(n==0){
            var self=this;
            this.slider.removeClass('transitionClass').css('left',0);
        }else {
            this.slider.css('left',n%this.count*this.width*-1).addClass('transitionClass');
        }
        this.cirlcles.goto(n);
    }
//        播放前一张图片
    imgPlayer.prototype.prev=function(){
        this.current=(this.curent-1+this.count)%this.count;
        this.go(this.current);

    }
//        播放下一张图片
    imgPlayer.prototype.next=function(){
        this.current=(this.current+1+this.count)%this.count;
        this.go(this.current);
    }
    imgPlayer.prototype.active=function(){
        this.go(this.cirlcle);
    }
//        2.定时器
    var Timer=function(f,i,t){

        this.timer=0;//当前的timeid
        this.func=f;//定时器执行时，循环的函数
        this.that=t;//调用计时器的对象
        this.interval=i;//间隔时间
        this.start();
    }
//        停止计时
    Timer.prototype.stop=function(){
        clearInterval(this.timer);
    }

//        开始计时
    Timer.prototype.start=function(){
        this.stop();
        this.timer=setInterval((function(f,t){
            return function(){
                f.call(t);
            }
        })(this.func,this.that),this.interval);
    }
//        3.实例化
//        创建播放器
    window.imgPlayer=imgPlayer;
    window.Timer=Timer;
})($);