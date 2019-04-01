<?php
ini_set('date.timezone','Asia/Shanghai');
$redis_dsn = '127.0.0.1:6379';
putenv("REDIS_BACKEND=$redis_dsn");
// 引入队列的入口程序
$resque = realpath(dirname(__FILE__) . '/../../../vendor/chrisboulton/php-resque/resque.php');
require_once $resque;