/**
 * Tab 切换
 * 
 */
$('.tabBar li').on('click', function (e) {
    $('.tabBar li').removeClass('active');
    $(this).addClass('active')
    $('.content .item-wrap').css('display','none');
    for(var i = 0; i < $('.content .item-wrap').length; i++)  {
        if($('.content .item-wrap').eq(i).attr('data-orderShowStatus') == $(this).attr('data-orderShowStatus')) {
            $('.content .item-wrap').eq(i).css('display','block')
        }
    }
})