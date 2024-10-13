let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),nombreCliente(),seleccionarFecha(),seleccionarHora()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");document.querySelector(`#paso-${paso}`).classList.add("mostrar");const t=document.querySelector(".actual");t&&t.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach((e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))}))}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar")):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso<=pasoInicial||(paso--,botonesPaginador())}))}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){paso>=pasoFinal||(paso++,botonesPaginador())}))}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach((e=>{const{id:t,nombre:o,precio:a}=e,c=document.createElement("P");c.classList.add("nombre-servicio"),c.textContent=o;const r=document.createElement("P");r.classList.add("precio-servicio"),r.textContent=`L${a}`;const n=document.createElement("DIV");n.classList.add("servicio"),n.dataset.idServicio=t,n.onclick=function(){seleccionarServicio(e)},n.appendChild(c),n.appendChild(r),document.querySelector("#servicios").appendChild(n)}))}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,a=document.querySelector(`[data-id-servicio = "${t}"]`);o.some((e=>e.id===t))?(cita.servicios=o.filter((e=>e.id!=t)),a.classList.remove("seleccionado")):(cita.servicios=[...o,e],a.classList.add("seleccionado")),console.log(cita)}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[0].includes(t)?(e.target.value="",mostrarAlerta("Dia domingo no permitido","error")):cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value,o=t.split(":")[0],a=parseInt(t.split(":")[1]),c=new Date(cita.fecha),r=new Date;if((o<8||o>18)&&(mostrarAlerta("Hora no valida","error"),e.target.value=""),c.toDateString()===r.toDateString()){if(o<r.getHours()||o===r.getHours()&&a<r.getMinutes())return mostrarAlerta("Hora no válida. No puedes seleccionar una hora anterior a la actual.","error"),void(e.target.value="")}else cita.hora=e.target.value}))}function mostrarAlerta(e,t){if(document.querySelector(".alerta"))return;const o=document.createElement("DIV");o.textContent=e,o.classList.add("alerta"),o.classList.add(t);document.querySelector(".formulario").appendChild(o),setTimeout((()=>{o.remove()}),3e3)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));