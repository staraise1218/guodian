<?php
namespace app\admin\controller;

use think\AjaxPage;
use think\Page;
use think\Db;
use app\admin\logic\OrderLogic;

class Finance extends Base {

    public function index(){
        $start_time = date('Y-m-d', strtotime('-3 month'));
        $end_time = date('Y-m-d');

        // 店铺
        $storeList = db('store')->order('id desc')->field('id, name')->select();

        $this->assign('start_time', $start_time);
        $this->assign('end_time', $end_time);
        $this->assign('storeList', $storeList);
        return $this->fetch();
    }
	/**
	 * 列表
	 */
	public function ajaxindex()
	{
        // 搜索条件
        // $keyword = input('post.keyword');
        $start_time = strtotime(input('post.start_time', date('Y-m-d', strtotime('-3 month'))));
        $end_time = strtotime(input('post.end_time', date('Y-m-d')));
        $store_id = input('store_id');

       
		
		if($store_id){
            // 所选店铺的销售
            $count = DB::name('store_admin')->where('store_id', $store_id)->count();
            $AjaxPage = new AjaxPage($count, 10);
            $salesList = DB::name('store_admin')->alias('sa')
                ->join('admin a', 'sa.admin_id=a.admin_id', 'left')
                ->where('sa.store_id', $store_id)
                ->order("a.admin_id desc")
                ->limit($AjaxPage->firstRow, $AjaxPage->listRows)
                ->select();
        } else {
            $count = DB::name('admin')->where('role_id', config('SALE_ID'))->count();
            $AjaxPage = new AjaxPage($count, 10);

            $salesList = DB::name('admin')
                ->where('role_id', config('SALE_ID'))
                ->order("admin_id desc")
                ->limit($AjaxPage->firstRow, $AjaxPage->listRows)
                ->select();
        }
       

        $end_time = strtotime('+1 day', $end_time);
        $list = array();
        $statistics_order_amount = 0;
        $statistics_cost_price = 0;
        $statistics_royalty = 0;
        if(!empty($salesList)){
            foreach ($salesList as $item) {
                $data['admin_id'] = $item['admin_id'];
                $data['realname'] = $item['realname'];
                // 查找销售管理的会员
                $users = db('users')->where('sale_id', $item['admin_id'])->column('user_id');
                
                if( ! empty($users)) {
                    // 统计销售下会员的订单总额
                     $total_order_amount = db('order')
                        ->where('pay_status', 1)
                        ->whereTime('add_time', 'between', [$start_time, $end_time])
                        ->where('user_id', 'in', $users)
                        ->sum('order_amount');

                    // 统计销售下会员订单的成本价
                     $total_cost_price = db('order')->alias('o')
                        ->join('order_goods og', 'o.order_id=og.order_id')
                        ->whereTime('add_time', 'between', [$start_time, $end_time])
                        ->where('pay_status', 1)
                        ->where('user_id', 'in', $users)
                        ->sum('cost_price');

                }
                $total_order_amount = $total_order_amount ? $total_order_amount : 0;
                $total_cost_price = $total_cost_price ? $total_cost_price : 0;

                $data['total_order_amount'] = $total_order_amount;
                $data['total_cost_price'] = $total_cost_price;
                $data['total_royalty'] = ($total_order_amount - $total_cost_price)*0.1;
                $list[] = $data;

                // 统计
                $statistics_order_amount += $total_order_amount;
                $statistics_cost_price += $total_cost_price;
                $statistics_royalty += $data['total_royalty'];
            }
        }

        $this->assign('list', $list);
        $this->assign('statistics_order_amount', $statistics_order_amount);
        $this->assign('statistics_cost_price', $statistics_cost_price);
        $this->assign('statistics_royalty', $statistics_royalty);
        $this->assign('AjaxPage', $AjaxPage);
        $this->assign('page', $AjaxPage->show());
		return $this->fetch();
	}

    // 业绩详情
    public function detailOrderList(){

        return $this->fetch();
    }

    // 业绩详情订单列表
    public function ajaxOrderList(){
        $admin_id = I('admin_id');
        // 查找销售管理的会员
        $users = db('users')->where('sale_id', $admin_id)->column('user_id');

        $list = array();
        $orderLogic = new OrderLogic();
        if( ! empty($users)) {
            $count = DB::name('admin')->where('role_id', config('SALE_ID'))->count();
            $AjaxPage = new AjaxPage($count, 10);

            $list = db('order')->where('user_id', 'in', $users)
                ->limit($AjaxPage->firstRow, $AjaxPage->listRows)
                ->select();
            if(!empty($list)) {
                foreach ($list as &$item) {
                    $orderGoods = $orderLogic->getOrderGoods($item['order_id']);
                    $item['orderGoods'] = $orderGoods;
                }
            }
        }
// p($list);
        $this->assign('list', $list);
        $this->assign('AjaxPage', $AjaxPage);
        $this->assign('page', $AjaxPage->show());
        return $this->fetch();
    }

    // 发放记录
    public function recordList(){
        $year = date('Y');

        $this->assign('year', $year);
        return $this->fetch();
    }

    public function ajaxRecordList(){
        $admin_id = I('admin_id');
        $year = I('year', date('Y'));

        $monthArr = array(1, 2, 3, 4 , 5, 6, 7, 8, 9, 10, 11, 12);

        $list = array();

        foreach ($monthArr as $month) {
            
            // 查看是否已发放，如果已发放直接取数据
            $recourd = db('fafang_record')
                ->where('sale_id', $admin_id)
                ->where('year', $year)
                ->where('month', $month)
                ->find();
            if($recourd){
                $data = $recourd;
                $data['is_record'] = 1;
            } else {
                $data['is_record'] = 0;
                $data['year'] = $year;
                $data['month'] = $month;


                $start_time = strtotime($month);
                $end_time = strtotime('+1 month -1 day' , strtotime($month));
                // 查找销售管理的会员
                $users = db('users')->where('sale_id', $admin_id)->column('user_id');
                if( ! empty($users)) {
                    // 统计销售下会员的订单总额
                     $total_order_amount = db('order')
                        ->where('pay_status', 1)
                        ->whereTime('add_time', 'between', [$start_time, $end_time])
                        ->where('user_id', 'in', $users)
                        ->sum('order_amount');

                    // 统计销售下会员订单的成本价
                     $total_cost_price = db('order')->alias('o')
                        ->join('order_goods og', 'o.order_id=og.order_id')
                        ->whereTime('add_time', 'between', [$start_time, $end_time])
                        ->where('pay_status', 1)
                        ->where('user_id', 'in', $users)
                        ->sum('cost_price');

                }
                $total_order_amount = $total_order_amount ? $total_order_amount : 0;
                $total_cost_price = $total_cost_price ? $total_cost_price : 0;
                $data['total_royalty'] = ($total_order_amount - $total_cost_price)*0.1; // 提成
            }

            $list[] = $data;
        }

        $this->assign('list', $list);
        return $this->fetch();
    }

    public function ajaxDoRecord(){
        $sale_id = I('sale_id');
        $year = I('year');
        $month = I('month');
        $total_royalty = I('total_royalty');



        $data = array(
            'sale_id' => $sale_id,
            'year' => $year,
            'month' => $month,
            'total_royalty' => $total_royalty,
            'add_time' => time(),
        );
        if( false !== db('fafang_record')->insert($data)) {
            die(json_encode(array('status'=>1)));
        } else {
            die(json_encode(array('status'=>0, 'msg' => '操作失败')));
        }

        
    }

}