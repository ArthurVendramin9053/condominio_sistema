const manutencaoForm = document.getElementById('manutencaoForm');
const nomeInput = document.getElementById('nomeManutencao');
const descricaoInput = document.getElementById('descricaoManutencao');
const manutencaoTableBody = document.getElementById('manutencaoTableBody');

let manutencoes = [];

function renderManutencoes() {
    manutencaoTableBody.innerHTML = '';
    manutencoes.forEach((manut, index) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = index + 1;
        row.appendChild(idCell);

        const nomeCell = document.createElement('td');
        nomeCell.textContent = manut.nome;
        row.appendChild(nomeCell);

        const descCell = document.createElement('td');
        descCell.textContent = manut.descricao;
        row.appendChild(descCell);

        const actionsCell = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => editManutencao(index);
        actionsCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.onclick = () => deleteManutencao(index);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(actionsCell);
        manutencaoTableBody.appendChild(row);
    });
}

function editManutencao(index) {
    const novoNome = prompt('Nome:', manutencoes[index].nome);
    const novaDesc = prompt('Descrição:', manutencoes[index].descricao);

    if (novoNome) {
        manutencoes[index] = { nome: novoNome, descricao: novaDesc };
        renderManutencoes();
    }
}

function deleteManutencao(index) {
    if (confirm('Tem certeza que deseja excluir este tipo de manutenção?')) {
        manutencoes.splice(index, 1);
        renderManutencoes();
    }
}

manutencaoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const descricao = descricaoInput.value.trim();

    if (nome === '') {
        alert('O nome é obrigatório.');
        return;
    }

    manutencoes.push({ nome, descricao });
    nomeInput.value = '';
    descricaoInput.value = '';
    renderManutencoes();
});

renderManutencoes();
