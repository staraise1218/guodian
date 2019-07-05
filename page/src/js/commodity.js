// alert(window.location.href)
/**
 * =================================================
 *          公共变量
 * =================================================
 */
let spec_goods_price = [] // 规格对照数据
let item_id = {}; // 规格对照id
let itemStr = '';
let price = 0; // 价格
let price_base = 0; // 价格
let store_count = 0; // 库存
let count = 1; // 选择数量
let count_base = 1; // 库存
let $id = ''; // 规格id
let goods_id = ''; // 商品 id
let user_id = '';
if(localStorage.getItem('USERINFO')) {
    let myUsetInfo = localStorage.getItem('USERINFO');
    myUsetInfo = JSON.parse(myUsetInfo);
    console.log(myUsetInfo)
    user_id = myUsetInfo.user_id;
} else {
    user_id = 0;
}
// alert(localStorage.getItem('USERINFO'))
let kucun = '';     // 库存
// alert('user_id :' + user_id)
/**
 * =================================================
 *          goodsid     //   theRequest
 * =================================================
 */
// urlinfo=window.location.href; //获取当前页面的url
// len=urlinfo.length;//获取url的长度
// offset=urlinfo.indexOf("?");//设置参数字符串开始的位置
// newsidinfo=urlinfo.substr(offset,len)//取出参数字符串 这里会获得类似“id=1”这样的字符串
// newsids=newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割
// newsid=newsids[1];//得到参数值
goods_id = getParam('goods_id');
// alert('goods_id : (js)' + goods_id)

/**
 * =================================================
 *          nav 导航切换
 * =================================================
 */
// 滑动切换
$(window).scroll(function () {
    if ($(window).scrollTop() >= $(window).height()) {
        $('.nav').slideDown('fast');
    }
    if ($(window).scrollTop() < $(window).height()) {
        $('.nav').slideUp("fast");
    }
    // nav-1 ----- nav-4 商品
    if ($(window).scrollTop() >= ($('#nav-1').offset().top - 51) && $(window).scrollTop() < ($('#nav-4').offset().top - 51)) {
        $('.nav .nav-2').removeClass('active')
        $('.nav .nav-3').removeClass('active')
        $('.nav .nav-4').removeClass('active')
        $('.nav .nav-1').addClass('active')
    }
    // nav-4 ---- >> 详情
    if ($(window).scrollTop() > ($('#nav-3').offset().top - 51)) {
        $('.nav .nav-1').removeClass('active')
        $('.nav .nav-2').removeClass('active')
        $('.nav .nav-4').removeClass('active')
        $('.nav .nav-3').addClass('active')
    }
    // nav-4 ----- nav-3 推荐
    if ($(window).scrollTop() >= ($('#nav-4').offset().top - 51) && $(window).scrollTop() < (($('#nav-3').offset().top) - 81)) {
        $('.nav .nav-1').removeClass('active')
        $('.nav .nav-2').removeClass('active')
        $('.nav .nav-3').removeClass('active')
        $('.nav .nav-4').addClass('active')
    }
});

// 点切换
$('.nav-1').on('click', function () {
    $('html,body').animate({
        scrollTop: $('#nav-1').offset().top - 50
    }, 'slow');
})
// $('.nav-2').on('click', function () {
//     $('html,body').animate({scrollTop:$('#nav-1').offset().top - 100},'slow');
// })
$('.nav-3').on('click', function () {
    $('html,body').animate({
        scrollTop: ($('#nav-3').offset().top - 50)
    }, 'slow');
})
$('.nav-4').on('click', function () {
    $('html,body').animate({
        scrollTop: ($('#nav-4').offset().top - 80)
    }, 'slow');
})

/**
 * 分享
 */
$('.share-show').click(function () {
    $('.share_bg').show();
    $('.share-wrap').slideDown('fast')
})
// 关闭分享
$('.share_bg').click(function () {
    $('.share_bg').hide();
    $('.share-wrap').slideUp('fast')
})

// 分享
$('.share-wrap li').on('click', function () {
    console.log($(this).attr('data-type'))
    switch($(this).attr('data-type')) {
        case '0': // 微博
            console.log('分享到微博')
            break;
        case '1': // 微信
            shareWx();
            console.log('分享到微信')
            break;
        case '2': // QQ

            console.log('分享到QQ')
            break;
        default:
            console.log('分享错误');
            break;
    }
})

