document.getElementById("form-apartamento").addEventListener("submit", function (e) {
  e.preventDefault();

  const bloco = document.getElementById("bloco").value;
  const numero = document.getElementById("numero").value;

  if (!bloco || !numero) {
    alert("Todos os campos são obrigatórios.");
    return;
  }

  const apartamento = { bloco, numero };

  fetch("http://localhost:3000/api/apartamentos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(apartamento)
  })
  .then(res => res.json())
  .then(data => {
    alert("Apartamento cadastrado com sucesso!");
    window.location.href = "pesquisar_apartamentos.html";
  })
  .catch(err => {
    console.error("Erro ao cadastrar:", err);
    alert("Erro ao cadastrar apartamento.");
  });
});
