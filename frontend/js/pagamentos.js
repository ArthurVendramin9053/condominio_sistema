const pagamentoForm = document.getElementById('pagamentoForm');
const moradorInput = document.getElementById('moradorPagamento');
const apartamentoInput = document.getElementById('apartamentoPagamento');
const valorInput = document.getElementById('valorPagamento');
const dataInput = document.getElementById('dataPagamento');
const pagamentosTableBody = document.getElementById('pagamentosTableBody');

let pagamentos = [];

function renderPagamentos() {
    pagamentosTableBody.innerHTML = '';
    pagamentos.forEach((pag, index) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = index + 1;
        row.appendChild(idCell);

        const moradorCell = document.createElement('td');
        moradorCell.textContent = pag.morador;
        row.appendChild(moradorCell);

        const aptCell = document.createElement('td');
        aptCell.textContent = pag.apartamento;
        row.appendChild(aptCell);

        const valorCell = document.createElement('td');
        valorCell.textContent = `R$ ${parseFloat(pag.valor).toFixed(2)}`;
        row.appendChild(valorCell);

        const dataCell = document.createElement('td');
        dataCell.textContent = pag.data;
        row.appendChild(dataCell);

        const actionsCell = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => editPagamento(index);
        actionsCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.onclick = () => deletePagamento(index);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(actionsCell);
        pagamentosTableBody.appendChild(row);
    });
}

function editPagamento(index) {
    const novoMorador = prompt('Morador:', pagamentos[index].morador);
    const novoApt = prompt('Apartamento:', pagamentos[index].apartamento);
    const novoValor = prompt('Valor:', pagamentos[index].valor);
    const novaData = prompt('Data (AAAA-MM-DD):', pagamentos[index].data);

    if (novoMorador && novoApt && novoValor && novaData) {
        pagamentos[index] = {
            morador: novoMorador,
            apartamento: novoApt,
            valor: novoValor,
            data: novaData
        };
        renderPagamentos();
    }
}

function deletePagamento(index) {
    if (confirm('Tem certeza que deseja excluir este pagamento?')) {
        pagamentos.splice(index, 1);
        renderPagamentos();
    }
}

pagamentoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const morador = moradorInput.value.trim();
    const apartamento = apartamentoInput.value.trim();
    const valor = valorInput.value.trim();
    const data = dataInput.value;

    if (morador === '' || apartamento === '' || valor === '' || data === '') {
        alert('Todos os campos são obrigatórios.');
        return;
    }

    pagamentos.push({ morador, apartamento, valor, data });
    moradorInput.value = '';
    apartamentoInput.value = '';
    valorInput.value = '';
    dataInput.value = '';
    renderPagamentos();
});

renderPagamentos();
