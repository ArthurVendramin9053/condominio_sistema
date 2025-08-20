let tiposManutencao = ["Limpeza", "Pintura", "Reparo Elétrico"];

window.addEventListener("DOMContentLoaded", () => {
  carregarCombo();
  document.getElementById("form-manutencao").addEventListener("submit", registrarManutencao);
});

function carregarCombo() {
  const combo = document.getElementById("tipo");
  tiposManutencao.forEach(tipo => {
    const option = document.createElement("option");
    option.value = tipo;
    option.textContent = tipo;
    combo.appendChild(option);
  });
}

function registrarManutencao(e) {
  e.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const data = document.getElementById("data").value;
  const local = document.getElementById("local").value.trim();

  if (!tipo || !data || !local) {
    alert("❌ Todos os campos são obrigatórios.");
    return;
  }

  const manutencao = {
    tipo,
    data,
    local
  };

  console.log("Manutenção registrada:", manutencao);
  alert(`✅ Manutenção registrada com sucesso!\n\nTipo: ${tipo}\nData: ${data}\nLocal: ${local}`);
  voltar();
}

function voltar() {
  window.location.href = "dashboard.html";
}
