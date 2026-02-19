import { form, getEl } from './utils.js';
import { FormUsuario } from './classes.js';

const formUsuario = new FormUsuario();

// "Escuta" o evento submit e cadastra usuario quando ocorre
form.addEventListener('submit', evt => {
    evt.preventDefault();
    const nome = form.elements.nome.value;
    const email = form.elements.email.value;
    const senha = form.elements.senha.value;
    if (!(nome && email && senha)) return;

    const usuario = {
        nome: nome,
        email: email,
        senha: senha,
    };
    formUsuario.cadastrarUsuario(usuario);
    getEl('nome').focus();
    form.reset();
});

// Lista usuarios cadastrados no CrudCrud
getEl('listarUsuarios').addEventListener('click', formUsuario.listarUsuarios);
