document.addEventListener('DOMContentLoaded', () => {
    const blocoForm = document.getElementById('blocoForm');
    const nomeBlocoInput = document.getElementById('nomeBloco');
    const blocosTableBody = document.getElementById('blocosTableBody');

    const apiUrl = 'http://localhost:3000/api/blocos';

    function listarBlocos() {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => renderBlocos(data))
            .catch(err => console.error('Erro ao listar blocos:', err));
    }

    function criarBloco(nome) {
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descricao: nome, quantidade_apartamentos: 0 })
        })
        .then(() => listarBlocos())
        .catch(err => console.error('Erro ao criar bloco:', err));
    }

    function editarBloco(id, novoNome) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descricao: novoNome, quantidade_apartamentos: 0 })
        })
        .then(() => listarBlocos())
        .catch(err => console.error('Erro ao editar bloco:', err));
    }

    function excluirBloco(id) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(() => listarBlocos())
        .catch(err => console.error('Erro ao excluir bloco:', err));
    }

    function renderBlocos(blocos) {
        blocosTableBody.innerHTML = '';
        blocos.forEach(bloco => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = bloco.id;
            row.appendChild(idCell);

            const nomeCell = document.createElement('td');
            nomeCell.textContent = bloco.descricao;
            row.appendChild(nomeCell);

            const actionsCell = document.createElement('td');

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.onclick = () => {
                const novoNome = prompt('Digite o novo nome do bloco:', bloco.descricao);
                if (novoNome) editarBloco(bloco.id, novoNome);
            };
            actionsCell.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.onclick = () => {
                if (confirm('Tem certeza que deseja excluir este bloco?')) {
                    excluirBloco(bloco.id);
                }
            };
            actionsCell.appendChild(deleteBtn);

            row.appendChild(actionsCell);
            blocosTableBody.appendChild(row);
        });
    }

    blocoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = nomeBlocoInput.value.trim();
        if (nome === '') {
            alert('O nome do bloco é obrigatório.');
            return;
        }
        criarBloco(nome);
        nomeBlocoInput.value = '';
    });

    listarBlocos();
});