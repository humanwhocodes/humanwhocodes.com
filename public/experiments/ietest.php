<?php

    if ($_GET['doctype'] == 1){
        echo '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">';
    }
    
    $ie = $_GET['ie'];
?>

<html>
<head>
<?php
    if (!empty($ie)){
        echo '<meta http-equiv="X-UA-Compatible" content="IE='.$ie.'" />';
    }
?>    
    <title>IE Test</title>
</head>
<body>
<p>User-agent: <script>document.write(navigator.userAgent)</script></p>
<p>Document Mode: <script>document.write(document.documentMode)</script></p>
</body>
</html>

