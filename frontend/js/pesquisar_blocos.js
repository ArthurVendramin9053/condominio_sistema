document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.getElementById("tabelaBlocos");
    const campoPesquisa = document.getElementById("campoPesquisa");
    const btnPesquisar = document.getElementById("btnPesquisar");
    const btnNovo = document.getElementById("btnNovo");
    const btnVoltar = document.getElementById("btnVoltar");

    let blocos = [
        { nome: "Bloco A" },
        { nome: "Bloco B" },
        { nome: "Bloco C" }
    ];

    function renderTabela(filtro = "") {
        tabela.innerHTML = "";
        blocos
            .filter(b => b.nome.toLowerCase().includes(filtro.toLowerCase()))
            .forEach((b, index) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${b.nome}</td>
                    <td>
                        <button class="btnAlterar">Alterar</button>
                        <button class="btnExcluir">Excluir</button>
                        <button class="btnConsultar">Consultar</button>
                    </td>
                `;
                // Eventos de ação
                tr.querySelector(".btnAlterar").addEventListener("click", () => {
                    window.location.href = "manter_bloco.html?acao=alterar&id=" + index;
                });
                tr.querySelector(".btnExcluir").addEventListener("click", () => {
                    if (confirm("Deseja excluir este bloco?")) {
                        blocos.splice(index, 1);
                        renderTabela(filtro);
                    }
                });
                tr.querySelector(".btnConsultar").addEventListener("click", () => {
                    window.location.href = "manter_bloco.html?acao=consultar&id=" + index;
                });
                tabela.appendChild(tr);
            });
    }

    // Inicializa tabela
    renderTabela();

    btnPesquisar.addEventListener("click", () => {
        renderTabela(campoPesquisa.value);
    });

    btnNovo.addEventListener("click", () => {
        window.location.href = "manter_bloco.html?acao=novo";
    });

    btnVoltar.addEventListener("click", () => {
        window.history.back();
    });
});

function voltar() {
  window.location.href = "dashboard.html";
}