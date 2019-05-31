/**
 * API 公共
 */
var GlobalHost = 'http://guodian.staraise.com.cn'


/**
 * 正则
 */
// 姓名
let userNameRgx = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
// 手机号
let phoneRgx = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
// 身份证
let shenfenCardRgx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;





/** 
 * 获取指定的URL参数值 
 * 参数：paramName URL参数 
 * 调用方法:getParam("name") 
 */
function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}






/**
 * 回退 1
 */
$('.back').on('click', function () {
    window.history.back(-1);
})



/**
 * 时间戳转时间
 */
function formatDate(date) {
    if (date.length == 10) {
        date = date * 1000
    }
    date = Number(date)
    date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}




/**
 * 猜你喜欢
 * @el      【挂在元素】
 * @user_id 【用户id】
 * @num     【加载数量】
 */
function favorite(el, user_id, num) {
    $.ajax({
        type: 'POST',
        url: GlobalHost + '/Api/goods/recommendgoodslist',
        data: {
            user_id: user_id,
            num: num
        },
        success: function (res) {
            let recommendStr = '';
            console.log(res.data)
            $.each(res.data, function (index, item) {
                recommendStr += `<li class="good-item" data-goodid="${item.goods_id}">
                                    <img src="${ GlobalHost + item.original_img }" class="com" />
                                    <p>${item.goods_name}</p>
                                    <p class="price">价格：￥${item.shop_price}</p>
                                    <p class="del">官方公价：￥1,238,300</p>
                                </li>`
            });
            el.html(recommendStr)
        }
    })
}

$('.recommend').delegate('.good-item', 'click', function () {
    console.log($(this).attr('data-goodid'))
    window.location.href = 'commodity.html?goods_id=' + $(this).attr('data-goodid')
})





/**
 * 输入弹窗
 * @alert_name_phone    自提点联系人信息
 * @alert_IDcard        收货人身份证
 * @alert_tips          提示信息 【info 想要提示的信息】
 * @alert_name          输入姓名    TODO:
 * @alert_phone         输入手机号  TODO:
 * @alert_address       输入详细地址 TODO:
 */

function createAlert(el, str, info) {
    if(!info) {
        info = '未知错误'
    }
    let alert_name_phone = `<div class="alert-wrapper user-wrapper" style="display: block">
                                <div class="alert-content">
                                    <div class="be-center-2">
                                        <p class="w-df">自提点联系人信息</p>
                                        <img class="close-icon user-close" src="./src/img/icon/x.png" alt="">
                                    </div>
                                    <input id="user-name" type="text" placeholder="请添加联系人姓名"> 
                                    <input id="user-phone" type="text" placeholder="请添加联系人电话"> 
                                    <!-- <input type="button" value="确定" class="submit user-btn-active"> -->
                                    <input id="user-submit" type="button" value="确定" class="submit">
                                </div>
                            </div>`;

    let alert_IDcard = `<div class="alert-wrapper shenfen-wrap" style="display: block">
                            <div class="alert-content">
                                <div class="be-center-2">
                                    <p class="w-df">输入身份证号</p>
                                    <img class="close-icon shenfen-close" src="./src/img/icon/x.png" alt="">
                                </div>
                                <input id="shenfenCard" type="text" placeholder="请添加收货人身份证号">
                                <input id="shenfenCard-submit" type="button" value="确定" class="submit">
                                <!--  shenfenCard-active -->
                            </div>
                        </div>`;
    let alert_tips = `<div class="shoTost text-xs" style="display: block">${info}</div>`;
    let alert_name = ``;
    
    
    switch(str) {
        case 'alert_name_phone':
            el.html(alert_name_phone);
            break;
        case 'alert_IDcard':
            el.html(alert_IDcard);
            break;
        case 'alert_tips':
            el.html(alert_tips);
            el.show();
            setTimeout(() => {
                console.log(098)
                el.fadeOut()
            }, 500);
            break;
        default:
            console.log('***输入弹窗**传参不正确');
            break;
    }
}













/**
 * 自提人信息弹窗
 */

// 显示自提联系人信息
$('.address').on('click', function () {
    $('.user-wrapper').css('display', 'block');
})

// 关闭自提联系人信息
$('.user-close').on('click', function () {
    $('.user-wrapper').css('display', 'none');
})

// 判断用户名
$('#user-name').on('input', function () {
    console.log(userNameRgx.test($(this).val()));
    if (userNameRgx.test($(this).val())) {
        userNameStatus = 1;
        userNameVal = $(this).val();
    } else {
        userNameStatus = 0;
    }
    if (userNameStatus == 1 && userPhoneStatus == 1) {
        $('.user-wrapper .submit').addClass('user-btn-active')
    } else {

        $('.user-btn-active').removeClass('user-btn-active')
    }
})

// 判断用户电话
$('#user-phone').on('input', function () {
    console.log(phoneRgx.test($(this).val()));
    if (phoneRgx.test($(this).val())) {
        userPhoneStatus = 1;
        userPhoneVal = $(this).val();
    } else {
        userPhoneStatus = 0;
    }
    if (userNameStatus == 1 && userPhoneStatus == 1) {
        $('.user-wrapper .submit').addClass('user-btn-active')
    } else {
        $('.user-btn-active').removeClass('user-btn-active')
    }
})

// 自提联系人信息 提交
$('#user-submit').on('click', function () {
    if (userNameStatus == 1 && userPhoneStatus == 1) {
        $('#username-userphone').text(userNameVal + '-' + userPhoneVal);
        $('.user-wrapper').css('display', 'none');
    }
})








/**
 * 身份证弹窗
 */
// 显示输入身份证号
$('.shenfen-btn').on('click', function () {
    $('.shenfen-wrap').css('display', 'block');
})

// 关闭输入身份证号
$('.shenfen-close').on('click', function () {
    $('.shenfen-wrap').css('display', 'none');
})

// 判断身份证
$('#shenfenCard').on('input', function () {
    if (shenfenCardRgx.test($(this).val())) {
        shfenCardStatus = 1;
        shfenCardVal = $(this).val();
        $('.shenfen-wrap .submit').addClass('shenfenCard-active')
    } else {
        shfenCardStatus = 0;
        $('.shenfenCard-active').removeClass('shenfenCard-active')
    }
})

// 身份证提交
$('#shenfenCard-submit').on('click', function () {
    if (shfenCardStatus == 1) {
        $('#shenfenCardVal').text(shfenCardVal);
        $('.shenfen-wrap').css('display', 'none');
    }
})



$('body').delegate('#user-name-only', 'input', function () {
    console.log($(this).val())

})