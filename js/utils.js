export const getEl = el => document.getElementById(el);
export const form = document.querySelector('form');

const listaUsuarios = getEl('listaUsuarios');
const URL = `https://crudcrud.com/api/ad10a0476dea44f09c76cd273d769429/usuarios`;

// Helper function para cadastrar usuario no CrudCrud
export const cadastrarUsuario = async usuario => {
    try {
        const res = await fetch(URL, {
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
    }
};

// Deleta usuario do CrudCrud e remove elemento HTML correspondente
const excluir = async id => {
    getEl(id)?.remove();
    try {
        const res = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error('Erro ao excluir usuario');
        }
    } catch (error) {
        console.error(error);
    }
};

export const listarUsuarios = async () => {
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error('Erro ao listar usuarios.');
        }
        const usuarios = await res.json();

        listaUsuarios.innerHTML = '';

        usuarios.forEach(usuario => {
            const item = document.createElement('li');
            item.id = usuario._id;

            item.innerHTML = `
                Nome: ${usuario.nome}<br>
                E-mail: ${usuario.email}
                <button>X</button>`;

            listaUsuarios.appendChild(item);

            item.querySelector('button').addEventListener('click', () =>
                excluir(usuario._id),
            );
        });
    } catch (error) {
        console.error(error);
    }
};
