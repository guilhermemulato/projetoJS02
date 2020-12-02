import api from "./api";

class App {
  //construtor
  constructor() {
    //lista de repositorios
    this.repositorios = [];

    //form
    this.formulario = document.querySelector("form");

    //lista
    this.lista = document.querySelector(".list-group");

    //metodo para registrar eventos no form
    this.registrarEventos();
  }

  registrarEventos() {
    this.formulario.onsubmit = (evento) => this.adicionarRepositorio(evento);
  }

  async adicionarRepositorio(evento) {
    // Evita que o formulario recarregue a pagina
    evento.preventDefault();

    //recuperrar valor do input
    let input = document.querySelector("input[id=repositorio]").value;

    //Se o input vier vazio sai da app
    if (input.length === 0) {
      return; //return sempre sai da funcao
    }

    this.apresentarBuscando();

    try {
      let response = await api.get(`/repos/${input}`);
      // console.log(response);

      let {
        name,
        description,
        html_url,
        owner: { avatar_url },
      } = response.data;

      //Adicona o repositorio na lista
      this.repositorios.push({
        nome: name,
        descricao: description,
        avatar_url,
        link: html_url,
      });

      // Renderizar a tela
      this.renderizarTela();
    } catch (erro) {
      //limpar busca
      this.lista.removeChild(
        document.querySelector(".list-group-item-warning")
      );

      let error = this.lista.querySelector(".list-group-item-danger");
      if (error !== null) {
        this.lista.removeChild(error);
      }
      //criando li
      let li = document.createElement("li");
      li.setAttribute("class", "list-group-item list-group-item-danger");
      let txtErro = document.createTextNode(
        `O repositorio ${input} não existe`
      );
      li.appendChild(txtErro);
      this.lista.appendChild(li);
    }
  }

  apresentarBuscando() {
    //criando li
    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item list-group-item-warning");
    let txtBusca = document.createTextNode(
      `Aguarde, buscando o repositorio...`
    );
    li.appendChild(txtBusca);
    this.lista.appendChild(li);
  }

  renderizarTela() {
    //limpar lista
    this.lista.innerHTML = "";

    //percorrer lista de repositorios e criar elementos
    this.repositorios.forEach((repositorio) => {
      //li
      let li = document.createElement("li");
      li.setAttribute("class", "list-group-item list-group-item-action");

      //img
      let img = document.createElement("img");
      img.setAttribute("src", repositorio.avatar_url);
      li.appendChild(img);

      //strong
      let strong = document.createElement("strong");
      let txtNome = document.createTextNode(repositorio.nome);
      strong.appendChild(txtNome);
      li.appendChild(strong);

      //p
      let p = document.createElement("p");
      let txtDescricao = document.createTextNode(repositorio.descricao);
      p.appendChild(txtDescricao);
      li.appendChild(p);

      //a
      let a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", repositorio.link);
      let txtA = document.createTextNode("Acessar");
      a.appendChild(txtA);
      li.appendChild(a);

      //adciona tudo na lista
      this.lista.appendChild(li);

      //limpar conteudo input
      this.formulario.querySelector("input[id=repositorio]").value = "";

      //adiciona o focus no input
      this.formulario.querySelector("input[id=repositorio]").focus();
    });
  }
}

new App();
