//Clase empleado

class Empleado {
    constructor(dni, nombre, apellidos, direccion, telefono, tipo, complementos) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.telefono = telefono;
        this.tipo = tipo;
        this.complementos = complementos;
    }
}

//Lista donde se guarda clada empleado creado

let listaEmpleados = [
    new Empleado("51233454J", "Alberto", "Varela Paz", "Rúa Alonso nº20", "666555888", "Becario", "Nocturnidad")
]


//Función para mostrar los empleados intentando que estén siempre actualizados.

function mostrarEmpleados() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    // Creo una opción por cada empleado en la lista
    listaEmpleados.forEach(empleado => {
        let opcion = document.createElement("option");
        opcion.value = `${empleado.dni}`;
        opcion.textContent = `${empleado.dni} - ${empleado.nombre} ${empleado.apellidos}`;
        //Añado la opción creada a la lista <select>
        lista.appendChild(opcion);
    });
}

/*Para que se muestre la lista guardada, 
llamo a este evento de carga de página y llamo a la función para mostrar la lista*/

document.addEventListener("DOMContentLoaded", function () {
    mostrarEmpleados();
    });

//Función para crear y agregar el empleado recibido en el formulario en la lista.

function agregarEmpleado() {

    /*Guardo los valores de los elementos del formulario, 
    en algunos fuerzo a que se guarde con la primera letra en mayúscula y las siguientes en minúsculas.*/

    let dni = document.getElementById("dni").value.trim();
    let nombre = document.getElementById("nombre").value.trim().charAt(0).toUpperCase() + document.getElementById("nombre").value.trim().slice(1).toLowerCase();
    let apellidos = document.getElementById("apellidos").value.trim().charAt(0).toUpperCase() + document.getElementById("apellidos").value.trim().slice(1).toLowerCase();
    let direccion = document.getElementById("direccion").value.trim().charAt(0).toUpperCase() + document.getElementById("direccion").value.trim().slice(1).toLowerCase();
    let telefono = document.getElementById("telefono").value.trim();
    let tipoTrabajador = document.querySelector("input[type='radio']:checked").value;
    let complementos = document.querySelectorAll(".check");
    let formulario = document.getElementById("formulario");

    let complementosSeleccionados = Array.from(complementos) //Filtro y guardo los checkboxes que están marcados por el usuario.
                                    .filter(complemento => complemento.checked)
                                    .map(complemento => complemento.value);

    let nuevoEmpleado = new Empleado(dni, nombre, apellidos, direccion, telefono, tipoTrabajador, complementosSeleccionados);      
    
    let encontrado = false;

    if(!/^\d{8}[A-Za-z]$/.test(dni)){
        alert("El formato del DNI no es correcto, tiene que contener 8 números y 1 letra.");
        encontrado = true;
    }

    if(nombre == "" || apellidos == "" || direccion == "" || telefono == ""){ //Compruebo si están todos los campos cubiertos.
        alert("Todos los campos son obligatorios. ");
        encontrado = true;
    }

    else{
    for(let i=0; i<listaEmpleados.length; i++){ //Bucle para comprobar si existe el dni en algún empleado
        if(listaEmpleados[i].dni.toLowerCase() == nuevoEmpleado.dni.toLowerCase()){
            alert("El dni ya está registrado.");
            encontrado = true;
            break;
    }
}
}

    if(!encontrado){
        listaEmpleados.push(nuevoEmpleado); //Si las validaciones fueron correctas, agrego el empleado a la lista.
        alert("Empleado añadido correctamente."); 
        formulario.reset();  // Reseteo los campos una vez el empleado fue agregado correctamente.
        }
    mostrarEmpleados(); //Llamo a la función para actualizar la lista de empleados.
}


/* Función para mostrar los detalles del empleado seleccionado */

function mostrarDetallesEmpleado(){
    // Obtengo el valor del  elemento <select>
    const empleadoSeleccionado = document.getElementById("lista").value;

    // Obtengo el elemento donde se mostrará la información
    const areaInformacion = document.getElementById("informacion");

    // Muestro la información basada en la opción seleccionada
    if (empleadoSeleccionado) { //Compruebo que haya algo seleccionado, como el valor único es el DNI, cojo ese valor y compruebo sus datos en la lista.
        let datos = "";
        for(let i=0; i<listaEmpleados.length; i++){
            if(listaEmpleados[i].dni == empleadoSeleccionado){
                datos += `${listaEmpleados[i].dni} - ${listaEmpleados[i].nombre} ${listaEmpleados[i].apellidos} - ${listaEmpleados[i].direccion} - ${listaEmpleados[i].telefono} -
                ${listaEmpleados[i].tipo} - ${listaEmpleados[i].complementos}`;
                break; //Una vez encontrado y rellenado los datos, no hace falta recorrer más el bucle .
            }
        }
        areaInformacion.textContent = datos; //Muestro los datos en el elemento de la web creado para ello.
    }

    
}

