<?php
include 'connect.php';


?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>DBMOnline</title>
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    <script src="scripts.js"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap" rel="stylesheet">
</head>
<body class="">
<div class="bodydiv">
    <div class="topbar" ></div>
    <div class="logobar"></div>
    <div class="leftbar" >
            <?php
            $sql = "SHOW TABLES";
            $SqlObject = mysqli_query($connect, $sql);
            $tableList = mysqli_fetch_all($SqlObject);
            for ($i = 0; $i < count($tableList); $i++){
                $string = $tableList[$i][0];
                echo "<div id='$string' tableName='$string' class='tableListItem pobierz' >$string</div>" ;
            }
            ?>
    </div>
    <div class="mainbar" id="mainbar" >

    </div>
</div>

</body>
</html>



