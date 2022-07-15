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