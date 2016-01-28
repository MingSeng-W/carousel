/**
 * Created by wanghongjie on 16/1/28.
 */



var A=function(){};
A.prototype.a=function(){

    new B().b();
};
var B=function(){};
B.prototype.b=function(){
    alert("a");
};
new A().a();
