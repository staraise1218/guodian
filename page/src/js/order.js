/**
 * @user_id     【用户id】
 * @type        【订单状态类型：不传参默认全部，待付款：WAITPAY；待发货：WAITSEND； 待收货：WAITRECEIVE；已完成：FINISH；已取消：CANCEL】
 * @page 	    【页码，从1开始】
 */

let user_id = 20;
let page = 1;
let type = getParam('type');







console.log(type)
var len = ''
switch (type) {
    case 'WAITPAY':     // 代付款
        len = $('.tabBar li').length;
        $('.tabBar li').removeClass('active');
        $('.tabBar .WAITPAY_').addClass('active');
        break;
    case 'WAITSEND':    // 待发货
        len = $('.tabBar li').length;
        $('.tabBar li').removeClass('active');
        $('.tabBar .WAITSEND_').addClass('active');
        break;
    case 'WAITRECEIVE': // 待收货
        len = $('.tabBar li').length;
        $('.tabBar li').removeClass('active');
        $('.tabBar .WAITRECEIVE_').addClass('active');
        break;
    case 'FINISH':      // 已完成
        len = $('.tabBar li').length;
        $('.tabBar li').removeClass('active');
        $('.tabBar .FINISH_').addClass('active');
        break;
    case 'CANCEL':      // 已完成
        len = $('.tabBar li').length;
        $('.tabBar li').removeClass('active');
        $('.tabBar .CANCEL_').addClass('active');
        break;
    case 'ALL':         // 全部
        len = $('.tabBar li').length;
        $('.tabBar li').removeClass('active');
        $('.tabBar .ALL_').addClass('active');
        break;
    default:
        len = $('.tabBar li').length;
        $('.tabBar li').removeClass('active');
        $('.tabBar .ALL_').addClass('active');
        break;
}


/**
 * 初始化函数执行
 */
createList(user_id, page, type); // 加载列表

// 按钮操作
$('.item-wrap').delegate('.btn-wrap span', 'click', function (event) {
    console.log($(this))
    event.stopPropagation();    //  阻止事件冒泡
    console.log($(this).attr('data-action'))
    console.log($(this).attr('data-orderid'))
    switch($(this).attr('data-action')) {
        case 'pay':         // 去付款
            pay($(this).attr('data-orderid'));
            break;
        case 'cancel':      // 取消
            cancelOrder($(this).attr('data-orderid'));
            break;
        case 'del':         // 删除

            break;
        case 'shouhuo':     // 确认收货

            break;
        case 'see':         // 查看物流

            break;
        default:
            console.log('**************************传参出错*************************');
            break;
    }
})


// 跳转详情
$('.content').delegate('.to', 'click', function () {
    console.log($(this).attr('data-order_id'))
    window.location.href = './orderDetail.html?order_id=' + $(this).attr('data-order_id')
})



/**
 * Tab 切换
 */
$('.tabBar li').on('click', function () {
    type = $(this).attr('data-type');
    type == 'ALL' ? '' : type;
    $('.tabBar li').removeClass('active');
    $(this).addClass('active')
    $('.content .item-wrap').css('display', 'none');
    console.log($(this).attr('data-type'))
    createList(user_id, page, type); // 加载列表
    for (var i = 0; i < $('.content .item-wrap').length; i++) {
        if ($('.content .item-wrap').eq(i).attr('data-type') == $(this).attr('data-type')) {
            $('.content .item-wrap').eq(i).css('display', 'block')
        }
    }
})













/**=================================================================================
 *                  定义函数
 * =================================================================================
 */
