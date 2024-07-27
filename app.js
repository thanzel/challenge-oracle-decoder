// Variable para el texto a cifrar o descifrar
let textoIngresado = "";

// Variable para control del boton clickeado
let esClickeado =false;

// Constante regex para validar el texto
const regexCaracteresValidos = /^[a-z0-9\s!@#$%^&*()_+=[\]{};':"\\|,.<>/?~-]*$/;

//Constantes regex para la encriptación
const regexParaEncritarVocales = /[aeiou]/g;
//Constante objeto tipo maps (clave-valor) para encriptar
const encriptacionDeVocales = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
};

//Constantes regex para la desencriptacion
const regexParaDesencritarVocales = /ai|enter|imes|ober|ufat/g;
//Constante objeto tipo maps (clave-valor) para desencriptar
const desencriptacionDeVocales = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u"
};

// Constantes para los botones de la pantalla, así poder controlar cuando se clickea alguno
const btnEnc = document.getElementById('btnEncriptar');

// Función para obtener el texto a procesar
function capturaTexto() {
    return String(document.getElementById('textoIngresado').value).trim();
}

// Función para el proceso de encriptacion
function encriptar() {
    textoIngresado = capturaTexto();
    esClickeado = true;
    if (esValido(textoIngresado)) {
        document.getElementById('textoResultante').value = encriptarSoloVocales(textoIngresado);
        ocultarElementos();
    } 
    return;
}

// Funcion para la encriptación del texto Ingresado
function encriptarSoloVocales(texto) {
    return texto.replace(regexParaEncritarVocales, (vocal) => encriptacionDeVocales[vocal]);
}

// Función para el proceso de desencriptación
function desencriptar() {
    textoIngresado = capturaTexto();
    esClickeado = false;
    if (esValido(textoIngresado)) {
        document.getElementById('textoResultante').value = desencriptarSoloVocales(textoIngresado);
        ocultarElementos();
    } 
    return;
}

// Función para desencriptacion del texto Ingresado
function desencriptarSoloVocales(texto) {
    return texto.replace(regexParaDesencritarVocales, (palabra) => desencriptacionDeVocales[palabra]);
}

// Función para la validación preliminar del texto a procesar (cifrar o descifrar)
function esValido(textoIngresado) {
    // Verifico si el texto ingresado está vacío, de ser así el proceso no continúa
    if (textoIngresado === "" || textoIngresado == null) {
        swal('Error', `Favor ingrese un texto para poder ${(esClickeado === true) ? 'Encriptarlo' : 'Desencriptarlo' }`, 'error');
        document.getElementById("textoIngresado").focus();
        return false;
    }

    // Verifico si el texto ingresado contiene caracteres inválidos como mayusculas. tildes, etc, de ser así el proceso no continua
    if (regexCaracteresValidos.test(textoIngresado) === false) {
        swal("Texto Inválido", "No se aceptan mayúsculas ni acentos", "error");
        document.getElementById("textoIngresado").focus();
        return false;
    }
    //retorna true cuando el texto validado está correcto
    return true;
}

// Función para copiar en el portapapeles el texto procesado
function copiarTexto() {
    navigator.clipboard.writeText(document.getElementById("textoResultante").value);
    return;
}

// Función para iniciar los elementos de la página
function condicionesIniciales() {
    document.getElementById("imgLaptop").style.visibility = 'visible';
    document.getElementById("parrafo1").style.visibility = 'visible';
    document.getElementById("parrafo2").style.visibility = 'visible';
    document.getElementById("btnCopiar").style.visibility = 'hidden';
    document.getElementById("textoIngresado").value = "";
    document.getElementById("textoResultante").value = "";
    textoIngresado = "";
    return;
}

// Función para ocultar los elementos de la página cuando se termina el proceso 
function ocultarElementos() {
    document.getElementById("imgLaptop").style.visibility = 'hidden';
    document.getElementById("parrafo1").style.visibility = 'hidden';
    document.getElementById("parrafo2").style.visibility = 'hidden';
    document.getElementById("btnCopiar").style.visibility = 'visible';
    return;
}

