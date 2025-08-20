const params = new URLSearchParams(window.location.search);
const modo = params.get("modo") || "novo";
const id = parseInt(params.get("id"));

window.onload = () => {
  const titulo = document.getElementById("titulo-operacao");

  if (modo === "consultar" || modo === "alterar") {
    fetch(`http://localhost:3000/api/blocos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Bloco não encontrado");
        return res.json();
      })
      .then(bloco => {
        document.getElementById("descricao").value = bloco.nome;
        document.getElementById("quantidade").value = bloco.apartamentos;
        titulo.textContent = modo === "consultar" ? "Consultar Bloco" : "Alterar Bloco";

        if (modo === "consultar") {
          document.getElementById("descricao").disabled = true;
          document.getElementById("quantidade").disabled = true;
          document.querySelector("button[type='submit']").style.display = "none";
        }
      })
      .catch(err => {
        alert("Erro ao carregar bloco.");
        console.error(err);
      });
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

  const bloco = {
    nome,
    apartamentos: parseInt(quantidade)
  };

  const url = modo === "alterar"
    ? `http://localhost:3000/api/blocos/${id}`
    : "http://localhost:3000/api/blocos";

  const method = modo === "alterar" ? "PUT" : "POST";

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bloco)
  })
    .then(res => {
      if (res.status === 409) {
        throw new Error("Bloco já cadastrado");
      }
      if (!res.ok) {
        throw new Error("Erro ao salvar");
      }
      return res.json();
    })
    .then(data => {
      alert(data.message);
      voltar();
    })
    .catch(err => {
      alert(err.message || "Erro ao salvar bloco.");
      console.error(err);
    });
});

function voltar() {
  window.location.href = "dashboard.html";
}
