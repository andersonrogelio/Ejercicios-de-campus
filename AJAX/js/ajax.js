(() => {
    //Estamos instanciando el objeto AJAX que nos permitira 
    const xhr = new XMLHttpRequest();
    //capturamos nuestro elemento del html donde le agregaremos los datos
    $xhr = document.getElementById("xhr");
    //creamos un fragmento del dom para poder hacer la app mas
    //eficiente y asi no estar siempre insertando elementos en el html
    $fragment = document.createDocumentFragment();
//evento que nos leera los cambios en funcion de el estado de la comunicacion
    xhr.addEventListener("readystatechange",(e) => {
        //solo me mostrara el objeto xhr cuando el codigo de estado sea 4
        if (xhr.readyState !== 4) {
            return;
        }
        //mostramos el objeto en consola
        console.log(xhr);
        //verificamos que el codigo de estado este entre 200 y 299 esto indica que la comunicacion 
        //es correcta y no sucedio ningun error 
        if (xhr.status>= 200 && xhr.status < 300) {
            console.log("Exito");
            //convertimos el json que traemos del api en objeto y lo guardo en json
            let json = JSON.parse(xhr.responseText);
            // console.log(json);
            //recorro el json con un forEach 
            json.forEach(element => {
                //creo un elemento li 
                const $li = document.createElement("li")
                //luego agregamos la info del objeto guardado en la variable json
                $li.innerHTML = `${element.name} -- ${element.email} -- ${element.phone}`
                //luego agrego el elemento li dentro del fragmento de html que creamos 
                $fragment.appendChild($li);
            });
            //luego agregarlo a mi lista ordenada 
            $xhr.appendChild($fragment);
        }else{
            let message = xhr.statusText||"Ocurrio un error";
            $xhr.innerHTML = `Error ${xhr.status}: ${message}`
        }
        console.log("Este mensaje se mostrara sin importar nada");

    });

    xhr.open("GET","https://jsonplaceholder.typicode.com/users");

    xhr.send();
})();