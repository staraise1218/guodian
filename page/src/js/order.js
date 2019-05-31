/**
 * @user_id     【用户id】
 * @type        【订单状态类型：不传参默认全部，待付款：WAITPAY；待发货：WAITSEND； 待收货：WAITRECEIVE；已完成：FINISH；已取消：CANCEL】
 * @page 	    【页码，从1开始】
 */

let user_id = 20;
let page = 1;
let type = getParam('type');

















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
                                    <span class="btn">去付款</span>
                                </div>
                            </div>
                        </li>`
                switch (type) {
                    case '':
                        $('.ALL').append(list)
                        break;
                    case 'WAITPAY':
                        $('.WAITPAY').append(list)
                        break;
                    case 'WAITRECEIVE':
                        $('.WAITRECEIVE').append(list)
                        break;
                    case 'FINISH':
                        $('.FINISH').append(list)
                        break;
                    case 'CANCEL':
                        $('.CANCEL').append(list)
                        break;
                    default:
                        $('.ALL').append(list)
                        break;
                }
            });
        }
    })
}






$('.content').delegate('.to', 'click', function () {
    console.log($(this).attr('data-order_id'))
    window.location.href = './orderDetail.html?order_id=' + $(this).attr('data-order_id')
})



/**
 * 猜你喜欢
 * @el      【挂在元素】
 * @user_id 【用户id】
 * @num     【加载数量】
 */
favorite ($('.recommend'), user_id, 20);

