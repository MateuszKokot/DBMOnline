<?php
$connect = new mysqli('localhost', 'root', '', 'bd-wsb');
//$connect = new mysqli('sql53.lh.pl', 'serwer74180_ProjektWSB', 'maybach1942', 'serwer74180_ProjektWSB');
if (mysqli_connect_errno())
{
    echo '<script>console.log("Brak połączenia z BD")</script>';
    exit;
}
?>
