//Variables que nos permitiran manipular el html
const d = document;
$table = d.querySelector(".crud_table");
$form = d.querySelector(".crud_form");
$title = d.querySelector(".crud_title");
$template = d.getElementById("crud_template").content;
$fragmento = d.createDocumentFragment();

//Primero nos enfocaremos en mostrar los datos que tengamos en nuestro jsonServer
const getAll = async() => {
    try {
        let res = await fetch("http://localhost:3000/santos");
        json = await res.json();
        if (!res.ok) throw {status:res.status, statusText:res.statusText} 
        json.forEach(el => {
            $template.querySelector(".name").textContent = el.nombre;
            $template.querySelector(".constellation").textContent = el.constelacion;
            $template.querySelector(".edit").dataset.id = el.id;
            $template.querySelector(".edit").dataset.name = el.nombre;
            $template.querySelector(".edit").dataset.constellation = el.constelacion;
            $template.querySelector(".delete").dataset.id = el.id;
            let $clone = d.importNode($template,true);
            $fragmento.appendChild($clone);
        });
        $table.querySelector("tbody").appendChild($fragmento);
    } catch (error) {
        let message  = error.statusText || "Ocurrio un error";
        $table.insertAdjacentHTML("afterend",`<p>Error ${error.status0} ${message}</p>`)
        
    }
}

d.addEventListener("DOMContentLoaded", getAll)