// 加载订单列表
function createList(user_id, page, type) {
    var posData = {
        user_id: user_id,
        page: page,
        type: type
    }
    $.ajax({
        type: 'post',
        url: GlobalHost + '/Api/order/order_list',
        data: posData,
        success: function (res) {
            console.log(res)
            let list = '';
            res.data.forEach(item => {
                var shopList = '';
                item.goods_list.forEach(el => {
                    shopList += `<li>
                                    <div class="shop-wrap border-bottom">
                                        <div class="poster">
                                            <img src="./src/img/1.png" alt="">
                                        </div>
                                        <div class="right">
                                            <p class="text-df">${el.goods_name}</p>
                                            <p class="text-df color_3">副标题</p>
                                            <p class="text-df color_3">副标题</p>
                                            <div class="text-xs color_3 tag-wrap">
                                                <p class="tag">${el.spec_key_name}</p>
                                                <p class="num">x${el.goods_num}</p>
                                            </div>
                                            <p class="price">￥${el.member_goods_price}</p>
                                        </div>
                                    </div>
                                </li>`
                })
                shopList = '<ul>' + shopList + '</ul>'
                list += `<li class="to" data-order_id='${item.order_id}'>
                            <p class="btc">
                                <span>订单号：${item.order_sn}</span>
                                <span class="status">${item.order_status_desc}</span>
                            </p>
                            ${shopList}
                            <div class="ctr">
                                <p class="title">订单金额：￥1231231231</p>
                                <div class="btn-wrap">
                                    <span data-action="pay" data-orderid="${item.order_id}" style="display: ${item.pay_btn == 1 ? 'inline-block' : 'none'}" class="btn">去付款</span>
                                    <span data-action="cancel" data-orderid="${item.order_id}" style="display: ${item.cancel_btn == 1 ? 'inline-block' : 'none'}" class="btn-cancel">取消</span>
                                    <span data-action="del" data-orderid="${item.order_id}" style="display: ${item.del_btn == 1 ? 'inline-block' : 'none'}" class="btn-cancel">删除</span>
                                    <span data-action="shouhuo" data-orderid="${item.order_id}" style="display: ${item.receive_btn == 1 ? 'inline-block' : 'none'}" class="btn-cancel">确认收货</span>
                                    <span data-action="see" data-orderid="${item.order_id}" style="display: ${item.shipping_btn == 1 ? 'inline-block' : 'none'}" class="btn">查看物流</span>
                                </div>
                            </div>
                        </li>`
                switch (type) {
                    case '':
                        $('.ALL').html(list).show();
                        break;
                    case 'WAITPAY':
                        $('.WAITPAY').html(list).show();
                        break;
                    case 'WAITRECEIVE':
                        $('.WAITRECEIVE').html(list).show();
                        break;
                    case 'FINISH':
                        $('.FINISH').html(list).show();
                        break;
                    case 'CANCEL':
                        $('.CANCEL').html(list).show();
                        break;
                    default:
                        $('.ALL').html(list).show();
                        break;
                }
            });
        }
    })
}


// 支付 页面
function pay(order_id) {
    $.ajax({
        type: 'post',
        url: GlobalHost + '/api/payment/getCode',
        data: {
            order_id: order_id,
            pay_code: 'unionpay'
        },
        success: function (res) {
            console.log(res)
            // 跳转到支付页面
            if(res.code == 200) {
                window.location.href = './payLoad.html?status=pay'
                localStorage.setItem('payMsg', res.data);
            } else {
                console.log('********************************支付报错******************************')
            }

        }
    })
}

// 取消订单
function cancelOrder(order_id) {
    $.ajax({
        type: 'post',
        url: GlobalHost + '/Api/order/cancel_order',
        data: {
            order_id: order_id,
            user_id: user_id
        },
        success: function (res) {
            console.log(res)
            if(res.code == 200) {
                createAlert($('.alert-tips'), 'alert_tips', res.msg);
            } else {
                createAlert($('.alert-tips'), 'alert_tips', res.msg);
            }
        }
    })
}

/**
 * TODO:
 * 删除
 * 确认收货
 */






/**
 * 猜你喜欢
 * @el      【挂在元素】
 * @user_id 【用户id】
 * @num     【加载数量】
 */
favorite ($('.recommend'), user_id, 20);

