// Recebe parâmetro da tela anterior (ex: apartamento ou bloco pré-selecionado)
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const apt = params.get("apartamento");
    const bloco = params.get("bloco");
  
    if (apt) document.getElementById("apartamento").value = apt;
    if (bloco) document.getElementById("bloco").value = bloco;
  };
  
  // Salva os dados do morador
  document.getElementById("form-morador").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const morador = {
      cpf: document.getElementById("cpf").value,
      nome: document.getElementById("nome").value,
      telefone: document.getElementById("telefone").value,
      apartamento: document.getElementById("apartamento").value,
      bloco: document.getElementById("bloco").value,
      responsavel: document.querySelector('input[name="responsavel"]:checked')?.value,
      proprietario: document.querySelector('input[name="proprietario"]:checked')?.value,
      veiculo: document.querySelector('input[name="veiculo"]:checked')?.value,
      vagas: document.getElementById("vagas").value,
      numeroVaga: document.getElementById("numero-vaga").value,
      placa: document.getElementById("placa").value,
      marca: document.getElementById("marca").value,
      modelo: document.getElementById("modelo").value
    };
  
    if (!morador.cpf || !morador.nome || !morador.telefone || !morador.apartamento || !morador.bloco) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
  
    // Simulação de salvamento
    console.log("Morador cadastrado:", morador);
    alert("Morador cadastrado com sucesso!");
  
    // Redireciona para tela anterior
    window.location.href = "pesquisar_moradores.html";
  });
  
  // Voltar à tela anterior
  function voltar() {
    window.location.href = "dashboard.html";
  }
  