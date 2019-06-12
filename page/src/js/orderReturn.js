/**
 * @pay_status          【1 待审核  3 已退款  4 拒绝退款】
 * @user_id
 * @page
 */

let myUsetInfo = localStorage.getItem('USERINFO');
myUsetInfo = JSON.parse(myUsetInfo);
console.log(myUsetInfo)
let user_id = myUsetInfo.user_id;
let pay_status = getParam('pay_status');
let page = 1;





getList()













function getList() {
    $.ajax({
        type: 'post',
        url: GlobalHost + '/Api/order/order_list',
        data: {
            user_id: user_id,
            type: "REFUND",
            page: page
        },
        success: function(res) {
            console.log(res)
        }
    })
}

























