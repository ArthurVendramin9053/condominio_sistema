window.addEventListener("DOMContentLoaded", () => {
  carregarCombo();
  document.getElementById("form-manutencao").addEventListener("submit", registrarManutencao);
});

function carregarCombo() {
  fetch("http://localhost:3000/api/manutencoes/tipos")
    .then(res => res.json())
    .then(tipos => {
      const combo = document.getElementById("tipo");
      tipos.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo.descricao;
        option.textContent = tipo.descricao;
        combo.appendChild(option);
      });
    })
    .catch(err => {
      alert("Erro ao carregar tipos de manutenção.");
      console.error(err);
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

  fetch("http://localhost:3000/api/manutencoes/registro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(manutencao)
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao registrar manutenção.");
      return res.json();
    })
    .then(() => {
      alert(`✅ Manutenção registrada com sucesso!\n\nTipo: ${tipo}\nData: ${data}\nLocal: ${local}`);
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
