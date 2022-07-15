//Variables que nos permitiran manipular el html
const d = document;
$table = d.querySelector(".crud_table");
$form = d.querySelector(".crud_form");
$title = d.querySelector(".crud_title");
$template = d.getElementById("crud_template").content;
$fragmento = d.createDocumentFragment();

//Primero nos enfocaremos en mostrar los datos que tengamos en nuestro jsonServer
//Esta funcion asincona nos permitira obtener nuestro datos del server 
const getAll = async() => {
    try {
        //Obtenemos la informacion 
        let res = await fetch("http://localhost:3000/santos");
        //Capturamos la informacion obtenida
        json = await res.json();
        //El siguiente if nos permite manupular el error de la forma que querramos 
        if (!res.ok) throw {status:res.status, statusText:res.statusText} 
        //Usamos un for each para poder recorrer nuestro json y ir agregandolo a nuestro template
        json.forEach(el => {
            $template.querySelector(".name").textContent = el.nombre;
            $template.querySelector(".constellation").textContent = el.constelacion;
            $template.querySelector(".edit").dataset.id = el.id;
            $template.querySelector(".edit").dataset.name = el.nombre;
            $template.querySelector(".edit").dataset.constellation = el.constelacion;
            $template.querySelector(".delete").dataset.id = el.id;
            let $clone = d.importNode($template,true);
            //Lo insertamos al fragmento de dom
            $fragmento.appendChild($clone);
        });
        //agregamos en el cuerpo de la tabla la informacion que obtuvimos del server
        $table.querySelector("tbody").appendChild($fragmento);
    } catch (error) {
        //en caso de obtener un error aca lo manejamos 
        //caso el statusText venga vacio le damos el texto:"Ocurrio un error"
        let message  = error.statusText || "Ocurrio un error";
        //Insertamos el error al final de la tabla
        $table.insertAdjacentHTML("afterend",`<p>Error ${error.status0} ${message}</p>`)
        
    }
}
//Llamamos la funcion mediante el evento DOMContentLoaded
d.addEventListener("DOMContentLoaded", getAll)
//Mediante el evento submit enviaremos datos y los actualizaremos 
//usando fuciones asincronas
d.addEventListener("submit", async e => {
    if (e.target === $form) {
        e.preventDefault();
        //verificar que tipo de operacion se hara
        if (!e.target.id.value) {
            //Create - POST
            //Empezamos todo el proceso de envio de datos en caso de que sea un dato nuevo a ser guardado
          try {
            //configuramos la informacion que sera enviada en la peticion post
            let options = {
              method: "POST",
              headers: {
                "Content-type": "application/json; charset=utf-8"
              },
              body: JSON.stringify({
                nombre: e.target.nombre.value,
                constelacion: e.target.constelacion.value
              })
            },
            //Enviamos la informacion
              res = await fetch("http://localhost:3000/santos", options),
              json = await res.json();
              //La siguiente linea nos permite manejar los errores de forma manual
            if (!res.ok) throw { status: res.status, statusText: res.statusText };
            //volvemos a recargar la pagina para que se muestre la nueva informacion
            location.reload();
          } catch (error) {
            //manejo del error 
                let message = error.statusText||"Ocurrio un error";
                $form.insertAdjacentHT("afterend",`<p>Error ${error.status0}: ${message}</p>`)
            }
        }else{
            // console.log(e.target.id.value);
            //Empezamos todo el proceso de envio de datos para el caso de actualizar datos
            try {
            //configuramos la informacion que sera enviada en la peticion put
                let options = {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json; charset=utf-8"
                  },
                  body: JSON.stringify({
                    nombre: e.target.nombre.value,
                    constelacion: e.target.constelacion.value
                  })
                },
            //Enviamos la informacion
                res = await fetch(`http://localhost:3000/santos/${e.target.id.value}`, options),
                json = await res.json();
              //La siguiente linea nos permite manejar los errores de forma manual
                if (!res.ok) throw { status: res.status, statusText: res.statusText };
            //volvemos a recargar la pagina para que se muestre la nueva informacion
                location.reload();
              } catch (error) {
            //manejo del error 
                    let message = error.statusText||"Ocurrio un error";
                    $form.insertAdjacentHT("afterend",`<p>Error ${error.status0}: ${message}</p>`)
                }
        }
    }
           
});