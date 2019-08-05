
var years=[];
var month=[];
var day=[];
var myDate = new Date();
myDate.getFullYear();    //获取完整的年份(4位,1970-????)
myDate.getMonth();       //获取当前月份(0-11,0代表1月)
myDate.getDate();
var _data=[];
for(i=0; i<myDate.getFullYear()-1980; i++){
    //年
    var obj={};
    var yer=1980+i+1;
    obj.value=1980+i+1;
    var _data2=[];
    for(n=0; n<12; n++){
        //月
        var obj2={};
        if(n<9){
            obj2.value='0'+(n+1);
        }else{
            obj2.value=n+1;
        }
        var _data3=[];
        if(n==1){
            var cond1 = yer % 4 == 0;  //条件1：年份必须要能被4整除
            var cond2 = yer % 100 != 0;  //条件2：年份不能是整百数
            var cond3 = yer % 400 ==0;
            var cond = cond1 && cond2 || cond3;
            //闰年
            if(cond){
                for(y=0; y<29; y++){
                    //日
                    var obj3={};
                    if(y<9){
                        obj3.value='0'+(y+1);
                    }else{
                        obj3.value=y+1;
                    }
                    _data3.push(obj3)
                }
            }else{
                for(y=0; y<28; y++){
                    //日
                    var obj3={};
                    if(y<9){
                        obj3.value='0'+(y+1);
                    }else{
                        obj3.value=y+1;
                    }
                    _data3.push(obj3)
                }
            }
        }else if(n==0||n==2||n==4||n==6||n==7||n==9||n==11){
            for(y=0; y<31; y++){
                //日
                var obj3={};
                if(y<9){
                    obj3.value='0'+(y+1);
                }else{
                    obj3.value=y+1;
                }
                _data3.push(obj3)
            }
        }else{
            for(y=0; y<30; y++){
                //日
                var obj3={};
                if(y<9){
                    obj3.value='0'+(y+1);
                }else{
                    obj3.value=y+1;
                }
                _data3.push(obj3)
            }
        }
        obj2.childs=_data3;
        _data2.push(obj2);
    }
    obj.childs=_data2;
    _data.push(obj)
}
var mobileSelect1 = new MobileSelect({
    trigger: '#trigger1',
    title: '日期选择',
    wheels: [
        {data:_data}
    ],
    transitionEnd:function(indexArr, data){
        console.log(data);
    },
    callback:function(indexArr, data){
        console.log(data);
        $("#trigger1").text(data[0].value + '-' + data[1].value+'-'+data[2].value);
    }
});



/**
 * 
 * 
 * 
 */

let cache = {
    phone : '',
    sex : '',
    birDay : '',
    name : ''
}

let save = {
    phone : '',
    sex : '',
    birDay : '',
    name : ''
}

$('.list_wrap').delegate('li p', 'click', function () {
    console.log($(this).attr('data-status'))
    switch($(this).attr('data-status')) {
        case "name":
            $('.name_save').show();
            $('.bg').show();
            break;
        case "sex":
            $('.bg').show();
            $('.save_sex').show();
            break;
        case "phone":
            $('.save_phone').show();
            $('.bg').show();
            break;
        default:
            console.log('*')
    }
})



$('.save .title .r').click(function () {
    $('.name_save').hide();
    $('.save_sex').hide();
    $('.save_phone').hide();
    $('.bg').hide();
})

$('.bg').click(function () {
    $('.name_save').hide();
    $('.save_sex').hide();
    $('.save_phone').hide();
    $('.bg').hide();
})






$('#info_user_name').on('input', function () {
    console.log($(this).val())
    if(phoneRgx.test($(this).val())) {
        $('.save_phone .sub button').addClass('active');
        cache.phone = $(this).val();
    }
})



$('.save_sex .item').click(function () {
    console.log($(this).attr('data-sex'));
    switch($(this).attr('data-sex')) {
        case "male":
            $('.bg').hide();
            $('.save_sex').hide();
            save.sex = '男';
            $('.list_wrap .list_item:eq(1) .r p').text(save.sex);
            break;
        case "female":
            $('.bg').hide();
            $('.save_sex').hide();
            save.sex = '女';
            $('.list_wrap .list_item:eq(1) .r p').text(save.sex);
            break;
        case "sub":
            $('.bg').hide();
            $('.save_sex').hide();
            break;
    }
})



$('.save_phone').delegate('.active','click',function () {
    save.phone = cache.phone;
    $('.list_wrap .list_item:eq(2) .r p').text(save.phone);
    $('.bg').hide();
    $('.save_phone').hide();
})


$('#save_name').on('input', function () {
    console.log($(this).val());
    if($(this).val().length >= 2) {
        $('.name_save button').addClass('active');
        cache.name = $(this).val();
    }
})
$('.name_save').delegate('.active','click', function () {
    save.name = cache.name;
    $('.bg').hide();
    $('.name_save').hide();
    $('.list_wrap .list_item:eq(0) .r p').text(save.name);
})