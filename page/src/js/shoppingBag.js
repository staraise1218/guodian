/**
 * ===============================================
 *          左右滑动判断
 * ===============================================
 */

$("body").delegate('.srco-item',"touchstart", function (e) {
    // console.log($(this).attr('data-scroll'))
    // 判断默认行为是否可以被禁用
    if (e.cancelable) {
        // 判断默认行为是否已经被禁用
        if (!e.defaultPrevented) {
            e.preventDefault();
        }
    }
    startX = e.originalEvent.changedTouches[0].pageX,
    startY = e.originalEvent.changedTouches[0].pageY;
});
$("body").delegate('.srco-item',"touchend", function (e) {
    // 判断默认行为是否可以被禁用
    if (e.cancelable) {
        // 判断默认行为是否已经被禁用
        if (!e.defaultPrevented) {
            e.preventDefault();
        }
    }
    moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY;
    //左滑
    if (X > 0) {
        // console.log('左滑');
        if ($(this).attr('data-scroll') == 'left') {
            console.log($(this).attr('data-scroll'))
            $(this).attr('data-scroll', 'right')
                .animate({
                    left: 0
                }, 500);
        }
    }
    //右滑
    else if (X < 0) {
        // console.log('右滑');
        if ($(this).attr('data-scroll') == 'right') {
            console.log($(this).attr('data-scroll'))
            $(this).attr('data-scroll', 'left')
                .animate({
                    left: -$('.del').eq(0).width()
                }, 500);
        }
    }
    //下滑
    else if (Y > 0) {
        // console.log('下滑');
    }
    //上滑
    else if (Y < 0) {
        // console.log('上滑');
    }
    //单击
    else {
        // console.log('单击');
        // 选择
        if ($(this).attr('data-scroll') == 'left') {
            console.log($(this).attr('data-scroll'))
            $(this).attr('data-scroll', 'right')
                .animate({
                    left: 0
                }, 500);
        }
        if($(e.target).attr('data-choose') == 0) {
            $(this).find('.choose').css('display','none')
            $(this).find('.choose-active').css('display','block')
        }
        if($(e.target).attr('data-choose') == 1) {
            $(this).find('.choose').css('display','block')
            $(this).find('.choose-active').css('display','none')
        }
    }
});



// 全选
$('.chooseAll .left-choose').on('click', function (e) {
    if($(this).attr('data-choose') == 0) {
        $(this).find('.choose-icon').prop('src', './src/img/icon/圆1.png');
        $(this).attr('data-choose', '1');
        $('.choose').css('display','none');
        $('.choose-active').css('display','block');
    } else if($(this).attr('data-choose') == 1) {
        $(this).find('.choose-icon').prop('src', './src/img/icon/圆.png');
        $(this).attr('data-choose', '0');
        $('.choose').css('display','block');
        $('.choose-active').css('display','none');
    }
})



/**
 * =====================================================
 *          加载列表
 * =====================================================
 */
$.ajax({
    type: 'POST',
    url: Global + '/Api/cart/index',
    data: {
        user_id: 1,
        city_code: 110100
    },
    success: function (res) {
        console.log(res)
        let goodsList = '';
        for(let i = 0; i < res.data.length; i++) {
            goodsList += `
            <li class="srco-item good-item" data-id="${res.data[i].id}" data-scroll="right">
                <div class="left">
                    <div class="choose-wrap" data-choose="0">
                        <img class="icon-lg choose" src="./src/img/icon/圆.png" data-choose="0" alt="">
                        <img class="icon-lg choose-active" style="display:none" src="./src/img/icon/圆1.png" data-choose="1" alt="">
                    </div>
                    <div class="commity">
                        <img class="poster" src="${Global + res.data[i].goods.original_img}" alt="">
                    </div>
                </div>
                <div class="right">
                    <p>AUDEMARS PIGUET</p>
                    <p>${res.data[i].goods_name}</p>
                    <p class="price">￥ 336,384</p>
                </div>
                <div class="del">移除</div>
            </li>`
        }
        $('.commodityList').html(goodsList);
    }
})










$.ajax({
    type: 'POST',
    url: Global + '/Api/goods/recommendgoodslist',
    data: {
        user_id: 1,
        num: 20
    },
    success: function (res) {
        let recommendStr = '';
        console.log(res.data)
        $.each( res.data, function(index, item){
            recommendStr += `<li class="good-item" data-goodid="${item.goods_id}">
                                <img src="${ Global + item.original_img }" class="com" />
                                <p>${item.goods_name}</p>
                                <p class="price">价格：￥${item.shop_price}</p>
                                <p class="del">官方公价：￥1,238,300</p>
                            </li>`
        });
        $('.recommend').html(recommendStr)
    }
})









$('.recommend').delegate('.good-item', 'click', function () {
    console.log($(this).attr('data-goodid'))
    window.location.href = 'commodity.html?goods_id=' + $(this).attr('data-goodid')
})