function modificarEmpleado() {

    const empleadoSeleccionado = document.getElementById("lista").value;

    /* Obtengo todos los campos del nuevo formulario de modificación para rellenarlo con datos 
    del empleado que se quiere modificar, a su vez muestro el formulario, que de primeras se 
    encuentra oculto */

    if(empleadoSeleccionado){
        const formulario = document.getElementById("formularioModificacion");
        formulario.hidden = false;
        formulario.reset();
        const dni = document.getElementById("dni2");
        const nombre = document.getElementById("nombre2");
        const apellidos = document.getElementById("apellidos2");
        const direccion = document.getElementById("direccion2");
        const telefono = document.getElementById("telefono2");
        let radioBecario = document.getElementById("radioBecario2");
        let radioParcial = document.getElementById("radioParcial2");
        let radioFijo = document.getElementById("radioFijo2");
        let checkPeligrosidad = document.getElementById("peligrosidad2");
        let checkNocturnidad = document.getElementById("nocturnidad2");
        let checkDestino = document.getElementById("destino2");


        /* Una vez encontrado el empleado en la lista, procedo a rellenar
        los campos*/

        for(let i=0; i<listaEmpleados.length; i++){
            if(listaEmpleados[i].dni == empleadoSeleccionado){

                dni.value = listaEmpleados[i].dni;
                nombre.value = listaEmpleados[i].nombre;
                apellidos.value = listaEmpleados[i].apellidos;
                direccion.value = listaEmpleados[i].direccion;
                telefono.value = listaEmpleados[i].telefono;

                /*Comprobaciones para saber que valores del radiobutton o checkbox
                están registrados en el empleado y marcarlos cuando se quiere modificar para que el 
                usuario sepa cuales son los datos guardados.*/

                if(listaEmpleados[i].tipoTrabajador == "Becario"){
                    radioBecario.checked = true;
                }
                if(listaEmpleados[i].tipoTrabajador == "Parcial"){
                    radioParcial.checked = true;
                }
                if(listaEmpleados[i].tipoTrabajador == "Fijo"){
                    radioFijo.checked = true;
                }


                if(listaEmpleados[i].complementos.includes("Destino")){
                    checkDestino.checked = true;
                }
                if(listaEmpleados[i].complementos.includes("Peligrosidad")){
                    checkPeligrosidad.checked = true;
                }
                if(listaEmpleados[i].complementos.includes("Nocturnidad")){
                    checkNocturnidad.checked = true;
                }

            }
     
        }
    } else {
        alert("No has seleccionado ningún empleado para poder modificar. ");
    }

    //Botón de actualizar los datos una vez rellenados por el usuario con su respectivo evento
    const botonActulizarDatos = document.getElementById("btnModificar");

    botonActulizarDatos.addEventListener("click", () => {

        let dni = document.getElementById("dni2").value;
        let newNombre = document.getElementById("nombre2").value.trim().charAt(0).toUpperCase() + document.getElementById("nombre2").value.trim().slice(1).toLowerCase();
        let newApellidos = document.getElementById("apellidos2").value.trim().charAt(0).toUpperCase() + document.getElementById("apellidos2").value.trim().slice(1).toLowerCase();
        let newDireccion = document.getElementById("direccion2").value.trim().charAt(0).toUpperCase() + document.getElementById("direccion2").value.trim().slice(1).toLowerCase();
        let newTelefono = document.getElementById("telefono2").value;

        let newtipoTrabajador = document.querySelector("input[name='radio2']:checked").value;
        let newComplementos = document.querySelectorAll(".check2");

        let newComplementosSeleccionados = Array.from(newComplementos) //Filtro y guardo los checkboxes que están marcados por el usuario.
                                    .filter(complemento => complemento.checked)
                                    .map(complemento => complemento.value);

        if(newNombre == "" || newApellidos == "" || newDireccion == "" || newTelefono == ""){
                alert("No pueden quedar campos en blanco. ");
        }
            else {
                    for(let i=0; i<listaEmpleados.length; i++){
                        //Una vez encontrado el empleado, procedo a cambiar los nuevos registros.
                        if(listaEmpleados[i].dni == dni){
                            listaEmpleados[i].nombre = newNombre;
                            listaEmpleados[i].apellidos = newApellidos;
                            listaEmpleados[i].direccion = newDireccion;
                            listaEmpleados[i].telefono = newTelefono;
                            listaEmpleados[i].tipoTrabajador = newtipoTrabajador;
                            listaEmpleados[i].complementos = newComplementosSeleccionados;
                            }               
                    }
            alert(`Datos del empleado con dni ${dni} cambiados satisfactoriamente. `);
            let formulario = document.getElementById("formularioModificacion");
            mostrarEmpleados();
            //Elimino los campos rellenados
            formulario.reset();
            //Oculto de nuevo el formulario de modificación.
            formulario.hidden = true;
            
        }

    })
    
    mostrarEmpleados();
}


//Función que es llamado cuando se pulsa el botón de eliminar empleado

function eliminarEmpleado(){

    //Obtengo el valor del select, lo busco en la lista y lo elimino con splice.
    const formularioAlta = document.getElementById("formulario");
    const formularioModificacion = document.getElementById("formularioModificacion");
    const empleadoSeleccionado = document.getElementById("lista").value;

    //Si hay un empleado seleccionado
    if(empleadoSeleccionado){
        let confimacion = confirm("¿Estás seguro de eliminar el empleado seleccionado?");
        if(confimacion){  /*Si se confirma la operación, reseteo ambos formularios por si 
                                hay algún dato metido y continúo a eliminar el empleado seleccionado*/
            formularioModificacion.reset();
            formularioAlta.reset();

            for(let i=0; i<listaEmpleados.length; i++){
                if(listaEmpleados[i].dni == empleadoSeleccionado){
                    listaEmpleados.splice(i,1);
                    alert("Empleado eliminado correctamente.");
                    break;
        }
    }
}
} else {
    alert("No has seleccionado ningún empleado.");
}
    //Compruebo si se han borrado todos los contactos, 
    //y así eliminar la posible información del último empleado borrado y si el
    //formulario de modificación está activo, ocultarlo.

    if(listaEmpleados.length == 0){
        document.getElementById("informacion").textContent = "";
        formularioModificacion.hidden = true;

    }

    mostrarEmpleados();
}