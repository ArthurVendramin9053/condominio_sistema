let blocos = [
    { id: 1, nome: "Bloco A", apartamentos: 12 },
    { id: 2, nome: "Bloco B", apartamentos: 8 }
  ];
  
=  const params = new URLSearchParams(window.location.search);
  const modo = params.get("modo") || "novo";
  const id = parseInt(params.get("id"));
  
  window.onload = () => {
    const titulo = document.getElementById("titulo-operacao");
  
    if (modo === "consultar" || modo === "alterar") {
      const bloco = blocos.find((b) => b.id === id);
      if (bloco) {
        document.getElementById("descricao").value = bloco.nome;
        document.getElementById("quantidade").value = bloco.apartamentos;
        titulo.textContent = modo === "consultar" ? "Consultar Bloco" : "Alterar Bloco";
  
        if (modo === "consultar") {
          document.getElementById("descricao").disabled = true;
          document.getElementById("quantidade").disabled = true;
          document.querySelector("button[type='submit']").style.display = "none";
        }
      }
    }
  };
  
  document.getElementById("form-bloco").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const nome = document.getElementById("descricao").value.trim();
    const quantidade = document.getElementById("quantidade").value.trim();
  
    if (!nome || !quantidade) {
      alert("Não pode ficar em branco");
      return;
    }
  
    if (
      modo === "novo" &&
      blocos.some((b) => b.nome.toLowerCase() === nome.toLowerCase())
    ) {
      alert("O bloco já está cadastrado no sistema");
      return;
    }
  
    if (modo === "novo") {
      blocos.push({
        id: blocos.length + 1,
        nome,
        apartamentos: parseInt(quantidade)
      });
      alert("Dados salvos com sucesso");
    } else if (modo === "alterar") {
      const bloco = blocos.find((b) => b.id === id);
      bloco.nome = nome;
      bloco.apartamentos = parseInt(quantidade);
      alert("Dados atualizados com sucesso");
    }
  
    voltar();
  });
  
function voltar() {
  window.location.href = "dashboard.html";
}