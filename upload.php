<?php
/**
 * Created in PhpStorm.
 * User: pdamerval
 * Date: 11/15/2016
 * Time: 3:06 PM
 */

move_uploaded_file($_FILES['webcam']['tmp_name'], 'uploads/webcam'.md5(time()).rand(383,1000).'.jpg');