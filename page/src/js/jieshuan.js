/**
 * 
 * @user_id     用户id
 * @action      动作：立即购买：buy_now 购物车结算：cart
 * @goods_id    立即购买时传入，商品id
 * @item_id     立即购买时传入，商品规格id
 * @goods_num   立即购买时传入，商品数量
 * @imgArr      商品图片 用于配送方式页
 * @buy_method  【配送方式 1 到店自提 2 快递送货】
 */



let myUsetInfo = localStorage.getItem('USERINFO');
myUsetInfo = JSON.parse(myUsetInfo);
console.log(myUsetInfo)
let user_id = myUsetInfo.user_id;

let action = getParam('action');
let goods_id = getParam('goods_id');
let item_id = getParam('item_id');
let goods_num = getParam('goods_num');
let imgArr = [];


/**
 * 判断配送方式
 * 
 */
console.log(localStorage.getItem('buy_method'))
switch(localStorage.getItem('buy_method')) {
    case '1':
        $('.address').hide();
        $('.address2').show();
        $('.peisong-title').text('自提');
        break;
    case '2':
        $('.address').css('display','block')
        $('.address2').hide();
        $('.peisong-title').text('快递送货');
        break;
    default:
        console.log(0000000000000)
        break;
}


cart2()
function cart2() {
    $.ajax({
        type: 'POST',
        url: GlobalHost + '/Api/cart/cart2',
        data: {
            user_id: user_id,
            goods_id: goods_id,
            action: action,
            item_id: item_id,
            goods_num: goods_num
        },
        success: function (res) {
            console.log(res)
            if(res.code == 200) {
                let goods = res.data.cartList.cartList;
                let goodsList = '';
                goods.forEach((item, index) => {
                    goodsList += `<li class="shop-wrap border-bottom">
                                    <div class="poster">
                                        <img src="${GlobalHost + item.result.buy_goods.goods.original_img}" alt="">
                                    </div>
                                    <div class="right">
                                        <p class="text-df">${item.result.buy_goods.goods.goods_name}</p>
                                        <p class="text-df color_3">副标题</p>
                                        <p class="text-df color_3">副标题</p>
                                        <div class="text-xs color_3 tag-wrap">
                                            <p class="tag">标签</p>
                                            <p class="num">x${item.result.buy_goods.goods_num}</p>
                                        </div>
                                        <p class="price">￥${item.result.buy_goods.goods.shop_price}</p>
                                    </div>
                                </li>`
                    imgArr[index] = GlobalHost + item.result.buy_goods.goods.original_img
                });
                $('.goodsList-box').html(goodsList);
                $('#total_fee_1').text('￥' + res.data.cartList.total_fee);
                $('#total_fee_2').text('￥' + res.data.cartList.total_fee);
                $('.address2 .user-name-number').text(res.data.address.consignee + '  ' + res.data.address.mobile);
                $('.address2 .user-address-f').text(res.data.address.fulladdress);
                imgArr = JSON.stringify(imgArr);
            }
        }
    })
}






let userNameStatus = 0;     // 1 正确   联系人姓名
let userNameVal = '';       // 联系人姓名
let userPhoneStatus = 0;    // 1 正确   联系人电话
let userPhoneVal = 0;       // 联系人电话
let shfenCardStatus = 0;    // 1 正确   身份证
let shfenCardVal = '';    // 身份证



$('.peison_method').on('click', function () {
    window.location.href = './peisongMethod.html?imgArr=' + imgArr
})



