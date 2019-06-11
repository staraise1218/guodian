<?php

namespace app\api\controller;

use think\Db;

class Article extends Base {

	public function __construct(){
		// 设置所有方法的默认请求方式
		$this->method = 'post';

		parent::__construct();
	}

	// type ： 1 探索国典 2 鉴定机制 3 消费者告知书 4 经营信息 5 隐私权策略
	public function getContent(){
		$type = input('type');
		$article_id = input('article_id', 0);

		if($type == 1) $article_id = 37; // 探索国典
		if($type == 2) $article_id = 38; // 鉴定机制
		if($type == 3) $article_id = 39; // 消费者告知书
		if($type == 4) $article_id = 40; // 经营信息
		if($type == 5) $article_id = 41; // 隐私权策略

		$info = Db::name('article')
			->where('article_id', $article_id)
			->where('is_open', 1)
			->field('title, content')
			->find();

		if($info) $info['content'] = html_entity_decode($info['content']);

		response_success($info);
	}
}