const blocoForm = document.getElementById('blocoForm');
const nomeBlocoInput = document.getElementById('nomeBloco');
const blocosTableBody = document.getElementById('blocosTableBody');

let blocos = [];

function renderBlocos() {
    blocosTableBody.innerHTML = '';
    blocos.forEach((bloco, index) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = index + 1;
        row.appendChild(idCell);

        const nomeCell = document.createElement('td');
        nomeCell.textContent = bloco.nome;
        row.appendChild(nomeCell);

        const actionsCell = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => editBloco(index);
        actionsCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.onclick = () => deleteBloco(index);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(actionsCell);
        blocosTableBody.appendChild(row);
    });
}

function editBloco(index) {
    const novoNome = prompt('Digite o novo nome do bloco:', blocos[index].nome);
    if (novoNome) {
        blocos[index].nome = novoNome;
        renderBlocos();
    }
}

function deleteBloco(index) {
    if (confirm('Tem certeza que deseja excluir este bloco?')) {
        blocos.splice(index, 1);
        renderBlocos();
    }
}

blocoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = nomeBlocoInput.value.trim();
    if (nome === '') {
        alert('O nome do bloco é obrigatório.');
        return;
    }
    blocos.push({ nome });
    nomeBlocoInput.value = '';
    renderBlocos();
});

renderBlocos();
