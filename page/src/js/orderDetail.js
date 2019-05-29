/**
 * @user_id     【用户id】
 * @order_id    【订单id】
 */
let order_id = getParam('order_id');
let user_id = 20;




createOrder(order_id, user_id);

function createOrder(order_id) {
    $.ajax({
        type: 'post',
        url: GlobalHost + '/Api/order/order_detail',
        data: {
            order_id: order_id,
            user_id: user_id
        },
        success: function (res) {
            console.log(res);
            let data = res.data;

            /**判断订单状态
             * @order_status_code   【待付款：WAITPAY，待发货：WAITSEND， 待收货：WAITRECEIVE，待评价：WAITCCOMMENT】
             * @class[tips]         【金色提示】
             * @class[order-track]  【订单跟踪】
             */
            switch (data.order_status_code) {
                case 'WAITPAY': // 待付款
                    $('.tips').html(`<div class="writpay">
                                        <div class="title">
                                            <p>待付款</p>
                                            <p class="price">￥123456</p>
                                        </div>
                                        <div class="title">
                                            <p>剩余12341y94832</p>
                                            <p class="price">应付金额</p>
                                        </div>
                                    </div>`)
                    $('.order-track').html(`<div class="order-title more text-df md">
                                                <div class="writpay">
                                                    <p class="w-1">订单跟踪</p>
                                                    <p class="w-1 text-xs">您的订单已提交，等待系统确认</p>
                                                    <p class="text-xs op-4">2019</p>
                                                </div>
                                            </div>`)
                    break;
                case 'WAITSEND': // 待发货   TODO: 缺少UI
                    $('.tips').html('');
                    $('.order-track').html('')
                    break;
                case 'WAITRECEIVE': // 待收货
                    $('.tips').html(`<div class="waitreceive">
                                            <div class="left">
                                                <p class="text-lg">卖家已发货</p>
                                                <p>还剩</p>
                                            </div>
                                            <div class="right">
                                                <img src="./src/img/icon/daishouhuo.png" alt="">
                                            </div>
                                        </div>`);
                    $('.order-track').html(`<div class="order-title more text-df md">
                                                <div class="waitreceive">
                                                    <p class="w-1">运输中</p>
                                                    <p class="w-1 text-xs">顺丰快递单号：123</p>
                                                </div>
                                            </div>`)
                    break;
                case 'WAITCCOMMENT': // 待评价
                    $('.tips').html(`<div class="waitccomment">
                                        <p>${data.order_status_desc}</p>
                                        <img src="./src/img/icon/daishouhuo.png" alt="">
                                    </div>`);
                    $('.order-track').html(`<div class="order-title more text-df md">
                                                    <div class="waitccomment">
                                                    <p class="w-1">已签收</p>
                                                    <p class="w-1 text-xs">${data.shipping_name}： 没有数据</p>
                                                </div>
                                            </div>`)
                    break;
                case 'CANCEL':   // 已取消
                    $('.tips').html(`<div class="CANCEL">
                                        <p>已取消</p>
                                    </div>`);
                    $('.order-track').html('')
                    break;
                default:
                    break;
            }

            /**判断配送方式
             * @buy_method  【配送方式 1 到店自提 2 快递送货】
             */
            switch (data.buy_method) {
                case '1':
                    $('.buy_method .con').text('到店自提');
                    break;
                case '2':
                    $('.buy_method .con').text('快递送货');
                    break;
            }

            /**收货地址
             * @class[address-con consignee]    收货人 + 手机号
             * @class[address-con fulladdress]  详细地址
             */
            $('.address-con .consignee').text(data.consignee == '' ? '收货人信息为空' : data.consignee + ' ' + data.mobile == '' ? '手机号码为空' : data.mobile);
            $('.address-con .fulladdress').text(data.fulladdress == '' ? '地址信息为空' : data.fulladdress);

            /**身份证号
             * @class[ID_number]
             */
            $('.ID_number .con').text(data.ID_number == '' ? '身份证信息为空' : data.ID_number);

            /**商品
             * 
             */
            let listStr = '';
            data.goods_list.forEach(item => {
                listStr += `<li class="list-item pd-df bd-df">
                                <div class="poster">
                                    <img src="./src/img/1.png" alt="">
                                </div>
                                <div class="info">
                                    <p>${item.goods_name}</p>
                                    <p class="op-6">标题</p>
                                    <p class="op-6">标题</p>
                                    <p class="op-6">标题</p>
                                    <div class="tag-wrap op-4">
                                        <div class="left">
                                            <span class="tag">${item.spec_key_name}</span>
                                        </div>
                                        <p class="count">x${item.goods_num}</p>
                                    </div>
                                    <p class="price">￥${item.member_goods_price}</p>
                                </div>
                            </li>`
            });
            $('.shop-content .content-list').html(listStr);


            /**价格 订单
             * @shop_count      【商品数目】
             * @total_amount    【总金额】
             * @order_sn        【订单编号】
             * @add_time        【订单创建时间】
             */
            $('.shop_count').text('共' + 1 + '件商品');
            $('.total_amount').text('￥' + data.total_amount);
            $('.order_sn').html(`订单编号：${data.order_sn} <span class="fuzhi">复制</span>`);
            data.add_time = formatDate(data.add_time);
            $('.add_time').text('下单时间：' + data.add_time);

            /**按钮显示
             * 0 隐藏  1 显示
             * @pay_btn  	    【支付】
             * @cancel_btn   	【取消】
             * @comment_btn  	【评价】
             */
            if(data.pay_btn == 1) {
                $('.ctr').append('<span>支付</span>')
            }
            if(data.cancel_btn == 1) {
                $('.ctr').append('<span>取消</span>')
            }
            if(data.comment_btn == 1) {
                $('.ctr').append('<span>评价</span>')
            }
            $('.ctr span').addClass('cancelbtn')
            $('.ctr span:last').addClass('paybtn')



        }
    })
}






