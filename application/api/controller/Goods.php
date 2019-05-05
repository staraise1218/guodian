<?php

namespace app\api\controller;

use app\common\logic\CartLogic;
use app\common\logic\GoodsLogic;
use app\common\logic\GoodsLogic2;
use app\common\logic\GoodsPromFactory;
use app\common\model\SpecGoodsPrice;
use think\Db;

class Goods extends Base {

	public function __construct(){
		// 设置所有方法的默认请求方式
		$this->method = 'POST';

		parent::__construct();
	}

	/**
	 * [goodslist 搜索页]
	 * @return [type] [description]
	 */
	public function goodslist(){
		$keyword = I('keyword');
		$page = I('page', 1);

		$where = array(
			'is_on_sale' => 1, // 上架中
			'prom_type' => 0, // 普通商品
		);
		$keyword && $where['goods_name'] = ['like', "%$keyword%"];

		$goodslist = Db::name('goods')
			->where($where)
			->order('sort asc, goods_id desc')
			->field('goods_id, goods_name, store_count, original_img, shop_price')
			->page($page)
			->limit(15)
			->select();

		$total_num = Db::name('goods')->where($where)->count();
		$result['total_num'] = $total_num;
		$result['list'] = $goodslist;
		response_success($result);
	}

	/**
	 * [goodsInfo 商品详情]
	 * @return [type] [description]
	 */
	public function goodsInfo(){
		$user_id = I('user_id');

		$goodsLogic = new GoodsLogic();
		$goodsLogic2 = new GoodsLogic2();
        $goods_id = I('goods_id/d');
        $goodsModel = new \app\common\model\Goods();
        $goods = $goodsModel::get($goods_id);
        if(empty($goods) || ($goods['is_on_sale'] == 0) || ($goods['is_virtual']==1 && $goods['virtual_indate'] <= time())){
            response_error('', '此商品不存在或者已下架');
        }


        $goods['goods_images_list'] = M('GoodsImages')->where("goods_id", $goods_id)->select(); // 商品 图册
        $goods_attribute = M('GoodsAttribute')->getField('attr_id,attr_name'); // 查询属性
        $goods_attr_list = M('GoodsAttr')->where("goods_id", $goods_id)->select(); // 查询商品属性表
		$filter_spec = $goodsLogic->get_spec($goods_id);
        $spec_goods_price  = M('spec_goods_price')->where("goods_id", $goods_id)->getField("key,price,store_count,item_id"); // 规格 对应 价格 库存表
        // $goods['commentStatistics'] = $goodsLogic->commentStatistics($goods_id);// 获取某个商品的评论统计
      	$goods['sale_num'] = M('order_goods')->where(['goods_id'=>$goods_id,'is_send'=>1])->sum('goods_num');
        //当前用户收藏
        $goods['is_collect'] = M('goods_collect')->where(array("goods_id"=>$goods_id ,"user_id"=>$user_id))->count();

        // $goods_collect_count = M('goods_collect')->where(array("goods_id"=>$goods_id))->count(); //商品收藏数
        $goods['goods_content'] = $goods['goods_content'] ? htmlspecialchars_decode($goods['goods_content']) : '';
         // 购物车商品数量
        $cartLogic = new CartLogic();
 		$goods['cart_num'] = $cartLogic->getUserCartGoodsTypeNum();//获取用户购物车商品总数
 		// 记录浏览日志
 		$goodsLogic2->add_visit_log($user_id, $goods);

 		$result['goodsInfo'] = $goods;
 		$result['goods_attribute'] = $goods_attribute;
 		$result['goods_attr_list'] = $goods_attr_list; // 商品属性
 		$result['filter_spec'] = $filter_spec;  // 商品规格
 		$result['spec_goods_price'] = json_encode($spec_goods_price,true); // 商品规格对应的价格
        response_success($result);
	}

	/**
	 * [recommendgoodslist 推荐的商品]
	 * @return [type] [description]
	 */
	public function recommendgoodslist(){
		// $cat_id = I('cat_id');
		$num = I('num', 6);

		$where = array(
			'is_on_sale' => 1, // 上架中
			'prom_type' => 0, // 普通商品
			'is_recommend' => 1
		);
		// $cat_id && $where['cat_id'] = $cat_id;

		$goodslist = Db::name('goods')
			->where($where)
			->order('sort asc, goods_id desc')
			->field('goods_id, goods_name, store_count, original_img, shop_price')
			->limit($num)
			->select();

		response_success($goodslist);
	}

    /**
     * 用户收藏某一件商品
     * @param type $goods_id
     */
    public function collect_goods()
    {
    	$user_id = I('user_id/d');
        $goods_id = I('goods_id/d');
        
        $goodsLogic = new GoodsLogic();
        $result = $goodsLogic->collect_goods($user_id, $goods_id);

        if($result['status'] == '-1') response_error('', '未登录');
        if($result['status'] == '-3') response_success('', '您已收藏');
        if($result['status'] == '1') response_success('', '收藏成功');
    }

    // 搜索页面信息
    public function searchPage(){
    	$hotKeyword = $favourite_goods = array();

    	// 热门搜素词
    	$basicinfo = tpcache('basic');
    	$hot_keywords = $basicinfo['hot_keywords'];
    	$hotKeyword = explode('|', trim($hot_keywords, '|'));
    	// 猜您喜欢
    	$where = array(
			'is_on_sale' => 1, // 上架中
			'prom_type' => 0, // 普通商品
			'is_recommend' => 1
		);
    	$favourite_goods = Db::name('goods')
			->where($where)
			->order('sort asc, goods_id desc')
			->field('goods_id, goods_name, store_count, original_img, shop_price')
			->limit(4)
			->select();

    	
    	$result['hotKeyword'] = $hotKeyword;
    	$result['favourite_goods'] = $favourite_goods;
    	response_success($result);
    }

}