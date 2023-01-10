<?php
    $url = '';
    if ($_GET['hash'] == 1){
        $url = '#';
    }
?>

<html <?php echo ($_GET['att'] == 'manifest') ? 'manifest="$url"' : '';?>>
<head>
    <title>Bad URL</title>
    
<?php

//output <base> tag
if ($_GET['base'] == 1){
    echo "<base href=\"{$_SERVER['REQUEST_URI']}\">";
}    

//output <link> tag
if ($_GET['tag'] == 'link'){
    $rel = '';
    if (!empty($_GET['rel'])){
        $rel = 'rel="'.$_GET['rel'].'"';
    }
    
    echo "<link $rel href=\"$url\">";
} else if ($_GET['tag'] == 'script'){
    echo "<script src=\"$url\"></script>";
}

?>    

</head>
<body>
<?php
if ($_GET['tag'] == 'img'){
    echo "<img src=\"$url\">";
} else if ($_GET['tag'] == 'iframe'){
    echo "<iframe src=\"$url\"></iframe>";
} else if ($_GET['tag'] == 'input'){
    echo "<input type=\"image\" src=\"$url\">";
} else if ($_GET['tag'] == 'object'){
    echo "<object data=\"$url\"></object>";
} else if ($_GET['tag'] == 'object'){
    echo "<embed src=\"$url\"></embed>";
}

?>
</body>
</html>

