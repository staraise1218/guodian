/**
 * @buy_method      【配送方式 1 到店自提 2 快递送货】
 */




let imgArr = JSON.parse(getParam('imgArr'));



/**
 * 渲染顶部图片
 */
let imgStr = '';
imgArr.forEach(item => {
    imgStr += `<img src="${item}" alt="" class="shop-item">`
})
$('.shop-list-wrap').html(imgStr)



// 选择快递
$('.kuaidi').on('click', function () {
    $('.choose-wrap .btn-wrap span').removeClass('active');
    $(this).addClass('active');
    $('.peisong-con').show();
    $('.ziti-con').hide();
    buy_method = 1;
})

// 选择自提
$('.ziti').on('click', function () {
    $('.choose-wrap .btn-wrap span').removeClass('active');
    $(this).addClass('active');
    $('.peisong-con').hide();
    $('.ziti-con').show();
    buy_method = 2;
})




// 确定
$('.submit').on('click', function () {
    localStorage.setItem('buy_method', buy_method);
    window.history.back(-1);
})