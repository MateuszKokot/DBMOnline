$(document).ready(function() {

     var columnCount = 0;
     var columnHederName = ['test zerowania tablicy'];

    /*Pobieranie tablei z Bazy Danych*/
    $('.pobierz').click(function () {
        pobierz($(this).attr('tableName'));
    }); //Klamra zamykająca jquery pobierz


    /*Usuwanie tablei z Bazy Danych*/
    function deleteVerse(tableName, nrWiersza){
        if (confirm("Czy jesteś pewien, że usunąć wiersz " +nrWiersza+ " z tabeli " +tableName+ "?")) {
            var method = "usunWiersz"; //Tutaj wpisuje co ma odebrać SWICH w QueryRepository.php
            var query = "DELETE FROM " + tableName + " WHERE id = "+ nrWiersza +"";
            var data = { 'method':method ,'query':query};
            console.log("data(method:" + data.method + " query:" + data.query + ")");
            var dataString = JSON.stringify(data);

            $.ajax ({
                url: "QueryRepository.php",
                data: { "data": dataString },
                type: "POST",
                dataType: "json",
                success: function (json) {
                    console.log(json);
                    alert(json);
                    pobierz(tableName);
                }
            }) // Klamra zamykajaca AJAXa
        } else {
            alert("Anulowano usuwanie wiersza");
        }


    }

    function editVerse(tabela, wiersz){
        console.log("edit:(" +wiersz+ ")")

        $('#ok'+wiersz+'').removeClass('hidden');
        $('#cancel'+wiersz+'').removeClass('hidden');
        $('#delete'+wiersz+'').addClass('hidden');
        $('#edit'+wiersz+'').addClass('hidden');
        $('.columnOperations').find('.rowIndex'+wiersz+'').addClass('bigrow');
        for (var i = 0; i < columnHederName.length; i++){

            $('.column'+columnHederName[i]+'')
                .find('.rowIndex'+wiersz+'')
                .addClass('bigrow');

            $('.column'+columnHederName[i]+'')
                .find('.rowIndex'+wiersz+'')
                .append('<input id="editInput'+i+'" column="'+columnHederName[i]+'" type="text" ' +
                    'class="inputtext inputedit editcolumn'+columnHederName[i]+' editrow'+wiersz+'" placeholder="type here">');

        }
    }

    function okEdit(tableName, wiersz){
        var query =  " UPDATE " + tableName + " SET ";
        for (var i = 0; i < columnCount; i++){
            if ($('#editInput'+ i).val() != ""){
                console.log("edit column" + i)
                query += columnHederName[i] + " = '" + $('#editInput'+ i).val() + "', ";
            }
        }
        query = (query.substr( 0,query.length-2)) + " WHERE "+columnHederName[0]+" = " + wiersz;

        var method = "edytujWiersz" //Tutaj wpisuje co ma odebrać SWICH w QueryRepository.php
        var data = { 'method':method ,'query':query};
        console.log("data(method:" + data.method + " query:" + data.query + ")");
        var dataString = JSON.stringify(data);

        $.ajax ({
            url: "QueryRepository.php",
            data: { "data": dataString },
            type: "POST",
            dataType: "json",
            success: function (json) {
                console.log(json);
                alert(json);
                pobierz(tableName);
            }

        }) // Klamra zamykajaca AJAXa
    }

    function cancelEdit(wiersz){
        $('#ok'+wiersz+'').addClass('hidden');
        $('#cancel'+wiersz+'').addClass('hidden');
        $('#delete'+wiersz+'').removeClass('hidden');
        $('#edit'+wiersz+'').removeClass('hidden');
        $('.columnOperations').find('.rowIndex'+wiersz+'').removeClass('bigrow');
        for (var i = 0; i < columnHederName.length; i++){

            $('.column'+columnHederName[i]+'')
                .find('.rowIndex'+wiersz+'')
                .removeClass('bigrow');

            $('.column'+columnHederName[i]+'')
                .find('.rowIndex'+wiersz+'')
                .find( '.editcolumn'+columnHederName[i]+'' )
                .remove();

        }
        console.log("Cancel edit");
    }

    function addVerse(tableName){

        var column = "(";
        var value = "(";
        for (var i = 0; i < columnCount; i++){
            if ($('#input'+ i).val() != ""){
                console.log("add column" + i)
                    column += ($('#input'+ i).attr('columnname') + ",")
                    value += ("'" + $('#input'+ i).val() + "',")
                }
            }
        var column = (column.substr( 0,column.length-1) + ")" );
        var value = (value.substr(0,value.length-1) + ")" );

        var method = "dodajWiersz" //Tutaj wpisuje co ma odebrać SWICH w QueryRepository.php
        var query = "INSERT INTO " + tableName + " " + column + " VALUES " + value;
        var data = { 'method':method ,'query':query};
        console.log("data(method:" + data.method + " query:" + data.query + ")");
        var dataString = JSON.stringify(data);

        $.ajax ({
            url: "QueryRepository.php",
            data: { "data": dataString },
            type: "POST",
            dataType: "json",
            success: function (json) {
                console.log(json);
                alert(json);
                pobierz(tableName);
            }
        }) // Klamra zamykajaca AJAXa
    }



    //Pobiera tabelę i rysowanie tabeli z BD
    function pobierz(table) {


        var method = "pobierzTabele" //Tutaj wpisuje co ma odebrać SWICH w QueryRepository.php
        var query = "SELECT * FROM " + table ;
        var data = { 'method':method ,'query':query};
        console.log("data(method:" + data.method + " query:" + data.query + ")");
        var dataString = JSON.stringify(data);

        $.ajax ({
            url: "QueryRepository.php",
            data: { "data": dataString },
            type: "POST",
            dataType: "json",
            success: function (json) {
                console.log(json);

                $('#mainbar').empty();
                columnCount = json[0].length;
                columnHederName = [];
                console.log("Liczba kolumn(" + columnCount + ")");

                $("<div id='tableLabel' class='tableLabel'>"+table+"</div>")
                    .appendTo('#mainbar');
                $("<div id='tableDiv' class='tableDiv'></div>")
                    .appendTo('#mainbar');

                for (var i = 0; i <= json[0].length; i++){

                    if (i == 0){
                        //Tworzenie kolumny operacji
                        var columnName = "operations";
                        $("<div id='column"+ i +"' class='column columnOperations'></div>").appendTo('#tableDiv')
                        $("<div class='heder row'></div>")
                            .appendTo('#column' + i + '')

                        //Dodawanie operacji do krotek
                        for (var j = 1; j < json.length; j++) {
                            $("<div class='rowOper cell rowIndex"+json[j][0]+"'>" +
                                "<div id='delete" + json[j][i] + "' tableName='" + table + "' tableKey='" + json[j][i] + "' class='operationButton delete'></div>" +
                                "<div id='ok" + json[j][i] + "' tableName='" + table + "' tableKey='" + json[j][i] + "' class='operationButton ok hidden'></div>" +
                                "<div id='edit" + json[j][i] + "' tableName='" + table + "' tableKey='" + json[j][i] + "' class='operationButton edit'></div>" +
                                "<div id='cancel" + json[j][i] + "' tableName='" + table + "' tableKey='" + json[j][i] + "' class='operationButton cancel hidden'></div>" +
                                "</div>").appendTo('#column' + i + '');
                            $('#delete' + json[j][i] + '').click(function (evt) {
                                deleteVerse($(this).attr('tableName'), $(this).attr('tableKey'));
                            });
                            $('#ok' + json[j][i] + '').click(function (evt) {
                                okEdit($(this).attr('tableName'), $(this).attr('tableKey'));
                            });
                            $('#edit' + json[j][i] + '').click(function (evt) {
                                editVerse($(this).attr('tableName'), $(this).attr('tableKey'));
                            });
                            $('#cancel' + json[j][i] + '').click(function (evt) {
                                cancelEdit($(this).attr('tableKey'));
                            });
                        }
                    }else {
                        //Tworzenie kolumn oraz ich hederów
                        var columnName = json[0][i-1].name;
                        columnHederName.push(columnName)
                        $("<div id='column"+ i +"' class='column column"+columnName+"'></div>").appendTo('#tableDiv')
                        $("<div class='heder row'>" + columnName + "</div>")
                            .appendTo('#column' + i + '')

                        //Dodawanie krotek z danymi
                        for (var j = 1; j <= json.length; j++){
                            if (j<json.length){
                                var value = json[j][i-1];
                                $("<div class='row cell rowIndex"+json[j][0]+"' rowIndex='"+json[j][0]+"' columnIndex='"+json[0][i-1].name+"' >"+ value +"</div>")
                                    .appendTo('#column' + i + '')
                            }else {
                                $("<div class='row cell'>" +
                                        "<form>" +
                                            "<input type='text' id='input"+(i-1)+"' columnName='"+json[0][i-1].name+"' class='inputtext' placeholder='type here'>" +
                                            "</form>" +
                                        "</div>")
                                    .appendTo('#column' + i + '')
                            }
                        }
                    }
                }
                console.log("Nagłówki tabeli:(" + columnHederName + ")")
                $("<div class='heder row'>" +
                    "<div id='add' tableName='" + table + "' class='operationButton add'>" +
                    "</div>" +
                "</div>").appendTo('#column0');
                $('#add').click(function (evt) {
                    addVerse($(this).attr('tableName'));
                });
            }
        }) // Klamra zamykajaca AJAXa
    }




});/*Klamra zamykająca $(document).ready(function(){*/