/**
 * =================================================
 *          数据加载
 * =================================================
 */
getInfo();
getTuijian()

function getInfo() {
    console.log('加载商品数据')
    $.ajax({
        type: 'post',
        url: GlobalHost + '/Api/goods/goodsInfo',
        data: {
            user_id: user_id,
            goods_id: goods_id
        },
        dataType: 'json',
        success: function (res) {
            // debugger;
            console.log(res)
            // 渲染顶部标题
            $('.top-text').text(res.data.goodsInfo.goods_remark)
            // 渲染轮播图
            let slider = '';
            for (let i = 0; i < res.data.goodsInfo.goods_images_list.length; i++) {
                var imgstr = GlobalHost + res.data.goodsInfo.goods_images_list[i].image_url;
                slider += `<div class="swiper-slide"><img  src="${imgstr}" alt="img"></div>`
            }
            console.log(res.data.goodsInfo.goods_images_list.length)
            $('.swiper-wrapper').html(slider)
            // 价格及商品信息
            price_base = res.data.goodsInfo.shop_price;
            $('.infoWrap').html(`
                <div class="_price">￥ ${res.data.goodsInfo.shop_price}</div>
                <div class="del">官方公价：<del>￥${res.data.goodsInfo.brand_id}</del></div>
                <div class="box">
                    <span class="left">会员专享￥${res.data.goodsInfo.brand_id}</span>
                    <span class="right">开通会员 <img class="icon-sm" src="${res.data.goodsInfo.brand_id}" alt=""></span>
                </div>
                <div>${res.data.goodsInfo.goods_name}</div>
                <div>${res.data.goodsInfo.brand_id}</div>
                <div>商品成色：${res.data.goodsInfo.brand_id}</div>
            `)
            // 商品信息
            let shopInfo = '';
            for (let j = 0; j < res.data.goods_attr_list.length; j++) {
                shopInfo += `<li class="info-item">
                            <span class="left">${res.data.goods_attribute[res.data.goods_attr_list[j].attr_id]}</span>
                            <span class="right">${res.data.goods_attr_list[j].attr_value}</span>
                        </li>`
            }
            $('.shop-info').html(shopInfo)
            // 商品详情
            let reg = /src="/g
            let shopCon = '';
            // reg.test(res.data.goods_content)
            // console.log(res.data.goodsInfo.goods_content)
            res.data.goodsInfo.goods_content = res.data.goodsInfo.goods_content.replace(reg, '/src="' + GlobalHost)
            $('.shopCon').html(res.data.goodsInfo.goods_content)
            // console.log(res.data.goodsInfo.goods_content)
            // 绑定id
            $('.add').attr('data-goods_id', res.data.goodsInfo.goods_id);
            $('.payNow').attr('data-goods_id', res.data.goodsInfo.goods_id);
            $('.shopCart-item').attr('data-goods_id', res.data.goodsInfo.goods_id);
            // 是否收藏了该商品
            if (res.data.goodsInfo.is_collect == 1) {
                $('.collection-icon').prop('src', './src/img/icon/collection-choose.png')
                $('.collection').attr('data-is_collect', 1)
            }

            console.log(JSON.parse(res.data.spec_goods_price))
            spec_goods_price = JSON.parse(res.data.spec_goods_price);
            // 购物车
            $('.alert-title').html(`
                <div class="poster-wrap">
                    <img src="${GlobalHost + res.data.goodsInfo.original_img}" alt="">
                </div>
                <div class="title-right">
                    <p class="price">￥${res.data.goodsInfo.shop_price}</p>
                    <p>${res.data.goodsInfo.goods_name}</p>
                    <p>${res.data.goodsInfo.goods_remark}</p>
                </div>
            `)
            let alertStr = '';
            // 规格相关
            for (var key in res.data.filter_spec) {}
            for (var key in res.data.filter_spec) {
                alertStr += `
                    <div class="item-wrap">
                        <div class="item-title">${key}</div>
                        <div class="item">`
                var tagStr = '';
                for (let z = 0; z < res.data.filter_spec[key].length; z++) {
                    tagStr += `<span data-msg="${key}" data-id="${res.data.filter_spec[key][z].item_id}" class="tag">${res.data.filter_spec[key][z].item}</span>`
                }
                alertStr += tagStr + `</div></div>`
                // 初始化 item_id   【规格对照 {} 】
                item_id[key] = '';
            }
            $('.alert-list').html(alertStr)
            // 库存
            count_base = res.data.goodsInfo.store_count;
            kucun = res.data.goodsInfo.store_count;
            $('.addChopCart .ctr .store_count').text('库存' + res.data.goodsInfo.store_count + '件')
            $('.byNow .ctr .store_count').text('库存' + res.data.goodsInfo.store_count + '件')
        }
    });
}

