let apartamentos = [
    { id: 1, bloco: "Bloco A", numero: "101" },
    { id: 2, bloco: "Bloco A", numero: "102" },
    { id: 3, bloco: "Bloco A", numero: "103" },
    { id: 4, bloco: "Bloco B", numero: "201" },
    { id: 5, bloco: "Bloco B", numero: "202" },
    { id: 6, bloco: "Bloco C", numero: "301" },
    { id: 7, bloco: "Bloco C", numero: "302" },
    { id: 8, bloco: "Bloco D", numero: "401" },
    { id: 9, bloco: "Bloco D", numero: "402" },
    { id: 10, bloco: "Bloco E", numero: "501" }
  ];
  
  window.onload = () => {
    carregarTabela(apartamentos);
  };
  
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
  
    if (
      apartamentos.some(
        (a) => a.bloco.toLowerCase() === bloco.toLowerCase() && a.numero === numero
      )
    ) {
      alert("Este apartamento já está cadastrado.");
      return;
    }
  
    apartamentos.push({
      id: apartamentos.length + 1,
      bloco,
      numero
    });
  
    alert("Apartamento cadastrado com sucesso!");
    carregarTabela(apartamentos);
  }
  
  function alterarApartamento(id) {
    const apt = apartamentos.find((a) => a.id === id);
    const novoBloco = prompt("Novo bloco:", apt.bloco);
    const novoNumero = prompt("Novo número:", apt.numero);
  
    if (!novoBloco || !novoNumero) {
      alert("Todos os campos são obrigatórios.");
      return;
    }
  
    apt.bloco = novoBloco;
    apt.numero = novoNumero;
    alert("Apartamento alterado com sucesso!");
    carregarTabela(apartamentos);
  }
  
  function excluirApartamento(id) {
    const confirmar = confirm("Deseja realmente excluir este apartamento?");
    if (!confirmar) return;
  
    apartamentos = apartamentos.filter((a) => a.id !== id);
    alert("Apartamento excluído com sucesso!");
    carregarTabela(apartamentos);
  }
  
  function consultarApartamento(id) {
    const apt = apartamentos.find((a) => a.id === id);
    alert(`Consulta de Apartamento:\n\nBloco: ${apt.bloco}\nNúmero: ${apt.numero}`);
  }
  
  function voltar() {
    window.location.href = "dashboard.html";
  }
  