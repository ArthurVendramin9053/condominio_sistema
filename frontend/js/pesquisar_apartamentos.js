let apartamentos = [];

window.onload = () => {
  carregarApartamentos();
};

function carregarApartamentos() {
  fetch("http://localhost:3000/api/apartamentos")
    .then(res => res.json())
    .then(data => {
      apartamentos = data;
      carregarTabela(apartamentos);
    })
    .catch(err => {
      alert("Erro ao carregar apartamentos.");
      console.error(err);
    });
}

function carregarTabela(lista) {
  const tabela = document.getElementById("tabela-apartamentos");
  tabela.innerHTML = "";

  lista.forEach((apt) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td onclick="consultarApartamento(${apt.id})" style="cursor:pointer;">${apt.bloco}</td>
      <td>${apt.numero}</td>
      <td>
        <button onclick="alterarApartamento(${apt.id})">Alterar</button>
        <button onclick="excluirApartamento(${apt.id})">Excluir</button>
      </td>
    `;

    tabela.appendChild(linha);
  });
}

function filtrarApartamentos() {
  const termo = document.getElementById("pesquisa").value.toLowerCase();
  const filtrados = apartamentos.filter((a) =>
    a.bloco.toLowerCase().includes(termo) || a.numero.includes(termo)
  );
  carregarTabela(filtrados);
}

function novoApartamento() {
  const bloco = prompt("Informe o bloco:");
  const numero = prompt("Informe o número do apartamento:");

  if (!bloco || !numero) {
    alert("Todos os campos são obrigatórios.");
    return;
  }

  fetch("http://localhost:3000/api/apartamentos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bloco, numero })
  })
    .then(res => {
      if (res.status === 409) throw new Error("Apartamento já cadastrado.");
      if (!res.ok) throw new Error("Erro ao cadastrar.");
      return res.json();
    })
    .then(() => {
      alert("Apartamento cadastrado com sucesso!");
      carregarApartamentos();
    })
    .catch(err => {
      alert(err.message);
      console.error(err);
    });
}

function alterarApartamento(id) {
  const apt = apartamentos.find((a) => a.id === id);
  const novoBloco = prompt("Novo bloco:", apt.bloco);
  const novoNumero = prompt("Novo número:", apt.numero);

  if (!novoBloco || !novoNumero) {
    alert("Todos os campos são obrigatórios.");
    return;
  }

  fetch(`http://localhost:3000/api/apartamentos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bloco: novoBloco, numero: novoNumero })
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao atualizar.");
      return res.json();
    })
    .then(() => {
      alert("Apartamento alterado com sucesso!");
      carregarApartamentos();
    })
    .catch(err => {
      alert(err.message);
      console.error(err);
    });
}

function excluirApartamento(id) {
  const confirmar = confirm("Deseja realmente excluir este apartamento?");
  if (!confirmar) return;

  fetch(`http://localhost:3000/api/apartamentos/${id}`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao excluir.");
      return res.json();
    })
    .then(() => {
      alert("Apartamento excluído com sucesso!");
      carregarApartamentos();
    })
    .catch(err => {
      alert(err.message);
      console.error(err);
    });
}

function consultarApartamento(id) {
  const apt = apartamentos.find((a) => a.id === id);
  alert(`Consulta de Apartamento:\n\nBloco: ${apt.bloco}\nNúmero: ${apt.numero}`);
}

function voltar() {
  window.location.href = "dashboard.html";
}
