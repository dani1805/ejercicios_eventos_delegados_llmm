$('document').ready(function() { //Cuando la pagina carga

    var listAlbumns = $("#list-albums");
    var listAlbumnsImg = $("#list-albums-img");
    var tablePosts = $("#table-posts");

    // Haces la peticion a la API. Declaras de forma global la variable correspondiente a tu select. Con el append añades de forma dinamica los elementos.

    $.ajax("https://jsonplaceholder.typicode.com/albums", {
        dataType: 'json',
        success: function (data) {
            data.forEach(function (value) {
                listAlbumns.append("<option value=" + value.id + ">" + value.title + "</option>");
            }); // Añades al select cada option value concatenando su value.id y su value.title
        },
        error: function (jqXHR, texStatus, error) {
            alert("Error:" + texStatus + " " + error);
        }
    });

    listAlbumns.change(function(){ // Para detectar el cambio en el select
        var id = $(this).val(); // Para recuperar la id
        listAlbumnsImg.empty(); // Sirve para vaciar el contenedor y evitar que se repitan las imagenes

        // Haces la peticion a la API. Añades en la etiqueta de imagen la variable value.url que sacas la url de las imagenes.
        
        $.ajax("https://jsonplaceholder.typicode.com/photos?albumId=" + id, {
            dataType: 'json',
            success: function (data) {
                data.forEach(function (value) {
                    listAlbumnsImg.append("<img src= " + value.url + " class='w-50 my-4 d-block'>");
                });
            },
            error: function (jqXHR, texStatus, error) {
                alert("Error:" + texStatus + " " + error);
            }
        });
        
    });

    // Haces la peticion a la API. Realizas un bucle for puesto que piden los 20 primeros posts. Usas el append para ir añadiendo cada elemento en un td. Puedes declarar una variable de tipo tr vacia para luego añadir sus td.

    $.ajax("https://jsonplaceholder.typicode.com/posts", {
        dataType: 'json',
        success: function (data) {
            for (i = 0; i < 20; i++) {
                var tr = $("<tr></tr>");
                tr.append("<td id=" + data[i].id +">" + data[i].userId + "</td>");
                tr.append("<td id=" + data[i].id +">" + data[i].id + "</td>");
                tr.append("<td id=" + data[i].id +">" + data[i].title + "</td>");
                tr.append("<td id=" + data[i].id +">" + data[i].body + "</td>");

                tr.on("click", function(event) { //Detectar el click en cada celda
                    var id = event.target.id; //Elemento que llama al evento
                    $.ajax("https://jsonplaceholder.typicode.com/users?id=" + id, {
                        dataType: 'json',
                        success: function (data) {
                            data.forEach(function (value) {
                                alert("Name: " + value.name + " Email: " + value.email);
                            }); //Sacas en el alert el nombre y el email concatenando el value. y lo que desees.
                        },
                        error: function (jqXHR, texStatus, error) {
                            alert("Error:" + texStatus + " " + error);
                        }
                    });
                });

                tablePosts.append(tr); // Añades los tr
            }
        },
        error: function (jqXHR, texStatus, error) {
            alert("Error:" + texStatus + " " + error);
        }
    });
});