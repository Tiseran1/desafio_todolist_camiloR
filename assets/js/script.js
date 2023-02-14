let tareas = [
{
    id: 1,
    descripcion: " Hacer mercado",
    completado: true
},
{
    id: 2,
    descripcion: "Estudiar para la prueba",
    completado: false
},
{
    id: 3,
    descripcion: "Sacar a pasear a Tobby",
    completado: false
}

];

const inputAgregar = document.querySelector("#inputAgregar");
const botonAgregar = document.querySelector("#btnAgregar");
const spanTareasTotales = document.querySelector("#tareasTotales");
const SpanTareasRealizadas = document.querySelector("#tareasRealizadas");
const divTareas = document.querySelector("#tareas");
const botonBoorrar = document.querySelector("#btnBorrar");


let nuevoId = 4;
renderTareas ();  

botonAgregar.addEventListener("click",function (){

    crearTarea();

    renderTareas();

    tareasTotales();
});

function crearTarea() {
    let nuevaTarea = inputAgregar.value;

    tareas.push({
        id: nuevoId,
        descripcion: nuevaTarea,
        completado: false
    });

    nuevoId ++;
}

function renderTareas (){
    let html ="";

    tareas.forEach(function(tarea){
        let checkboxChequeado = "";

            if(tarea.completado) {
                checkboxChequeado = "checked";
            }

        let template =`
        <div style="width:10%">${tarea.id}</div>
        <div style="width:70%">${tarea.descripcion}</div>
        <div style="width:10%">
            <input type="checkbox" id="completado-${tarea.id}" ${checkboxChequeado} onchange ="actualizarTarea(${tarea.id})">
        </div>
        <div style="width:10%" class="mt-2">
            <button class="btn btn-danger" 
            onclick="borrar(${tarea.id})">X</button>
        </div>    
        `;
        html += template;

    })

    divTareas.innerHTML = html;  
}

function actualizarTarea(id){

    const indexTarea = tareas.findIndex(tarea => tarea.id == id ); 

    const completada = document.querySelector("#completado-" + id).checked; 

    tareas[indexTarea].completado =  completada;

    renderTareas();
    tareasTotales();
    tareasRealizadas ();
}

    function tareasTotales () {
        let total = tareas.length;
        spanTareasTotales.innerHTML = total;
    }
    function tareasRealizadas () {
        let tareasCompletadas =  tareas.filter (tareas => tareas.completado);
        let realizadas = tareasCompletadas.length;

        SpanTareasRealizadas.innerHTML = realizadas;
    }
    
    function borrar(id){
        const index = tareas.findIndex((ele) => ele.id == id);
        tareas.splice(index, 1);
        renderTareas();
        tareasTotales();
    };
