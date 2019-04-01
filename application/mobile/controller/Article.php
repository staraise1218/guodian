<?php

namespace app\mobile\controller;
use think\Db;
use app\common\logic\NavViewLogic;
class Article extends Base {
    
    public function index(){       
        $article_id = I('article_id/d',38);
    	$article = Db::name('article')->where("article_id", $article_id)->find();
    	$this->assign('article',$article);
        return $this->fetch();
    }
 
    /**
     * 文章内列表页
     */
    public function articleList(){
        $article_cat = M('ArticleCat')->where("parent_id  = 0")->select();
        $this->assign('article_cat',$article_cat);
        return $this->fetch();
    }    
    /**
     * 文章内容页
     */
    public function detail(){
    	$article_id = I('article_id/d',1);
    	$article = Db::name('article')->where("article_id", $article_id)->find();
    	if($article){
    		$parent = Db::name('article_cat')->where("cat_id",$article['cat_id'])->find();
    		$this->assign('cat_name',$parent['cat_name']);
    		$this->assign('article',$article);
    	}
        $this->assign('index_nav',NavViewLogic::getNav());//获取导航
        return $this->fetch();
    }

    // 购买须知
    public function xuzhi(){
        $article = Db::name('article')->where("article_id", 47)->find();
        $this->assign('article', $article);
        return $this->fetch();
    }

}