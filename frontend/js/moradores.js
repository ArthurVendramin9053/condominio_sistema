const moradorForm = document.getElementById('moradorForm');
const nomeInput = document.getElementById('nomeMorador');
const apartamentoInput = document.getElementById('apartamentoMorador');
const telefoneInput = document.getElementById('telefoneMorador');
const moradoresTableBody = document.getElementById('moradoresTableBody');

let moradores = [];

function renderMoradores() {
    moradoresTableBody.innerHTML = '';
    moradores.forEach((morador, index) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = index + 1;
        row.appendChild(idCell);

        const nomeCell = document.createElement('td');
        nomeCell.textContent = morador.nome;
        row.appendChild(nomeCell);

        const aptCell = document.createElement('td');
        aptCell.textContent = morador.apartamento;
        row.appendChild(aptCell);

        const telCell = document.createElement('td');
        telCell.textContent = morador.telefone;
        row.appendChild(telCell);

        const actionsCell = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => editMorador(index);
        actionsCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.onclick = () => deleteMorador(index);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(actionsCell);
        moradoresTableBody.appendChild(row);
    });
}

function editMorador(index) {
    const novoNome = prompt('Digite o nome:', moradores[index].nome);
    const novoApt = prompt('Digite o apartamento:', moradores[index].apartamento);
    const novoTel = prompt('Digite o telefone:', moradores[index].telefone);
    if (novoNome && novoApt) {
        moradores[index] = { nome: novoNome, apartamento: novoApt, telefone: novoTel };
        renderMoradores();
    }
}

function deleteMorador(index) {
    if (confirm('Tem certeza que deseja excluir este morador?')) {
        moradores.splice(index, 1);
        renderMoradores();
    }
}

moradorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const apartamento = apartamentoInput.value.trim();
    const telefone = telefoneInput.value.trim();

    if (nome === '' || apartamento === '') {
        alert('Nome e apartamento são obrigatórios.');
        return;
    }

    moradores.push({ nome, apartamento, telefone });
    nomeInput.value = '';
    apartamentoInput.value = '';
    telefoneInput.value = '';
    renderMoradores();
});

renderMoradores();
