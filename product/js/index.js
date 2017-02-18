/**
 * Created by Administrator on 2016-05-28.
 */
$(function () {
    var height=0;
    var currY=0;
    var screenH=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
    console.log(screenH);
    height=$(".maskUl").children("ul").outerHeight(true);
    console.log($(".maskUl").children("ul").get(0).offsetHeight);
    /*设置定位*/
    var setTranslateY = function(translateY){
        $moveUl.css("webkitTransform","translateY("+translateY+"px)");
        $moveUl.css("transform","translateY("+translateY+"px)");
    };
    var searchInp=$(".searchInp").get(0);
    var inpS=$(".inpS").get(0);
    var btnS=$(".btnS").get(0);
    $(".nav_search").click(function(e){
        console.log(e.target!=searchInp&& e.target!=inpS&& e.target!=btnS);
        if(e.target!=searchInp&& e.target!=inpS&& e.target!=btnS){
            $(this).children(".glyphicon").toggleClass("glyphicon-search glyphicon-remove");
            $(this).children(".searchInp").toggle();
            inpS.focus();
        }

    })
    $(".maskShow").click(function () {
        $(".mask").show();
        setTimeout(function () {
            $(".maskUl").addClass("L_slide");
        },300);
        height=$(".maskUl").children("ul").outerHeight(true);
        console.log(height);
    })
    $(".mask").click(function (event) {
       if(event.target.id=="mask"){
           $(".maskUl").removeClass("L_slide");
           setTimeout(function () {
               setTranslateY(0);
               currY=0;
               $(".mask").hide();

           },300);
       }
    })
    var $li=$(".navbar-nav").children("li").clone(true);
    $(".LogOrReg").after($li);
    //左侧栏滑动
    var $moveUl=$(".maskUl").children("ul");
    console.log($(".maskUl").children("ul"));
    console.log($moveUl.height());
    var startY=0;
    var moveY=0;
    var disY=0;
    var flag=false;
    var flagY=0;
    $moveUl.on("touchstart", function (e) {
        startY=e.originalEvent.touches[0].clientY;
        console.log(top);
        e.stopPropagation();
    }).on("touchmove", function (e) {
        moveY= e.originalEvent.touches[0].clientY;
        disY=moveY-startY;
        flag=true;
        if(flag&&disY!=0){
            if(disY+currY>0){
                setTranslateY(0);
                flagY=0;
            }else if(disY+currY<-(height-screenH)) {
                setTranslateY(-(height-screenH));
                flagY=-(height-screenH);
            }else {
                setTranslateY(disY+currY);
                flagY=disY+currY;
            }
        }
        console.log(currY+disY);
        e.stopPropagation();
        e.preventDefault();
    }).on("touchend", function (e) {
        currY=flagY;
        flagY=0;
        startY=0
        moveY=0;
        disY=0;
        flag=false;
        e.stopPropagation();
        console.log("高度"+screenH)
    })
})