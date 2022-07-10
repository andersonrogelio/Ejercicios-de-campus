const boton_agregar = document.getElementById("boton-agregar");
const lista_tareas = document.getElementById("lista_tareas");
const boton_limpiar = document.getElementById("boton-limpiar");
var arrTareas = [];
var contador = 0;

const setContador = () =>{
    //seteamos el valor del contador en el localstorage
    localStorage.setItem("contador",contador);
};

const getContador = () =>{
    //Devuelve lo que tenemos guardados en contador del localstorage
    let cont = localStorage.getItem("contador");
    return cont;
};

const setArregloTarea = () =>{
    //seteamos el valor del arreglo de tareas en el localstorage
    localStorage.setItem("arregloTareas",JSON.stringify(arrTareas));
    listarTareas();
};

const getArregloTarea = () =>{
    //Devuelve lo que tenemos guardados en el arreglo de tareas del localstorage
    setContador();
    let arreglo = localStorage.getItem("arregloTareas");
    return arreglo;
};


const agregarTarea = (descripcion) => {
    contador++;
    let objTarea = {
        id: contador,
        descripcion:descripcion
    };
    if (getArregloTarea() != null) {
        arrTareas = JSON.parse(getArregloTarea());
    }
    // console.log(objTsarea);
    arrTareas.push(objTarea)
    console.log(arrTareas);
    setArregloTarea();
};

const listarTareas = () =>{
    lista_tareas.innerHTML=``
    if (JSON.parse(getArregloTarea())  != null) {
        for (const tarea of JSON.parse(getArregloTarea()).reverse()) {
            lista_tareas.innerHTML += `
            <li id="${tarea.id}">
            <input type="text" class="input-tarea" value="${tarea.descripcion}">
            <button class="boton-eliminar">X</button>
            </li>
            `
        }
    }
};

const editarTarea = (idTarea,descripcion) => {
    let datos = JSON.parse(getArregloTarea());
    let newTarea = {
        id:idTarea,
        descripcion:descripcion
    }
    if (datos != null) {
        for (const tarea of datos) {
            if (tarea.id == newTarea.id) {
                tarea.descripcion = descripcion;
            }else{

            }
        }
        arrTareas = datos;
        setArregloTarea();
    }    
};
const eliminarTarea = (idTarea) => {
    let arreAxiliar;
    arreAxiliar = JSON.parse(getArregloTarea());
    arrTareas = arreAxiliar.filter((item) => item.id != idTarea);
    setArregloTarea();
    contador--;
    setContador();
};

const limpiarTodo = () => {
    arrTareas = [];
    contador = 0;
    setArregloTarea();
    setContador();
};

listarTareas();
// setContador();

boton_agregar.addEventListener("click", ()=>{
    //metodo agregar
    agregarTarea("");
});

boton_limpiar.addEventListener("click", ()=>{
    //metodo limpiar
    limpiarTodo();
});

lista_tareas.addEventListener("click", (event)=>{
    //metodo eliminar
    if (event.path[0].type == 'submit') {
        eliminarTarea(event.path[1].id);
    }
});

lista_tareas.addEventListener("keypress", (event)=>{
    //metodo editar
    if (event.keyCode == 13) {
        editarTarea(event.path[1].id,event.path[0].value);
    }
});