function getTuijian() {
    // debugger;
    $.ajax({
        type: 'POST',
        url: GlobalHost + '/Api/goods/recommendgoodslist',
        data: {
            user_id: user_id,
            num: 21
        },
        success: function (res) {
            // debugger;
            console.log(res)
            // 在销售商品
            let shoppintCon = '';
            for (let i = 0; i < res.data.length; i++) {
                shoppintCon += `<li><img src="" alt=""></li>`
            }
            $.each(res.data, function (index, item) {
                $('.shoppint-con').append(`<li class='go' data-goods_id="${item.goods_id}"><img src="${GlobalHost + item.original_img}" alt=""></li>`)
            });
        },
        error: function (error) {
            console.log('error', error);
        }
    })
}



$('body').delegate('.go', 'click', function () {
    console.log($(this).attr('data-goods_id'))
    window.location.href = 'commodity.html?goods_id=' + $(this).attr('data-goods_id')
})

/**
 * =================================================
 *          轮播图执行
 * =================================================
 */
$(window).on('load', function () {
    setTimeout(function () {
        var swiper = new Swiper('.swiper-container', {
            // spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: true,
            loop: true,
            disableOnInteraction: false,
        });
    }, 1000)
})

/**
 * =============================================
 *          弹层
 * =============================================
 */
// 购物车
$('.add').on('click', function () {
    if(user_id == 0) {
        $('#login').show();
        setTimeout(() => {
            $('#login').hide();
        }, 2000)
        return
    }
    $('.alert').css('display', 'block');
    $('.addChopCart').slideDown(200);
})

// 立即购买
$('.payNow').on('click', function () {
    if(user_id == 0) {
        $('#login').show();
        setTimeout(() => {
            $('#login').hide();
        }, 2000)
        return
    }
    $('.alert').css('display', 'block');
    $('.byNow').slideDown(200);
})
// 点击蒙层隐藏
$('.alert').on('click', function () {
    // debugger;
    $('.alert').css('display', 'none');
    $('.addChopCart').slideUp(200);
    $('.byNow').slideUp(200);
})
// 点击close隐藏
$('.close').on('click', function () {
    // debugger;
    $('.alert').css('display', 'none');
    $('.addChopCart').slideUp(200);
    $('.byNow').slideUp(200);
})


/**
 * =================================================
 *          收藏商品
 * =================================================
 */
$('.collection').on('click', function () {
    if(user_id == 0) {
        $('#login').show();
        setTimeout(() => {
            $('#login').hide();
        }, 2000)
        return
    }
    $.ajax({
        type: 'POST',
        url: GlobalHost + '/Api/goods/collect_goods',
        data: {
            user_id: user_id,
            goods_id: goods_id
        },
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                $('.collection-icon').prop('src', './src/img/icon/collection-choose.png')
            }
        }
    })
})

/**
 * =================================================
 *       【购物车】         选择规格
 * =================================================
 */
$('body').delegate('.tag', 'click', function () {
    // debugger;
    // console.log($(this).attr('data-id'))
    // console.log($(this).attr('data-msg'))
    item_id[$(this).attr('data-msg')] = $(this).attr('data-id')
    // console.log(Object.keys(item_id))

    // console.log(Object.keys(item_id))
    itemStr = '';
    itemStr = Object.values(item_id).join('_')
    console.log(itemStr)
    console.log(spec_goods_price[itemStr])
    $('.tag[data-msg=' + $(this).attr('data-msg') + ']').removeClass('active');
    $(this).addClass('active');
    if (spec_goods_price[itemStr].price) {
        price_base = spec_goods_price[itemStr].price;
        price = price_base * count;
        count_base = spec_goods_price[itemStr].store_count;
        $('.store_count').text('库存' + count_base + '件');
        $('.price').text('￥' + price);
        $('.ctr .store_count').text(spec_goods_price[itemStr].store_count)
        $id = spec_goods_price[itemStr].item_id
    }
})

