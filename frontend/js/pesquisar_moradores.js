let moradores = [];

window.onload = () => {
  fetch("http://localhost:3000/api/moradores")
    .then(res => res.json())
    .then(data => {
      moradores = data;
      carregarTabela(moradores);
    })
    .catch(err => {
      console.error("Erro ao carregar moradores:", err);
      alert("Erro ao carregar moradores.");
    });
};

function carregarTabela(lista) {
  const tabela = document.getElementById("tabela-moradores");
  tabela.innerHTML = "";

  lista.forEach((morador) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td onclick="consultarMorador(${morador.id})" style="cursor:pointer;">${morador.cpf}</td>
      <td>${morador.nome}</td>
      <td>${morador.apartamento}</td>
      <td>${morador.bloco}</td>
      <td>
        <button onclick="alterarMorador(${morador.id})">Alterar</button>
        <button onclick="excluirMorador(${morador.id})">Excluir</button>
      </td>
    `;

    tabela.appendChild(linha);
  });
}

function filtrarMoradores() {
  const termo = document.getElementById("pesquisa").value.toLowerCase();
  const filtrados = moradores.filter((m) =>
    m.nome.toLowerCase().includes(termo) ||
    m.cpf.includes(termo) ||
    m.apartamento.includes(termo) ||
    m.bloco.toLowerCase().includes(termo)
  );
  carregarTabela(filtrados);
}

function novoMorador() {
  window.location.href = "cadastrar_morador.html";
}

function alterarMorador(id) {
  const morador = moradores.find((m) => m.id === id);
  const novoNome = prompt("Novo nome:", morador.nome);
  const novoCpf = prompt("Novo CPF:", morador.cpf);
  const novoApartamento = prompt("Novo apartamento:", morador.apartamento);
  const novoBloco = prompt("Novo bloco:", morador.bloco);

  if (!novoNome || !novoCpf || !novoApartamento || !novoBloco) {
    alert("Todos os campos são obrigatórios.");
    return;
  }

  morador.nome = novoNome;
  morador.cpf = novoCpf;
  morador.apartamento = novoApartamento;
  morador.bloco = novoBloco;

  alert("Morador alterado com sucesso!");
  carregarTabela(moradores);
}

function excluirMorador(id) {
  const confirmar = confirm("Deseja realmente excluir este morador?");
  if (!confirmar) return;

  moradores = moradores.filter((m) => m.id !== id);
  alert("Morador excluído com sucesso!");
  carregarTabela(moradores);
}

function consultarMorador(id) {
  const m = moradores.find((m) => m.id === id);
  alert(`Consulta de Morador:\n\nNome: ${m.nome}\nCPF: ${m.cpf}\nApartamento: ${m.apartamento}\nBloco: ${m.bloco}`);
}

function voltar() {
  window.location.href = "dashboard.html";
}
