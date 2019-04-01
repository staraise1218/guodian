<?php

namespace app\mobile\controller; 
use think\Request;
use think\Db;

class Payment extends Base {
   

    // 渲染模板
    public function pay_success(){
        return $this->fetch();
    }

    public function pay_error(){

        return $this->fetch();
    }
}
