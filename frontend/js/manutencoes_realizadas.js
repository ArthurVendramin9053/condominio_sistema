document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("manutencaoRealizadaForm");
    const tableBody = document.getElementById("manutencoesRealizadasTableBody");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const tipo = document.getElementById("tipoManutencao").value;
        const data = document.getElementById("dataManutencao").value;
        const valor = parseFloat(document.getElementById("valorManutencao").value).toFixed(2);
        const observacao = document.getElementById("observacaoManutencao").value;

        if (!tipo || !data || isNaN(valor)) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${tipo}</td>
            <td>${data}</td>
            <td>R$ ${valor}</td>
            <td>${observacao || ""}</td>
            <td><button class="delete-btn">Excluir</button></td>
        `;

        tableBody.appendChild(row);
        form.reset();
    });

    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            if (confirm("Tem certeza que deseja excluir esta manutenção?")) {
                e.target.closest("tr").remove();
            }
        }
    });
});
