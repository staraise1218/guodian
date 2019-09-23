<?php


namespace app\admin\controller;

use think\AjaxPage;
use think\Page;
use think\Db;

class Storehouse extends Base {

    public function index(){
        //  获取省份
        $province = M('region')->where(array('parent_id'=>0,'level'=>1))->select();
        $this->assign('province', $province);
        return $this->fetch();
    }
	/**
	 * 店铺列表
	 */
	public function ajaxindex()
	{
        // 搜索条件
        $keyword = input('post.keyword');
        $province = input('post.province');
        $city = input('post.city');
        $district = input('post.district');

        $where = array();
        $keyword ? $where['name'] = array('like', "%$keyword%") : false;
        $province ? $where['province'] = $province : false;
        $city ? $where['city'] = $city : false;
        $district ? $where['district'] = $district : false;

		$count = DB::name('storehouse')->where($where)->count();
		$AjaxPage = new AjaxPage($count, 10);
		$list = DB::name('storehouse')
                ->where($where)
                ->order("id desc")
				->limit($AjaxPage->firstRow, $AjaxPage->listRows)
				->select();

		$this->assign('list', $list);
        $this->assign('AjaxPage', $AjaxPage);
        $this->assign('page', $AjaxPage->show());
		return $this->fetch();
	}

    public function add(){
        if(IS_POST){
            $data = input('post.');
            $data['createtime'] = time();

            M('storehouse')->insert($data);
            $this->success('添加成功', U('store/index'));
        }

        //  获取省份
        $province = M('region')->where(array('parent_id'=>0,'level'=>1))->select();
        $this->assign('province',$province);
        return $this->fetch();   
    }

    public function edit(){
        if(IS_POST){
            $data = input('post.');
            $data['createtime'] = time();

            $id = $data['id'];
            unset($data['id']);
            M('storehouse')->where('id', $id)->update($data);
            $this->success('修改成功', U('store/index'));
        }

        $id = input('get.id');
        $info = M('storehouse')->where('id', $id)->find();

        //  获取省份
        $province = M('region')->where(array('parent_id'=>0,'level'=>1))->select();
        $city = M('region')->where(array('parent_id'=>$info['province']))->select();
        $district = M('region')->where(array('parent_id'=>$info['city']))->select();

        $this->assign('info',$info);
        $this->assign('province',$province);
        $this->assign('city',$city);
        $this->assign('district',$district);
        return $this->fetch();   
    }

    public function ajax_delete(){
        $id = I('id');

        $count = Db::name('goods')->where('storehouse_id', $id)->count();
        if($count){
            $result = array(
                'status' => 0,
                'msg' => '该仓库里还有商品，不能删除'
            );
        } else {
            Db::name('storehouse')->where('id', $id)->delete();
            $result = array(
                'status' => 1,
                'msg' => '操作成功'
            );
        }

        $this->ajaxReturn($result);
    }

}