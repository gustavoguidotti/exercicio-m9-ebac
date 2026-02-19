import { getEl } from './utils.js';

export class FormUsuario {
    #apiURL;
    #listaUsuarios;
    constructor() {
        this.#apiURL = `https://crudcrud.com/api/0192562780f54774bc091c7d5e65505a/usuarios`;
        this.#listaUsuarios = getEl('listaUsuarios');
    }

    cadastrarUsuario = async usuario => {
        try {
            const res = await fetch(this.#apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });

            if (!res.ok) {
                throw new Error('Erro ao cadastrar usuario.');
            }
            return await res.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    excluirUsuario = async id => {
        try {
            const res = await fetch(`${this.#apiURL}/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Erro ao excluir usuario');
            }
            getEl(id)?.remove();
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    listarUsuarios = async () => {
        try {
            const res = await fetch(this.#apiURL);
            if (!res.ok) {
                throw new Error('Erro ao listar usuarios.');
            }
            const usuarios = await res.json();

            this.#listaUsuarios.innerHTML = '';

            usuarios.forEach(usuario => this.#renderUsuario(usuario));
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    #renderUsuario(usuario) {
        const item = document.createElement('li');
        item.id = usuario._id;

        item.innerHTML = `
                Nome: ${usuario.nome}<br>
                E-mail: ${usuario.email}
                <button>X</button>`;

        this.#listaUsuarios.appendChild(item);

        item.querySelector('button').addEventListener('click', () =>
            this.excluirUsuario(usuario._id),
        );
    }
}
