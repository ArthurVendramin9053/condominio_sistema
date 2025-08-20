let moradores = [
    {
      id: 1,
      cpf: "001.592.453-01",
      nome: "João da Silva",
      apartamento: "101",
      bloco: "Bloco A"
    },
    {
      id: 2,
      cpf: "022.672.123-44",
      nome: "Maria Santos",
      apartamento: "201",
      bloco: "Bloco B"
    },
    {
      id: 3,
      cpf: "033.891.765-88",
      nome: "Carlos Oliveira",
      apartamento: "301",
      bloco: "Bloco C"
    },
    {
      id: 4,
      cpf: "044.123.456-99",
      nome: "Ana Beatriz",
      apartamento: "102",
      bloco: "Bloco A"
    },
    {
      id: 5,
      cpf: "055.987.654-00",
      nome: "Pedro Henrique",
      apartamento: "202",
      bloco: "Bloco B"
    },
    {
      id: 6,
      cpf: "066.111.222-33",
      nome: "Fernanda Lima",
      apartamento: "302",
      bloco: "Bloco C"
    },
    {
      id: 7,
      cpf: "077.333.444-55",
      nome: "Lucas Martins",
      apartamento: "401",
      bloco: "Bloco D"
    },
    {
      id: 8,
      cpf: "088.555.666-77",
      nome: "Juliana Costa",
      apartamento: "402",
      bloco: "Bloco D"
    },
    {
      id: 9,
      cpf: "099.777.888-99",
      nome: "Rafael Souza",
      apartamento: "501",
      bloco: "Bloco E"
    },
    {
      id: 10,
      cpf: "100.000.111-22",
      nome: "Camila Rocha",
      apartamento: "502",
      bloco: "Bloco E"
    }
  ];
  
  window.onload = () => {
    carregarTabela(moradores);
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
    const nome = prompt("Nome do morador:");
    const cpf = prompt("CPF:");
    const apartamento = prompt("Número do apartamento:");
    const bloco = prompt("Bloco:");
  
    if (!nome || !cpf || !apartamento || !bloco) {
      alert("Todos os campos são obrigatórios.");
      return;
    }
  
    moradores.push({
      id: moradores.length + 1,
      nome,
      cpf,
      apartamento,
      bloco
    });
  
    alert("Morador cadastrado com sucesso!");
    carregarTabela(moradores);
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
  