const apartamentoForm = document.getElementById('apartamentoForm');
const blocoInput = document.getElementById('blocoApartamento');
const numeroInput = document.getElementById('numeroApartamento');
const andarInput = document.getElementById('andarApartamento');
const apartamentosTableBody = document.getElementById('apartamentosTableBody');

let apartamentos = [];

function renderApartamentos() {
    apartamentosTableBody.innerHTML = '';
    apartamentos.forEach((apt, index) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = index + 1;
        row.appendChild(idCell);

        const blocoCell = document.createElement('td');
        blocoCell.textContent = apt.bloco;
        row.appendChild(blocoCell);

        const numeroCell = document.createElement('td');
        numeroCell.textContent = apt.numero;
        row.appendChild(numeroCell);

        const andarCell = document.createElement('td');
        andarCell.textContent = apt.andar;
        row.appendChild(andarCell);

        const actionsCell = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => editApartamento(index);
        actionsCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.onclick = () => deleteApartamento(index);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(actionsCell);
        apartamentosTableBody.appendChild(row);
    });
}

function editApartamento(index) {
    const novoBloco = prompt('Digite o bloco:', apartamentos[index].bloco);
    const novoNumero = prompt('Digite o número:', apartamentos[index].numero);
    const novoAndar = prompt('Digite o andar:', apartamentos[index].andar);
    if (novoBloco && novoNumero && novoAndar) {
        apartamentos[index] = { bloco: novoBloco, numero: novoNumero, andar: novoAndar };
        renderApartamentos();
    }
}

function deleteApartamento(index) {
    if (confirm('Tem certeza que deseja excluir este apartamento?')) {
        apartamentos.splice(index, 1);
        renderApartamentos();
    }
}

apartamentoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const bloco = blocoInput.value.trim();
    const numero = numeroInput.value.trim();
    const andar = andarInput.value.trim();

    if (bloco === '' || numero === '' || andar === '') {
        alert('Todos os campos são obrigatórios.');
        return;
    }

    apartamentos.push({ bloco, numero, andar });
    blocoInput.value = '';
    numeroInput.value = '';
    andarInput.value = '';
    renderApartamentos();
});

renderApartamentos();
