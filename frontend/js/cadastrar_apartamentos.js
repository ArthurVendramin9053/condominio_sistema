// Recebe parâmetro da tela anterior (ex: bloco pré-selecionado)
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const blocoParam = params.get("bloco");
  
    if (blocoParam) {
      document.getElementById("bloco").value = blocoParam;
    }
  };
  
  // Salva os dados do apartamento
  document.getElementById("form-apartamento").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const bloco = document.getElementById("bloco").value;
    const numero = document.getElementById("numero").value;
  
    if (!bloco || !numero) {
      alert("Todos os campos são obrigatórios.");
      return;
    }
  
    // Simulação de salvamento (poderia ser localStorage, API, etc.)
    alert(`Apartamento cadastrado com sucesso!\n\nBloco: ${bloco}\nNúmero: ${numero}`);
  
    // Redireciona para tela anterior
    window.location.href = "apartamentos.html";
  });
  
  // Voltar à tela anterior
  function voltar() {
    window.location.href = "dashboard.html";
  }
  