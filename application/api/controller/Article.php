<?php

namespace app\api\controller;

use think\Db;

class Article extends Base {

	public function __construct(){
		// 设置所有方法的默认请求方式
		$this->method = 'post';

		parent::__construct();
	}

	// type ： 1 探索国典 2 鉴定机制
	public function getContent(){
		$type = input('type');

		$article_id = 0;
		if($type == 1) $article_id = 37; // 探索国典
		if($type == 2) $article_id = 38; // 鉴定机制

		$info = Db::name('article')
			->where('article_id', $article_id)
			->where('is_open', 1)
			->field('title, content')
			->find();
p($type, $article_id, $info);
		if($info) $info['content'] = html_entity_decode($info['content']);

		response_success($info);
	}
}