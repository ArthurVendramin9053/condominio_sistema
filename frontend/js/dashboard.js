const dashboardData = {
    blocos: 0,
    apartamentos: 0,
    moradores: 0,
    pagamentosPendentes: 0,
    manutencoesPendentes: 0
};

function atualizarDashboard() {
    document.getElementById("total-blocos").textContent = dashboardData.blocos;
    document.getElementById("total-apartamentos").textContent = dashboardData.apartamentos;
    document.getElementById("total-moradores").textContent = dashboardData.moradores;
    document.getElementById("pagamentos-pendentes").textContent = dashboardData.pagamentosPendentes;
    document.getElementById("manutencoes-pendentes").textContent = dashboardData.manutencoesPendentes;
}

document.addEventListener("DOMContentLoaded", atualizarDashboard);
