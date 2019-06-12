/**
 * @type 0 未使用； 1 已使用； 2 已失效
 */

let myUsetInfo = localStorage.getItem('USERINFO');
myUsetInfo = JSON.parse(myUsetInfo);
console.log(myUsetInfo)
let user_id = myUsetInfo.user_id;
let type = Number(getParam('type'));




getLoading ()


// 加载页面时判断 type
switch (type) {
    case 0:
        $('.weishiyong').show();
        $('.nav .nav-item').removeClass('active');
        $('.nav .nav-item:eq(0)').addClass('active');
        break;
    case 1:
        $('.yishiyong').show();
        $('.nav .nav-item').removeClass('active');
        $('.nav .nav-item:eq(1)').addClass('active');
        break;
    case 2:
        $('.yishixiao').show();
        $('.nav .nav-item').removeClass('active');
        $('.nav .nav-item:eq(2)').addClass('active');
        break;
}

// 点击时判断 type
$('.nav .nav-item').on('click', function () {
    console.log($(this).index())
    switch ($(this).index()) {
        case 0:
            type = 0;
            getLoading();
            $('.weishiyong').show();
            $('.yishiyong').hide();
            $('.yishixiao').hide();
            $('.nav .nav-item').removeClass('active');
            $('.nav .nav-item:eq(0)').addClass('active');
            break;
        case 1:
            type = 1;
            getLoading();
            $('.yishiyong').show();
            $('.weishiyong').hide();
            $('.yishixiao').hide();
            $('.nav .nav-item').removeClass('active');
            $('.nav .nav-item:eq(1)').addClass('active');
            break;
        case 2:
            type = 2;
            getLoading();
            $('.yishixiao').show();
            $('.weishiyong').hide();
            $('.yishiyong').hide();
            $('.nav .nav-item').removeClass('active');
            $('.nav .nav-item:eq(2)').addClass('active');
            break;
    }
})




// 获取优惠券数据
function getLoading () {
    $.ajax({
        type: 'post',
        url: GlobalHost + '/Api/user/coupon',
        data: {
            user_id: user_id,
            type: type,
            page: 1
        },
        success: function(res) {
            console.log(res)
        }
    })
}



