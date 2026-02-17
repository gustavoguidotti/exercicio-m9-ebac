export const getEl = el => document.getElementById(el);
export const form = document.querySelector('form');

const listaUsuarios = getEl('listaUsuarios');

// Helper function para cadastrar usuario no CrudCrud
export const cadastrarUsuario = usuario => {
    fetch(
        'https://crudcrud.com/api/2f87b6cf02024ea5a4cac74258c272eb/usuarios',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        },
    ).catch(error => {
        console.error('Erro ao cadastrar usuario.', error);
    });
};

// Deleta usuario do CrudCrud e remove elemento HTML correspondente
const excluir = id => {
    fetch(
        `https://crudcrud.com/api/2f87b6cf02024ea5a4cac74258c272eb/usuarios/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    ).then(() => {
        getEl(id).remove();
    });
};

export const listarUsuarios = () => {
    fetch('https://crudcrud.com/api/2f87b6cf02024ea5a4cac74258c272eb/usuarios')
        .then(res => res.json())
        .then(usuarios => {
            listaUsuarios.innerHTML = '';
            usuarios.forEach(usuario => {
                const item = document.createElement('li');
                item.id = usuario._id;
                item.innerHTML = `Nome: ${usuario.nome}<br>
                E-mail: ${usuario.email}
                <button id="button-${usuario._id}">X</button>`;
                listaUsuarios.appendChild(item);
                getEl(`button-${usuario._id}`).addEventListener('click', () =>
                    excluir(usuario._id),
                );
            });
        });
};
