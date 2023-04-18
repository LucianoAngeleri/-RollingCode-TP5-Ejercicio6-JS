let btnInicio = document.getElementById("btnInicio"),
  btnPausa = document.getElementById("btnPausa"),
  btnReset = document.getElementById("btnReset"),
  modalFinalizar = document.getElementById("modalFinalizar");
modalAdvertencia = document.getElementById("modalAdvertencia");

let horas = document.getElementById("horas"),
  minutos = document.getElementById("minutos"),
  segundos = document.getElementById("segundos"),
  milisegundos = document.getElementById("milisegundos");

let inputHoras = document.getElementById("inputHoras"),
  inputMinutos = document.getElementById("inputMinutos"),
  inputSegundos = document.getElementById("inputSegundos"),
  inputMilisegundos = document.getElementById("inputMilisegundos");

btnInicio.addEventListener("click", iniciar);
btnPausa.addEventListener("click", pausar);
btnReset.addEventListener("click", reset);

let tiempoFinal;
let tiempoActual;
let tiempoFaltante;
let tiempoFaltanteGuardado = 0;
let actualizar;
let mseg = 0;
let seg = 0;
let min = 0;
let hs = 0;

function setearTiempo() {
  mseg = parseInt(inputMilisegundos.value ? inputMilisegundos.value : 0);
  seg = parseInt(inputSegundos.value ? inputSegundos.value : 0);
  min = parseInt(inputMinutos.value ? inputMinutos.value : 0);
  hs = parseInt(inputHoras.value ? inputHoras.value : 0);
  tiempoFinal = new Date().getTime() + (mseg + seg * 1000 + min * 60 * 1000 + hs * 60 * 60 * 1000);
}
function reiniciarBotones() {
  btnReset.disabled = true;
  btnPausa.disabled = true;
  btnInicio.disabled = false;
  btnPausa.classList.replace("btn-outline-primary", "btn-outline-secondary");
  btnReset.classList.replace("btn-outline-danger", "btn-outline-secondary");
  if (btnInicio.classList.contains("btn-outline-secondary")) {
    btnInicio.classList.replace("btn-outline-secondary", "btn-outline-success");
  }
}
function escribirTiempo() {
  milisegundos.innerHTML = `${mseg}<small class="fs-6 ps-1 d-none d-md-inline">mseg</small>`;
  segundos.innerHTML = `${seg}<small class="fs-6 ps-1 d-none d-md-inline">seg</small>`;
  minutos.innerHTML = `${min}<small class="fs-6 ps-1 d-none d-md-inline">min</small>`;
  horas.innerHTML = `${hs}<small class="fs-6 ps-1 d-none d-md-inline">hs</small>`;
}
function resetearInputs() {
  inputHoras.value = "";
  inputMinutos.value = "";
  inputSegundos.value = "";
  inputMilisegundos.value = "";
}
function mostrarModalFinalizar() {
  var modal = new bootstrap.Modal(modalFinalizar);
  modal.show();
}
function mostrarModalAdvertencia() {
  var modal = new bootstrap.Modal(modalAdvertencia);
  modal.show();
}

function actualizarTiempo() {
  tiempoActual = new Date().getTime();
  tiempoFaltante = tiempoFinal - tiempoActual;
  if (tiempoFaltante <= 0) {
    mostrarModalFinalizar();
    tiempoFinal = 0;
    tiempoActual = 0;
    tiempoFaltante = 0;
    tiempoFaltanteGuardado = 0;
    mseg = 0;
    seg = 0;
    min = 0;
    hs = 0;
    resetearInputs();
    reiniciarBotones();
    clearInterval(actualizar);
  }
  mseg = tiempoFaltante % 1000;
  seg = Math.floor(tiempoFaltante / 1000) % 60;
  min = Math.floor(tiempoFaltante / 1000 / 60) % 60;
  hs = Math.floor(tiempoFaltante / 1000 / 60 / 60);
  if (mseg < 10) {
    mseg = "00" + mseg;
  } else if (mseg != 10 && mseg < 100) {
    mseg = "0" + mseg;
  }
  if (seg < 10) {
    seg = "0" + seg;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (hs < 10) {
    hs = "0" + hs;
  }
  escribirTiempo();
}
function iniciar() {
  if (tiempoFaltanteGuardado === 0) {
    setearTiempo();
  } else {
    tiempoFinal = new Date().getTime() + tiempoFaltanteGuardado;
  }
  if (mseg === 0 && seg === 0 && min === 0 && hs === 0) {
    mostrarModalAdvertencia();
    return;
  }
  actualizar = setInterval(actualizarTiempo, 1);
  btnInicio.disabled = true;
  btnPausa.disabled = false;
  btnReset.disabled = false;
  btnPausa.classList.replace("btn-outline-secondary", "btn-outline-primary");
  btnReset.classList.replace("btn-outline-secondary", "btn-outline-danger");
  btnInicio.classList.replace("btn-outline-success", "btn-outline-secondary");
}
function pausar() {
  tiempoFaltanteGuardado = tiempoFaltante;
  clearInterval(actualizar);
  btnInicio.disabled = false;
  btnPausa.disabled = true;
  btnPausa.classList.replace("btn-outline-primary", "btn-outline-secondary");
  btnInicio.classList.replace("btn-outline-secondary", "btn-outline-success");
}
function reset() {
  clearInterval(actualizar);
  tiempoFinal = 0;
  tiempoActual = 0;
  tiempoFaltante = 0;
  tiempoFaltanteGuardado = 0;
  mseg = 0;
  seg = 0;
  min = 0;
  hs = 0;
  escribirTiempo();
  reiniciarBotones();
  resetearInputs();
}
