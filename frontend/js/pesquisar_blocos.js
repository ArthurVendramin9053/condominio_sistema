const blocos = [
  { id: 1, descricao: "Bloco A", qtd_apartamentos: 10 },
  { id: 2, descricao: "Bloco B", qtd_apartamentos: 8 },
  { id: 3, descricao: "Bloco C", qtd_apartamentos: 12 }
];

function carregarTabela() {
  const tbody = document.querySelector('#tabelaBlocos tbody');
  tbody.innerHTML = '';

  blocos.forEach(bloco => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${bloco.id}</td>
      <td>${bloco.descricao}</td>
      <td>${bloco.qtd_apartamentos}</td>
    `;
    tbody.appendChild(linha);
  });
}

function filtrarBlocos() {
  const termo = document.getElementById('pesquisaBloco').value.toLowerCase();
  const linhas = document.querySelectorAll('#tabelaBlocos tbody tr');

  linhas.forEach(linha => {
    const texto = linha.textContent.toLowerCase();
    linha.style.display = texto.includes(termo) ? '' : 'none';
  });
}

function novoBloco() {
  window.location.href = 'manter_bloco.html?modo=novo';
}

function voltar() {
  window.history.back();
}

document.getElementById('pesquisaBloco').addEventListener('input', filtrarBlocos);
document.getElementById('btnNovo').addEventListener('click', novoBloco);
document.getElementById('btnVoltar').addEventListener('click', voltar);

window.onload = carregarTabela;