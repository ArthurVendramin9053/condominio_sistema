const moradores = [
    { apartamento: "101", cpf: "001.592.453-01", nome: "João da Silva", telefone: "(47) 99999-1111" },
    { apartamento: "201", cpf: "022.672.123-44", nome: "Maria Santos", telefone: "(47) 98888-2222" },
    { apartamento: "301", cpf: "033.891.765-88", nome: "Carlos Oliveira", telefone: "(47) 97777-3333" }
  ];
  
  const referencias = [];
  const anoAtual = new Date().getFullYear();
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  meses.forEach((mes, i) => {
    const vencimento = new Date(anoAtual, i, 10).toISOString().split("T")[0];
    referencias.push({
      mes: mes,
      ano: anoAtual,
      valor: 250.00,
      vencimento: vencimento
    });
  });
  
  window.addEventListener("DOMContentLoaded", () => {
    const combo = document.getElementById("referencia");
    referencias.forEach((ref, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${ref.mes}/${ref.ano}`;
      combo.appendChild(option);
    });
  
    combo.addEventListener("change", preencherValorEVencimento);
    document.getElementById("apartamento").addEventListener("blur", preencherMorador);
  });
  
  function preencherValorEVencimento() {
    const index = document.getElementById("referencia").value;
    const ref = referencias[index];
    if (ref) {
      document.getElementById("valor").value = `R$ ${ref.valor.toFixed(2)}`;
      document.getElementById("vencimento").value = ref.vencimento;
    }
  }
  
  function preencherMorador() {
    const apt = document.getElementById("apartamento").value.trim();
    const morador = moradores.find(m => m.apartamento === apt);
  
    if (!morador) {
      alert("Apartamento não cadastrado.");
      document.getElementById("cpf").value = "";
      document.getElementById("nome").value = "";
      document.getElementById("telefone").value = "";
      return;
    }
  
    document.getElementById("cpf").value = morador.cpf;
    document.getElementById("nome").value = morador.nome;
    document.getElementById("telefone").value = morador.telefone;
  }
  
  document.getElementById("form-pagamento").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const apt = document.getElementById("apartamento").value.trim();
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const valor = document.getElementById("valor").value;
    const vencimento = document.getElementById("vencimento").value;
    const ref = document.getElementById("referencia").selectedOptions[0].textContent;
  
    if (!apt || !cpf || !nome || !telefone || !valor || !vencimento) {
      alert("Preencha todos os campos corretamente.");
      return;
    }
  
    alert(`✅ Pagamento registrado com sucesso!\n\nMorador: ${nome}\nApartamento: ${apt}\nReferência: ${ref}\nValor: ${valor}\nVencimento: ${vencimento}`);
    voltar();
  });
  
  function voltar() {
    window.location.href = "dashboard.html";
  }
  