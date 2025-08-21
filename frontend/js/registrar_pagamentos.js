let moradores = [];
let referencias = [];

window.addEventListener("DOMContentLoaded", () => {
  carregarMoradores();
  carregarReferencias();

  document.getElementById("referencia").addEventListener("change", preencherValorEVencimento);
  document.getElementById("apartamento").addEventListener("blur", preencherMorador);
  document.getElementById("form-pagamento").addEventListener("submit", registrarPagamento);
});

function carregarMoradores() {
  fetch("http://localhost:3000/api/pagamentos/moradores")
    .then(res => res.json())
    .then(data => moradores = data)
    .catch(err => console.error("Erro ao carregar moradores:", err));
}

function carregarReferencias() {
  const anoAtual = new Date().getFullYear();
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                 "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  referencias = meses.map((mes, i) => ({
    mes,
    ano: anoAtual,
    valor: 250.00,
    vencimento: new Date(anoAtual, i, 10).toISOString().split("T")[0]
  }));

  const combo = document.getElementById("referencia");
  referencias.forEach((ref, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${ref.mes}/${ref.ano}`;
    combo.appendChild(option);
  });
}

function preencherValorEVencimento() {
  const index = document.getElementById("referencia").value;
  const ref = referencias[index];
  if (ref) {
    document.getElementById("valor").value = ref.valor.toFixed(2);
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

function registrarPagamento(e) {
  e.preventDefault();

  const index = document.getElementById("referencia").value;
  const ref = referencias[index];
  const referencia = `${ref.mes}/${ref.ano}`;

  const pagamento = {
    referencia,
    apartamento: document.getElementById("apartamento").value.trim(),
    cpf: document.getElementById("cpf").value,
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    valor: parseFloat(document.getElementById("valor").value),
    vencimento: document.getElementById("vencimento").value
  };

  if (Object.values(pagamento).some(v => !v)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  fetch("http://localhost:3000/api/pagamentos/registrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pagamento)
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao registrar pagamento.");
      return res.json();
    })
    .then(() => {
      alert(`✅ Pagamento registrado com sucesso!\n\nMorador: ${pagamento.nome}\nApartamento: ${pagamento.apartamento}\nReferência: ${referencia}\nValor: R$ ${pagamento.valor.toFixed(2)}\nVencimento: ${pagamento.vencimento}`);
      voltar();
    })
    .catch(err => {
      alert(err.message);
      console.error(err);
    });
}

function voltar() {
  window.location.href = "dashboard.html";
}
