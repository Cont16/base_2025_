alert('Bienvenido al sistema! 🫡')
import { Dropdown } from "bootstrap";
import Swal from "sweetalert2";
import {validarFormulario} from '../funciones'

const FormUsuarios = document.getElementById('FormUsuarios');
const BtnGuardar = document.getElementById('BtnGuardar');
const BtnModificar = document.getElementById('BtnModificar');
const InputUsuarioTelefono = document.getElementById('usuario_telefono');
const usuario_nit = document.getElementById('usuario_nit');



//funcion telefono
const ValidarTelefono = () => {
    const CantidadDigitos = InputUsuarioTelefono.value;

    if (CantidadDigitos.length < 1) {
        InputUsuarioTelefono.classList.remove('is-valid', 'is-invalid');
    } else {
        if (CantidadDigitos.length != 8) {
            Swal.fire({
                title: "Error en la cantidad de dígitos en el teléfono",
                text: "El teléfono debe tener 8 dígitos",
                icon: "error"
            });
            InputUsuarioTelefono.classList.remove('is-valid');
            InputUsuarioTelefono.classList.add('is-invalid');
        } else {
            InputUsuarioTelefono.classList.remove('is-invalid');
            InputUsuarioTelefono.classList.add('is-valid');
        }
    }
}

// Función para validar NIT (fuera de ValidarTelefono)
function validarNit() {
    const nit = usuario_nit.value.trim();
    
    let nd, add = 0;
    
    if (nd = /^(\d+)-?([\dkK])$/.exec(nit)) {
        nd[2] = (nd[2].toLowerCase() === 'k') ? 10 : parseInt(nd[2], 10);
        
        for (let i = 0; i < nd[1].length; i++) {
            add += (((i - nd[1].length) * -1) + 1) * parseInt(nd[1][i], 10);
        }
        return ((11 - (add % 11)) % 11) === nd[2];
    } else {
        return false;
    }
}

const EsValidoNit = () => {
    validarNit();
    
    if (validarNit()) {
        usuario_nit.classList.add('is-valid');
        usuario_nit.classList.remove('is-invalid');
    } else {
        usuario_nit.classList.remove('is-valid');
        usuario_nit.classList.add('is-invalid');
        
        Swal.fire({
            position: "center",
            icon: "error",
            title: "NIT INVALIDO",
            text: "El numero de nit ingresado es invalido",
            showConfirmButton: true,
        });
    }
};

const GuardarUsuario = async (e) => {
    e.preventDefault();
    BtnGuardar.disabled = true;

    if(!validarFormulario(FormUsuarios, ['usuario_id'])){
        Swal.fire({
            position: "center",
            icon: "info",
            title: "FORMULARIO INCOMPLETO",
            text: "debe validar todos los campos",
            showConfirmButton: true,
        });
        BtnGuardar.disabled = false;
    }
    const body = new FormData(FormUsuarios)


    const url = '/base_contreras/usuarios/guardarAPI';
    const config = {
        method : 'POST',
        body
    }

    

    try {
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();
        console.log(datos)
    } catch (error) {
        console.log(error)
        
    }
}

FormUsuarios.addEventListener('submit', GuardarUsuario);
usuario_nit.addEventListener('change', EsValidoNit);
InputUsuarioTelefono.addEventListener('change', ValidarTelefono);