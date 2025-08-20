window.addEventListener("DOMContentLoaded", () => {
  carregarTipos();
  document.getElementById("form-manutencao").addEventListener("submit", cadastrarTipo);
});

function carregarTipos() {
  fetch("http://localhost:3000/api/manutencoes")
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById("tipos-cadastrados");
      lista.innerHTML = "";

      data.forEach(tipo => {
        const li = document.createElement("li");
        li.textContent = tipo.descricao;
        lista.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar tipos:", err);
    });
}

function cadastrarTipo(e) {
  e.preventDefault();
  const descricao = document.getElementById("descricao").value.trim();

  if (!descricao) {
    alert("Informe a descrição da manutenção.");
    return;
  }

  fetch("http://localhost:3000/api/manutencoes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descricao })
  })
    .then(res => {
      if (!res.ok) throw new Error("Duplicado ou erro no cadastro");
      return res.json();
    })
    .then(data => {
      alert(`✅ Tipo de manutenção "${descricao}" cadastrado com sucesso.`);
      document.getElementById("descricao").value = "";
      carregarTipos();
    })
    .catch(err => {
      alert("❌ Tipo de manutenção já cadastrado ou erro no servidor.");
      console.error(err);
    });
}
