window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const apt = params.get("apartamento");
  const bloco = params.get("bloco");

  if (apt) document.getElementById("apartamento").value = apt;
  if (bloco) document.getElementById("bloco").value = bloco;
};

document.getElementById("form-morador").addEventListener("submit", function (e) {
  e.preventDefault();

  const vagasValue = document.getElementById("vagas").value;
  const morador = {
    cpf: document.getElementById("cpf").value.trim(),
    nome: document.getElementById("nome").value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    apartamento: document.getElementById("apartamento").value.trim(),
    bloco: document.getElementById("bloco").value,
    responsavel: document.querySelector('input[name="responsavel"]:checked')?.value,
    proprietario: document.querySelector('input[name="proprietario"]:checked')?.value,
    veiculo: document.querySelector('input[name="veiculo"]:checked')?.value,
    vagas: vagasValue ? parseInt(vagasValue) : null,
    numeroVaga: document.getElementById("numero-vaga").value.trim(),
    placa: document.getElementById("placa").value.trim(),
    marca: document.getElementById("marca").value.trim(),
    modelo: document.getElementById("modelo").value.trim()
  };

  if (!morador.cpf || !morador.nome || !morador.telefone || !morador.apartamento || !morador.bloco) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  fetch("http://localhost:3000/api/moradores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(morador)
  })
    .then(res => res.json().then(data => ({ status: res.status, body: data })))
    .then(({ status, body }) => {
      if (status !== 201) {
        alert(body.error || "Erro ao cadastrar morador.");
        throw new Error(body.error);
      } else {
        alert("Morador cadastrado com sucesso!");
        window.location.href = "pesquisar_moradores.html";
      }
    })
    .catch(err => {
      console.error("Erro:", err);
    });
});

function voltar() {
  window.location.href = "dashboard.html";
}
