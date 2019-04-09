<?php

namespace app\common\logic;

use think\Db;

/**
 * 活动逻辑类
 */
class ShippingLogic
{
	private $appcode = '2bc5bba30e3842ce9852a2fbbbc0253e';// 你自己的code

	public function __construct(){

	}

	public function getExpressInfo($no, $type = 'AUTO'){
		$host = "https://kuaidi101.market.alicloudapi.com";
		$path = "/getExpress";
		$method = "GET";
		$headers = array();
		array_push($headers, "Authorization:APPCODE " . $this->appcode);

		$bodys = "";
		$url = $host . $path . "?" . 'NO='.$no.'&TYPE='.$type;

		$curl = curl_init();
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($curl, CURLOPT_FAILONERROR, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HEADER, false);
		if (1 == strpos("$".$host, "https://"))
		{
		    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
		}
		
		return curl_exec($curl);
	}
}