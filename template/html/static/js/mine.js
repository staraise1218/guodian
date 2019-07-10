;(function () {
    $(document).on('click', '.memenu>li', function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
    if(!(navigator.userAgent.match(/(iPhone|iPod|Android|ios|Windows Phone)/i))){
        $('.memenu>li').hover(function () {
            $(this).children('.mepanel').toggle()
        }, function () {
            $(this).children('.mepanel').hide()
        })
    }
    $(document).on('click', '.userinfo', function () {
        $('.popover').toggle()
    })
 
    // 关于我们
    $(document).on('click', '.my-box .col-md-2 ul li', function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
    // 头部点击
    $(document).on('click', '.skyblue>li', function () {
      $(this).addClass('active').siblings().removeClass('active')
    })
    // 移动端头部点击显示效果
    $('.classify .more').on('click', function () {
        $(this).toggleClass('active').siblings().toggle()
    })
    $('.mobel-header>.search').on('click', function () {
        $(this).toggleClass('active')
        $('.search-box').toggle()
        $('.main_shade').toggle()
    })
    $('.search-box span').on('click', function () {
        $(this).parent().hide()
        $('.main_shade').hide()
        $('.mobel-header>.search').toggleClass('active')
    })
    // 个人信息设置
    $(function(){
        // 选择性别
        $('.radio').click(function(){
            $(this).addClass('current').siblings('.radio').removeClass('current');
            $('#sex').val($(this).attr('value'));
        })
        // 修改手机号
        $('.editPhoneButton').click(function(){
            $('#telephone').val(13520498826);
            $('.editPhoneButton').hide();
            $('.tel').hide();
            $('#telephone').show();
        })
        // $('#telephone').blur(function(){
        //     $(this).hide();
        //     $('.editPhoneButton').show();
        //     $('.tel').show();
        // })
    })

    $(document).on('click', '.personal-msg', function () {
        $(this).eq(0).addClass('active').siblings('form').show().siblings('.log-out').hide().siblings('.collection').hide()
    })
    $(document).on('click', '.setForm .cancel', function () {
        $(this).parent().hide()
        $('.personal-msg').removeClass('active')
        $('.collection').show()
    })
    // 二维码
    $('.top-header-left .erweima').hover(function () {
        $(this).children().toggle()
    })
    // 全选反选
    //全选或全不选
    $(".collePage .AllcheckBox").click(function(){   
        if(this.checked){   
            $("#list :checkbox").prop("checked", true);
            $(".collePage .AllcheckBox").prop("checked", true);
        }else{   
            $("#list :checkbox").prop("checked", false);
            $(".collePage .AllcheckBox").prop("checked", false);
        } 
    }); 
    //设置全选复选框
    $("#list :checkbox").click(function(){
        allchk();
    });
    function allchk(){
        var chknum = $("#list :checkbox").size();//选项总个数
        var chk = 0;
        $("#list :checkbox").each(function () {  
            if($(this).prop("checked")==true){
                chk++;
            }
        });
        if(chknum==chk){//全选
            $(".collePage .AllcheckBox").prop("checked",true);
        }else{//不全选
            $(".collePage .AllcheckBox").prop("checked",false);
        }
    }
    // ---------
    $(document).on('click', '.search-list li', function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
    $(document).on('click', '.search-list>.title', function () {
        $(this).siblings().slideToggle()
        $('.shade_white').toggle()
    })
    $(document).on('click', '.brand-list > li', function () {
        $(this).children('ul').show()
        $(this).children('ul > li').show()
    })
    $(document).on('click', '.brand-list > li > ul > li', function () {
        $(this).children('ul').show()
    })
    $(document).on('click', '.tab-title li', function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('._shade').show()
        $('._cancle').show()
    })
    $(document).on('click', '.tab-title li.brand', function () {
        $('.brand-list').show()
        $('.search-list').hide()
    })
    $(document).on('click', '.tab-title li.search-title', function () {
        $('.search-list').show()
        $('.brand-list').hide()
    })
    $(document).on('click', '._cancle', function () {
        $('.tab-content').hide()
        $('._shade').hide()
        $(this).hide()
    })

    // 点击收藏
    $(document).on('click', '#collectLink', function () {
        $(this).addClass('active')
    })
    $(document).on('click', '.classify ul li', function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
    $(document).on('click', '.sec', function () {
        var url = $(this).attr("data-href");
        var q = $(this).prev('input').val();
        if(!q){
            return false;
        }
        url +='?q='+q
        window.location.href=url;
    })
    $(document).on('click', '.more', function () {
        $('.listsPage .all-title').toggle('500')
    })
    $(document).on('click', '.item-title li', function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
    $(document).on('click', '.collecPage .lists li .delete', function () {
        $(this).parent().parent().remove();
    })
    $(document).on('click', '.detailsPage .items', function () {
        $('.flexslider figure a>img').attr('src', $(this).attr('data-img'))
        $(this).addClass('active').siblings().removeClass('active')
    })
    $(document).on('click', '.top-nav .h-b-left', function () {
        $('.memenu').toggle()
        $(this).toggleClass('active')
    })
    // 回到顶部
    $(document).on('click', '#go-top', function () {
        $("html,body").animate({scrollTop:0}, 500);
    })
    if(!(navigator.userAgent.match(/(iPhone|iPod|Android|ios|Windows Phone)/i))){
      $(window).scroll(function (event) {
        var Height = $('.header-top').height()
        var top = $(document).scrollTop()
        if (top > Height) {
     //        $('.header-top .top-header-main').height('0').css({
     //            'opacity': '0'
     //        })
     //        $('.header-bottom .log').show()
     //        $('.header-bottom .phone').show()
     //        $('.memenu>li>.mepanel').css({
     //            'top': '65px'
     //        })
     //        $('.header-top .search input').addClass('active')
     //        $('.skyblue li>a').css({
     //            'margin': '0 1rem'
     //        })
            $('#go-top').show()
        } else {
            $('#go-top').hide()
     //        $('.header-top .top-header-main').height('100%').css({
     //            'opacity': '1'
     //        })
     //        $('.header-bottom .log').hide()
     //        $('.header-bottom .phone').hide()
     //        $('.memenu>li>.mepanel').css({
     //            'top': '150px'
     //        })
     //        $('.header-bottom .search .sec').removeClass('active')
     //        $(document).on('click', '.header-bottom .search .sec', function () {
     //            $(this).parent().toggleClass('.active')
     //            $(this).siblings().toggleClass('.active')
     //        })
        }
     })
    }
})();
 
if(!(navigator.userAgent.match(/(iPhone|iPod|Android|ios|Windows Phone)/i))){
    ;(function ($) {
        var XQ_bigimg=function(xq_big){
            var self=this;
            this.xq_big =xq_big;
            this.width  =xq_big.width();
            this.height =xq_big.height();
            this.top  =xq_big.offset().top;
            this.left =xq_big.offset().left;
            this.pdiv =Math.floor(Math.random()*this.width*this.height);
            this.setting={
                "pwidth"  :   300,
                "pheight" :   300,
                "scale"   :   3,
                "margin_top"  : 50,
                "margin_left"   : 50,
                "pclass"    : ""
            }
            $.extend(this.setting,this.getSetting());
            this.imgsrc =this.setting.bigImg ? this.setting.bigImg : xq_big.attr("src");
            this.xq_big.hover(function(){
                self.createPchild(self.pdiv);
                self.imgsrc =$(this).attr("src");
                self.createImg();
            },function(){
                var pdiv="#"+self.pdiv;
                $(pdiv).remove();
            });
            this.xq_big.mousemove(function(e){
                var scrollTop=$(document).scrollTop();
                var scaleX=(e.clientX-self.left)/self.width;//处于左边部分的距离
                var scaleY=(e.clientY-self.top+scrollTop)/self.height;//处于顶部部分的距离
                self.updImg(scaleX,scaleY);
            });
        }
        XQ_bigimg.prototype={
            createPchild:function(id){
                var ele=document.createElement("div");
                var img=document.createElement("img");
                var scrollTop=$(document).scrollTop();
                $("body").append($(ele));
                $(ele).attr({'id':id}).css({
                    'width':this.setting.pwidth+"px",
                    'height':this.setting.pheight+"px",
                    'position':'fixed',
                    'top':this.top+this.setting.margin_top-scrollTop,
                    'left':this.left+this.width+this.setting.margin_left,
                    'overflow':'hidden'
                }).addClass(this.setting.pclass);
            },
            createImg:function(){
                var img=document.createElement("img");
                $(img).attr("src",this.imgsrc).css({
                    'width':this.width*this.setting.scale,
                    'height':this.height*this.setting.scale,
                    'margin-top':'0px',
                    'margin-left':'0px',
                    'position':'relative'
                });
                var pdiv="#"+this.pdiv;
                $(pdiv).append($(img));
            },
            updImg:function(scaleX,scaleY){
                var top=(scaleY*this.height*this.setting.scale)-(scaleY*this.setting.pheight);
                var left=(scaleX*this.width*this.setting.scale)-(scaleX*this.setting.pwidth);
                var pdiv="#"+this.pdiv;
                $(pdiv).find("img").css({'top':-top+"px"});
                $(pdiv).find("img").css({'left':-left+"px"});
            },
            getSetting:function(){
                var setting=this.xq_big.attr("setting");//节点属性配置参数
                if (setting && setting!="") {
                    return $.parseJSON(setting);
                }else{
                    return {};
                }
            }
        };
        XQ_bigimg.init=function($ele){
            var _this_=this;
            $ele.each(function(){
                new _this_($(this));
            });
        }
        window['XQ_bigimg']=XQ_bigimg;
    })(jQuery)
    $(function(){
        XQ_bigimg.init($("[xq_big='true']"));
    });
}


//收藏本站
function addFavorite(obj, opts){
    var _t, _u;
    if(typeof opts != 'object'){
        _t = document.title;
        _u = location.href;
    }else{
        _t = opts.title || document.title;
        _u = opts.url || location.href;
    }
    try{
        window.external.addFavorite(_u, _t);
    }catch(e){
        // if(window.sidebar){
        //     obj.href = _u;
        //     obj.title = _t;
        //     obj.rel = 'sidebar';
        // }else{
        //     alert('抱歉，您所使用的浏览器无法完成此操作。\n\n请使用 Ctrl + D 将本页加入收藏夹！');
        // }
        try {
            window.sidebar.addPanel(_t, _u, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
