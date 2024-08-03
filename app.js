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
    isVisible("alerta", false);
    isVisible("parrafo1", false);  
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
    isVisible("alerta", false);  
    isVisible("parrafo1", false);  
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
    return texto.replace(regexParaDesencritarVocales, (vocal) => desencriptacionDeVocales[vocal]);
}

// Función para la validación preliminar del texto a procesar (cifrar o descifrar)
function esValido(textoIngresado) {
    // Verifico si el texto ingresado está vacío, de ser así el proceso no continúa
    if (textoIngresado === "" || textoIngresado == null) {        
        isVisible("alerta", true);         
        asignarTexto("contenido__mensaje__error", `Favor ingrese un texto para ${(esClickeado === true) ? 'Encriptarlo' : 'Desencriptarlo' }`);
        isVisible("parrafo1", true);      
        asignarTexto("parrafo1", "Ningún mensaje fue encontrado");
        document.getElementById("textoIngresado").focus();
        return false;
    }

    // Verifico si el texto ingresado contiene caracteres inválidos como mayusculas. tildes, etc, de ser así el proceso no continua
    if (regexCaracteresValidos.test(textoIngresado) === false) {
        isVisible("alerta", true);       
        asignarTexto("contenido__mensaje__error","Solo se aceptan letras minúsculas y sin acentos");
        isVisible("parrafo1", true);  
        asignarTexto("parrafo1", "Solo minúsculas, sin acentos");
        document.getElementById("textoIngresado").focus();
        return false;
    }
    //retorna true cuando el texto validado está correcto
    isVisible("alerta", false); 
    isVisible("parrafo1", false); 
    return true;
}

// funcion para reflejar errores o información en el proceso
function asignarTexto(elemento, texto) {
    let elementoHTML = document.getElementById(elemento);
    elementoHTML.innerText = texto;
    return;
}

// Función para mostrar o esconder elementos en la página  
function isVisible(elemento, estatus) {
    let elementoHTML = document.getElementById(elemento);
    elementoHTML.style.visibility =  (estatus == true) ? 'visible' : 'hidden';    
    return;
}

// Función para copiar en el portapapeles el texto procesado
function copiarTexto() {
    navigator.clipboard.writeText(document.getElementById("textoResultante").value);        
    asignarTexto("contenido__mensaje__error","Texto copiado en el portapapeles");
    isVisible("alerta", true);
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
    isVisible("alerta", true); 
    isVisible("parrafo1", true);  
    asignarTexto("contenido__mensaje__error","Ingrese un texto");
    textoIngresado = "";
    return;
}

// Función para ocultar los elementos de la página cuando se termina el proceso 
function ocultarElementos() {
    document.getElementById("imgLaptop").style.visibility = 'hidden';
    document.getElementById("parrafo1").style.visibility = 'hidden';
    document.getElementById("parrafo2").style.visibility = 'hidden';
    document.getElementById("btnCopiar").style.visibility = 'visible';
    isVisible("alerta", false); 
    isVisible("parrafo1", false);  
    return;
}
