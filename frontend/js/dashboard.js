// Função para navegar entre as páginas do sistema
function navegar(pagina) {
    // Redireciona para a página desejada dentro da pasta 'pages'
    window.location.href = `./${pagina}`;
  }
  
  // Função para sair do sistema
  function sair() {
    // Exibe uma mensagem de confirmação
    const confirmar = confirm("Tem certeza que deseja sair?");
    if (confirmar) {
      alert("Você saiu do sistema.");
      window.location.href = "login.html";
    }
  }
  