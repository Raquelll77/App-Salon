
let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
})

function iniciarApp() {
    mostrarSeccion(); //muestra y oculta las secciones
    tabs(); //cambia la seccion cuando se presionan los tabs
    botonesPaginador(); //agrega o quita los botones del paginador
    paginaSiguiente();
    paginaAnterior();
    consultarAPI(); //consulta API en el backend
    nombreCliente(); //anade el nombre al objeto de cita
    seleccionarFecha(); //añade la fecha de la cita al objeto
    seleccionarHora();
}

function mostrarSeccion() {

    //ocultar la seccion que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }

    //seleccinar la seccion con el paso...
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add('mostrar');

    //remover la clase de actual al tab anterior
    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    //resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton => {
        boton.addEventListener('click', function (e) {
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
        })
    })

}

function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();

}
function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function () {
        if (paso <= pasoInicial) return;
        paso--;

        botonesPaginador();
    })
}
function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function () {
        if (paso >= pasoFinal) return;
        paso++;

        botonesPaginador();
    })
}

async function consultarAPI() {

    try {
        const url = 'http://localhost:3000/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();

        mostrarServicios(servicios);

    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {

        const { id, nombre, precio } = servicio;
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `L${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function () {
            seleccionarServicio(servicio)
        };

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);

    });
}

function seleccionarServicio(servicio) {
    const { id } = servicio;
    const { servicios } = cita;

    //identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio = "${id}"]`);

    //comprobar si un servicio ya fue agregado
    if(servicios.some( agregado => agregado.id === id)){
        cita.servicios = servicios.filter(agregado=> agregado.id != id)        
        divServicio.classList.remove('seleccionado');
    }else{
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }   
    console.log(cita);
}

function nombreCliente(){
    cita.nombre = document.querySelector('#nombre').value;
}

function seleccionarFecha(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e){

        const dia = new Date(e.target.value).getUTCDay();
        if([0].includes(dia)){
            e.target.value = '';
            mostrarAlerta('Dia domingo no permitido', 'error');
        }else{
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e){
        
        const horaCita = e.target.value;
        const hora = horaCita.split(':')[0];
        const minutos = parseInt(horaCita.split(':')[1]);
        const fechaSeleccionada = new Date(cita.fecha);
        const fechaActual = new Date(); // Fecha y hora actuales

        if(hora < 8  || hora > 18){
            mostrarAlerta('Hora no valida', 'error');
            e.target.value = '';
        }
        if (fechaSeleccionada.toDateString() === fechaActual.toDateString()) {
            if (hora < fechaActual.getHours() || (hora === fechaActual.getHours() && minutos < fechaActual.getMinutes())) {
                mostrarAlerta('Hora no válida. No puedes seleccionar una hora anterior a la actual.', 'error');
                e.target.value = '';
                return;
            }
        }else{
            cita.hora = e.target.value;
        }
    })
}

function mostrarAlerta(mensaje, tipo){
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) return;

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const formulario = document.querySelector('.formulario');
    formulario.appendChild(alerta);

    setTimeout(()=>{
        alerta.remove();
    },3000)
}

