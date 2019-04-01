<?php
namespace app\queue;
class DemoJob{
    public function perform()
    {
        // Work work work
        //echo $this->args['name'];
        sleep(120);
        $f = fopen('queue.txt','w');
        fwrite($f, 'Hello!');
    }
}