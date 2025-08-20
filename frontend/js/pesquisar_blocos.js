document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.getElementById("tabelaBlocos");
  const campoPesquisa = document.getElementById("campoPesquisa");
  const btnPesquisar = document.getElementById("btnPesquisar");
  const btnNovo = document.getElementById("btnNovo");
  const btnVoltar = document.getElementById("btnVoltar");

  let blocos = [];

  function carregarBlocos() {
    fetch("http://localhost:3000/api/blocos")
      .then(res => res.json())
      .then(data => {
        blocos = data;
        renderTabela();
      })
      .catch(err => {
        alert("Erro ao carregar blocos.");
        console.error(err);
      });
  }

  function renderTabela(filtro = "") {
    tabela.innerHTML = "";
    blocos
      .filter(b => b.nome.toLowerCase().includes(filtro.toLowerCase()))
      .forEach((b) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${b.nome}</td>
          <td>
            <button class="btnAlterar">Alterar</button>
            <button class="btnExcluir">Excluir</button>
            <button class="btnConsultar">Consultar</button>
          </td>
        `;

        tr.querySelector(".btnAlterar").addEventListener("click", () => {
          const novoNome = prompt("Novo nome do bloco:", b.nome);
          if (!novoNome) return;

          fetch(`http://localhost:3000/api/blocos/${b.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: novoNome })
          })
            .then(res => {
              if (!res.ok) throw new Error("Erro ao alterar bloco.");
              return res.json();
            })
            .then(() => {
              alert("Bloco alterado com sucesso!");
              carregarBlocos();
            })
            .catch(err => {
              alert(err.message);
              console.error(err);
            });
        });

        tr.querySelector(".btnExcluir").addEventListener("click", () => {
          if (!confirm("Deseja excluir este bloco?")) return;

          fetch(`http://localhost:3000/api/blocos/${b.id}`, {
            method: "DELETE"
          })
            .then(res => {
              if (!res.ok) throw new Error("Erro ao excluir bloco.");
              return res.json();
            })
            .then(() => {
              alert("Bloco excluído com sucesso!");
              carregarBlocos();
            })
            .catch(err => {
              alert(err.message);
              console.error(err);
            });
        });

        tr.querySelector(".btnConsultar").addEventListener("click", () => {
          alert(`Consulta de Bloco:\n\nNome: ${b.nome}`);
        });

        tabela.appendChild(tr);
      });
  }

  btnPesquisar.addEventListener("click", () => {
    renderTabela(campoPesquisa.value);
  });

  btnNovo.addEventListener("click", () => {
    const nome = prompt("Informe o nome do novo bloco:");
    if (!nome) return;

    fetch("http://localhost:3000/api/blocos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome })
    })
      .then(res => {
        if (res.status === 409) throw new Error("Bloco já cadastrado.");
        if (!res.ok) throw new Error("Erro ao cadastrar bloco.");
        return res.json();
      })
      .then(() => {
        alert("Bloco cadastrado com sucesso!");
        carregarBlocos();
      })
      .catch(err => {
        alert(err.message);
        console.error(err);
      });
  });

  btnVoltar.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  carregarBlocos();
});
