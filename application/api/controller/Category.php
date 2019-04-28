<?php

namespace app\api\controller;

use think\Db;
use app\common\logic\CharacterLogic;
use app\common\logic\GoodsLogic;

class Category extends Base {

	public function __construct(){
		// 设置所有方法的默认请求方式
		$this->method = 'POST';

		parent::__construct();
	}

	// 获取所有的品牌列表
	public function allBrandList(){
		$list = Db::name('brand')->alias('b')
			->join('goods_category gc', 'gc.id=b.parent_cat_id')
			->field('b.id, b.name, gc.mobile_name cat_name')
			->select();

		$CharacterLogic = new CharacterLogic();
		$list = $CharacterLogic->groupByInitials($list, 'name');

		response_success($list);
	}

	// 分类下的品牌列表
	public function cateBrandList(){
		$cat_id = I('cat_id');

		// 获取分类信息
		$category = Db::name('goods_category')->where('id', $cat_id)->field('name, image2')->find();

		$list = Db::name('brand')->alias('b')
			->join('goods_category gc', 'gc.id=b.parent_cat_id')
			->where('b.parent_cat_id', $cat_id)
			->field('b.id, b.name, b.logo, gc.mobile_name cat_name')
			->select();

		$result['category'] = $category;
		$result['list'] = $list;
		response_success($result);
	}

	/**
	 * [getTopCategory 获取顶级分类]
	 * @return [type] [description]
	 */
	public function topCategoryList(){
		$list = Db::name('goods_category')
			->where('is_show', 1)
			->order('sort_order')
			->field('id, mobile_name cat_name, image')
			->select();

		response_success($list);
	}


	/**
	 * [goodslist 商品列表]
	 * @param [type] $[brand_id] [品牌id]
	 * @param [type] $[type] [0 综合 1 新品]
	 * @param [type] $[sales_num] [销量 desc/asc]
	 * @param [type] $[shop_price] [价格 desc/asc]
	 * @return [type] [description]
	 */
	public function goodsList(){
		$brand_id = I('brand_id');
		$cat_id = I('cat_id');
		$page = I('page', 1);

		/*filter*/
		$type = I('type', 0);
		$sales_num = I('sales_num');
		$shop_price = I('shop_price');

		$where = array(
			'brand_id' => $brand_id, // 品牌筛选
			'is_on_sale' => 1,  // 上架中
			'prom_type' => 0, // 普通商品
		);
		$type == 1 && $where['is_new'] = 1;

		// 排序
		$order = 'sort asc, goods_id desc';
		$sales_num && $order = "sales_num $sales_num";
		$shop_price && $order = "shop_price $shop_price";

		$goodsList = Db::name('goods')
			->where($where)
			->order($order)
			->field('goods_id, goods_name, store_count, original_img, shop_price')
			->page($page)
			->limit(12)
			->select();


		response_success($goodsList);
	}

	  /**
   	 * 生成目录树结构
   	 */
	  private function _tree($data){

   		$tree = array();
   		foreach ($data as $item) {
               if(isset($data[$item['parent_id']])){
                  $data[$item['parent_id']]['sub'][] = &$data[$item['id']];
               } else {
                  $tree[] = &$data[$item['id']];
               }
   		}

   		return $tree;
   	}

}