/**
 * =================================================
 *      【购物车】          选择数量
 * =================================================
 */
$('.addcart_reduce').on('click', function () {
    // debugger;
    if (count >= 2) {
        count--;
        price = price_base * count;
        $('.add_count').text(count);
        $('.price').text('￥' + price);
    }
})

$('.addcart_add').on('click', function () {
    if (count > count_base - 1) {
        return
    }
    count++;
    price = price_base * count;
    $('.add_count').text(count);
    $('.price').text('￥' + price);
})
/**
 * =================================================
 *       加入购物车
 * =================================================
 */
$('.addBtn').on('click', function () {
    // debugger;
    $.ajax({
        type: 'POST',
        url: GlobalHost + '/Api/cart/addCart',
        data: {
            user_id: user_id,
            goods_id: goods_id,
            item_id: $id,
            goods_num: count
        },
        success: function (res) {
            console.log(res)
            $('.alert').css('display', 'none');
            $('.addChopCart').slideUp(200);
            $('.byNow').slideUp(200);
            alert(res.msg)
        }
    })
})






/**
 * =================================================
 *       【立即购买】         选择规格
 * =================================================
 */
$('body').delegate('.tag', 'click', function () {
    // debugger;
    // console.log($(this).attr('data-id'))
    // console.log($(this).attr('data-msg'))
    item_id[$(this).attr('data-msg')] = $(this).attr('data-id')
    // console.log(Object.keys(item_id))

    // console.log(Object.keys(item_id))
    itemStr = '';
    itemStr = Object.values(item_id).join('_')
    console.log(itemStr)
    console.log(spec_goods_price[itemStr])
    $('.tag[data-msg=' + $(this).attr('data-msg') + ']').removeClass('active');
    $(this).addClass('active');
    if (spec_goods_price[itemStr].price) {
        price_base = spec_goods_price[itemStr].price;
        price = price_base * count;
        count_base = spec_goods_price[itemStr].store_count;
        $('.store_count').text('库存' + count_base + '件');
        $('.price').text('￥' + price);
        $('.ctr .store_count').text(spec_goods_price[itemStr].store_count)
        $id = spec_goods_price[itemStr].item_id
    }
})


/**
 * =================================================
 *      页面跳转
 * =================================================
 */
// 跳转 立即购买
$('.byNowBtn').on('click', function (e) {
    // debugger;
    if(kucun == 0) {
        alert('库存不足')
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    $('.alert').css('display', 'none');
    $('.addChopCart').slideUp(200);
    $('.byNow').slideUp(200);
    // alert('跳转3')
    localStorage.setItem('YH', JSON.stringify({STATUS:0}));
    window.location.href = './jieshuan.html?action=buy_now&goods_id=' + goods_id + '&item_id=' + $id + '&goods_num=' + count;
    return false;
})

// 跳转购物袋
$('#goShoppingBag').on('click', function (e) {
    // debugger;
    window.location.href = './shoppingBag.html';
    return false;
})



// 隐藏店铺
$('.alert-bg').click(function () {
    $('.alert-bg').hide();
    $('.alert-dianpu').hide();
})


// 点击加载店铺
$('.see-dp').click(function () {
    zitidian();
    $('.alert-bg').show();
    $('.alert-dianpu').show();
})
// 加载店铺信息
function zitidian() {
    $.ajax({
        type: 'post',
        url: GlobalHost + '/api/cart/storeInfo',
        success: function (res) {
            console.log(res)
            $('.loading').hide();
            if (res.code == 200) {
                res.data.storeInfo = res.data.storeInfo.replace(/[\r\n]/g, "</br>")
                $('.zianpu-con').html(res.data.storeInfo);
            } else {
                console.log('接口报错了')
            }
        }
    })
}


// 分享到微信
function shareWx() {

}