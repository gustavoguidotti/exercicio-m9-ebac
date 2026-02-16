const getEl = el => document.getElementById(el);

const nomeInput = getEl('nome');
const emailInput = getEl('email');
const senhaInput = getEl('senha');
const listaUsuarios = getEl('listaUsuarios');

// Cadastra usuario ao clicar no botao cadastrar
document.getEl('cadastrar').addEventListener('click', () => {
    if (!(nomeInput.value && emailInput.value && senhaInput.value)) return;

    const usuario = {
        nome: nomeInput.value,
        email: emailInput.value,
        senha: senhaInput.value,
    };
    cadastrarUsuario(usuario);
    limparCampos();
});

// Cadastra usuario ao pressionar Enter
document.addEventListener('keydown', evt => {
    if (
        !(nomeInput.value && emailInput.value && senhaInput.value) ||
        evt.key !== 'Enter'
    )
        return;

    const usuario = {
        nome: nomeInput.value,
        email: emailInput.value,
        senha: senhaInput.value,
    };
    cadastrarUsuario(usuario);
    limparCampos();
});

// Helper function para cadastrar usuario no CrudCrud
const cadastrarUsuario = usuario => {
    fetch(
        'https://crudcrud.com/api/500901cb8af64de8b4799524a3efb641/usuarios',
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

const limparCampos = () => {
    nomeInput.value = '';
    emailInput.value = '';
    senhaInput.value = '';
};

// Lista usuarios cadastrados no CrudCrud
document.getElementById('listarUsuarios').addEventListener('click', () => {
    fetch('https://crudcrud.com/api/500901cb8af64de8b4799524a3efb641/usuarios')
        .then(res => res.json())
        .then(usuarios => {
            listaUsuarios.innerHTML = '';
            usuarios.forEach(usuario => {
                const item = document.createElement('li');
                item.id = usuario._id;
                item.innerHTML = `Nome: ${usuario.nome}<br>
                E-mail: ${usuario.email}
                <button onclick="excluir('${usuario._id}')">X</button>`;
                listaUsuarios.appendChild(item);
            });
        });
});

// Deleta usuario do CrudCrud e remove elemento HTML correspondente
const excluir = id => {
    fetch(
        `https://crudcrud.com/api/500901cb8af64de8b4799524a3efb641/usuarios/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    ).then(() => {
        document.getElementById(id).remove();
    });
};
