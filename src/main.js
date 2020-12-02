class App {
  //construtor
  constructor() {
    //lista de repositorios
    this.repositorios = [];

    //form
    this.formulario = document.querySelector("form");

    //metodo para registrar eventos no form
    this.registrarEventos();
  }

  registrarEventos() {
    this.formulario.onsubmit = (evento) => this.adicionarRepositorio(evento);
  }

  adicionarRepositorio(evento) {
    // Evita que o formulario recarregue a pagina
    evento.preventDefault();

    //Adicona o repositorio na lista
    this.repositorios.push({
      nome: "Guilherme",
      descricao: "Developer",
      avatar_url: "https://avatars0.githubusercontent.com/u/8083459?v=4",
      link: "https://github.com/ryanoasis/nerd-fonts",
    });

    // Renderizar a tela
    console.log(this.repositorios);
  }
}

new App();
