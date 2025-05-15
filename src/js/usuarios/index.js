import { Dropdown } from "bootstrap";
import Swal from "sweetalert2";

const formUsuarios = document.getElementById('formUsuarios');

const BtnGuardar = document.getElementById('BtnGuardar');
const BtnModificar = document.getElementById('BtnModificar');

const InputUsuarioTelefono = document.getElementById('usuario_telefono');
const usuario_nit = document.getElementById('usuario_nit');

// Función para validar NIT (fuera de ValidarTelefono)
function validarNit() {
    const nitValue = usuario_nit.value.trim();
    let nd, add = 0;
    
    if (nd = /^(\d+)\-?([\dkK])$/.exec(nitValue)) {
        nd[2] = (nd[2].toLowerCase() === 'k') ? 10 : parseInt(nd[2]);
        for (let i = 0; i < nd[1].length; i++) {
            add += (((i - nd[1].length) * -1) + 1) * nd[1][i];
        }
        
        const esValido = ((11 - (add % 11)) % 11) === nd[2];
        
        if (esValido) {
            usuario_nit.classList.remove('is-invalid');
            usuario_nit.classList.add('is-valid');
        } else {
            usuario_nit.classList.remove('is-valid');
            usuario_nit.classList.add('is-invalid');
            Swal.fire({
                title: "NIT inválido",
                text: "El NIT ingresado no es válido",
                icon: "error"
            });
        }
        
        return esValido;
    } else {
        if (nitValue.length > 0) {
            usuario_nit.classList.remove('is-valid');
            usuario_nit.classList.add('is-invalid');
            Swal.fire({
                title: "Formato de NIT inválido",
                text: "El formato del NIT no es correcto",
                icon: "error"
            });
        } else {
            usuario_nit.classList.remove('is-valid', 'is-invalid');
        }
        return false;
    }
}

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

// Configurar eventos
InputUsuarioTelefono.addEventListener('change', ValidarTelefono);
usuario_nit.addEventListener('change', validarNit);