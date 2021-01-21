<?php
//TODO DOROBIĆ WYKRYWANIE BŁEDÓW I PRZEKAZYWANIE ODPOWIEDZI Z BD
include 'connect.php';

//vvv łapie dane wysłane AJAXem i decoduje do/z ? JSON
//Dostęp odbywa sie poprzez wywołanie tego obiektu i podanie w [] id z tabeli w pliku JS
//$return['dana1'] = $tabela['query']; przykładowe przypisanie zmiennej $return elementu kolekcji
// o ID 'query'
$tabela = json_decode(stripslashes($_POST['data']), true);


switch ($tabela['method']){
    case "pobierzTabele":
        $result = mysqli_query($connect, $tabela['query']);
        $firsStepArray = Array();
        $toReturn = Array();
//Dodawanie hederów kolumn
        $half = mysqli_fetch_fields($result);
        for ($j = 0; $j < sizeof($half); $j++){
            $toReturn[0][$j] = $half[$j];
        }
//Dodaje do $toReturn wartości krotek opakowane w [] i przedzielone przecinkiem
        $firsStepArray[] = mysqli_fetch_all($result);
        for ($i = 0; $i < sizeof($firsStepArray[0]); $i++){
            $toReturn[$i+1] = $firsStepArray[0][$i];
        }
        echo json_encode($toReturn);
        break;
    case "usunWiersz":
        $result = mysqli_query($connect, $tabela['query']);
        echo json_encode("Wiersz został usunięty");
        break;
    case "dodajWiersz":
        $result = mysqli_query($connect, $tabela['query']);
        echo json_encode("Wiersz został dodany");
        break;
    case "edytujWiersz":
        $result = mysqli_query($connect, $tabela['query']);
        echo json_encode("Wiersz został edytowany");
        break;
}





?>