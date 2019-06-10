# 页面说明

|页面|链接|说明|传参方式|备注|bug|
|---|---|----|---|---|---|
|传参页面|empty|传id等信息|user_id=xx|
|购物袋|shoppingBag|ok||
|详情页|commodity|ok|goods_id=xxx|
|文章页|article|ok|type=xx|
|待付款|orderWait|升级中||弃用
|待收货|orderReceive|升级中||弃用
|退货单|orderReturn|升级中||弃用
|全部订单|orderAll|升级中||弃用
|会员中心|myMember|升级中|
|优惠券|myCoupon|升级中|
|我的积分|myIntegral|升级中|
|我的闲置|myFree|升级中|
|消费者告知书|myInform|升级中|
|我的养护|myCuring|升级中|
|经营信息|myManagement|升级中|
|隐私权政策|myPrivacy|升级中|
|我的订单|myOrder|ok|订单状态类型：全部 ALL ，待付款： WAITPAY ；待发货： WAITSEND ； 待收货： WAITRECEIVE ；已完成： FINISH ；已取消： CANCEL|下面有详细文档
|订单详情|orderDetail|ok|
|订单详情-配送方式|peisongMethod|ok|
|结算中心|jieshuan|ok|
|选择地址|addressChoose|ok|
|选择管理列表|addressList|ok|
|编辑地址-添加地址|addressEdit|ok|
|分享|升级中
|银联支付页面|payLoad|接口返回的html|status=pay|需要IOS Android 加返回按钮
|测试页面|MINE|||自己测试用

***

# 我的订单传参
- 传参实例： `myOrder.html?type=ALL`

|参数|说明|备注|
|---|---|---|
|ALL|全部||
|WAITPAY|待付款|
|WAITRECEIVE|待收货|
|FINISH|已完成|
|CANCEL|已取消|
||退货单|无 tab 页面|



- 地址： `http://guodian.staraise.com.cn/page/页面`




- UI 蓝湖 地址

> https://lanhuapp.com/web/#/item