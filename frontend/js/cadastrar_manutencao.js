let tiposManutencao = ["Limpeza", "Pintura", "Reparo Elétrico"];

window.addEventListener("DOMContentLoaded", () => {
  carregarTipos();
  document.getElementById("form-manutencao").addEventListener("submit", cadastrarTipo);
});

function carregarTipos() {
  const lista = document.getElementById("tipos-cadastrados");
  lista.innerHTML = "";

  tiposManutencao.forEach(tipo => {
    const li = document.createElement("li");
    li.textContent = tipo;
    lista.appendChild(li);
  });
}

function cadastrarTipo(e) {
  e.preventDefault();
  const descricao = document.getElementById("descricao").value.trim();

  if (!descricao) {
    alert("Informe a descrição da manutenção.");
    return;
  }

  const duplicado = tiposManutencao.some(tipo => tipo.toLowerCase() === descricao.toLowerCase());
  if (duplicado) {
    alert("❌ Tipo de manutenção já cadastrado.");
    return;
  }

  tiposManutencao.push(descricao);
  alert(`✅ Tipo de manutenção "${descricao}" cadastrado com sucesso.`);
  document.getElementById("descricao").value = "";
  carregarTipos();
}

function voltar() {
  window.location.href = "dashboard.html";
}
