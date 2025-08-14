document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const acao = urlParams.get("acao");
    const id = urlParams.get("id");

    const tituloPagina = document.getElementById("tituloPagina");
    const campoNome = document.getElementById("nomeBloco");
    const btnSalvar = document.getElementById("btnSalvar");

    // Simulação de dados (depois vai ser buscado no backend)
    let blocos = [
        { nome: "Bloco A" },
        { nome: "Bloco B" },
        { nome: "Bloco C" }
    ];

    if (acao === "alterar" && id !== null) {
        tituloPagina.textContent = "Alterar Bloco";
        campoNome.value = blocos[id].nome;
    } else if (acao === "consultar" && id !== null) {
        tituloPagina.textContent = "Consultar Bloco";
        campoNome.value = blocos[id].nome;
        campoNome.disabled = true;
        btnSalvar.style.display = "none";
    } else {
        tituloPagina.textContent = "Novo Bloco";
    }

    document.getElementById("formBloco").addEventListener("submit", e => {
        e.preventDefault();
        const nome = campoNome.value.trim();

        if (!nome) {
            alert("O nome do bloco é obrigatório!");
            return;
        }

        if (acao === "alterar") {
            blocos[id].nome = nome;
            alert("Bloco alterado com sucesso!");
        } else {
            blocos.push({ nome });
            alert("Bloco cadastrado com sucesso!");
        }

        window.location.href = "pesquisar_blocos.html";
    });

    document.getElementById("btnCancelar").addEventListener("click", () => {
        window.location.href = "pesquisar_blocos.html";
    });
});
