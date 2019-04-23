<?php

namespace app\api\controller;

use think\Db;
use app\api\logic\FileLogic;
use app\api\logic\GeographyLogic;

class Index extends Base {

	public function __construct(){
		// 设置所有方法的默认请求方式
		$this->method = 'POST';

		parent::__construct();
	}

	public function index(){
		$user_id = I('user_id');

		// 获取所有的广告图片
		$bannerList = $hotlist = $reg_about = $custom_goods = array();
        $adList = Db::name('ad')
            ->where('enabled', 1)
            ->where('pid', array('in', array(14, 15, 16, 17)))
            ->field('ad_name, ad_link, ad_code, pid')
            ->order('orderby asc, ad_id asc')
            ->select();
        if($adList){
        	foreach ($adList as $k => $item) {
        		// 首页banner
        		($item['pid'] == 14 ) && $bannerList[] = $item;
        		// 热门商品
        		($item['pid'] == 15 ) && $hotlist[] = $item;
        		// 注册送好礼和探索国典
        		($item['pid'] == 16 ) && $reg_about[] = $item;
        		// 下方自定义商品入口
        		($item['pid'] == 17 ) && $custom_goods[] = $item;
        	}
        }

        // 获取分类
        $categoryList = Db::name('goods_category')
			->where('is_show', 1)
			->where('parent_id', 0)
			->order('sort_order')
			->field('id, name, image')
			->select();

		// 猜您喜欢
		$where = array(
			'is_on_sale' => 1, // 上架中
			'prom_type' => 0, // 普通商品
			'is_recommend' => 1
		);

		$guessGoodsList = Db::name('goods')
			->where($where)
			->order('sort asc, goods_id desc')
			->field('goods_id, goods_name, store_count, original_img, shop_price, market_price')
			->limit(6)
			->select();

        $result['bannerList'] = $bannerList;
        $result['categoryList'] = $categoryList;
        $result['hotlist'] = $hotlist;
        $result['reg_about'] = $reg_about;
        $result['custom_goods'] = $custom_goods;
        $result['guessGoodsList'] = $guessGoodsList;
		response_success($result);
	}

	// 首页通过分类获取商品列表
	public function getGoodsByCat(){
		$cat_id = I('cat_id');
		$city_code = I('city_code');
		$page = I('page', 1);
    	
    	$where = array(
			'city_code' => $city_code, // 城市
			'is_on_sale' => 1, // 上架中
			'prom_type' => 0, // 普通商品
		);

		$cat_id_arr = getCatGrandson ($cat_id);
		// $where['cat_id'] = array('in', $cat_id_arr);

		$goodslist = Db::name('goods')
			->where($where)
			->order('sort asc, goods_id desc')
			->field('goods_id, goods_name, subtitle, store_count, original_img, shop_price')
			->page($page)
			->limit(15)
			->select();

		response_success($goodslist);
	}

	// 启动图
	public function startBanner(){
		// 获取所有的广告图片
        $list = Db::name('ad')
            ->where('enabled', 1)
            ->where('pid', 13)
            ->field('ad_name, ad_link, ad_code, pid')
            ->order('orderby asc, ad_id asc')
            ->select();

        response_success($list);
	}

}