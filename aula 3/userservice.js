const User = require("./user"); ''
const path = require("path") //path cria um caminho virtual que pode ser acessado de qualquer lugar da pasta Aula 3 ou tudo da frente da pasta (caminho relativo) (módulo para manipular caminhos)
const fs = require("fs") //fs é FileSystem (módulo para manipular arquivos)
const bcrypt = require('bcryptjs') //biblioteca para criptografar a senha

class userService {
  constructor() { //quando não passa parâmetro traz um valor fixo, que não muda
    this.filePath = path.join(__dirname, 'user.json') //a biblioteca path vem de um caminho, puca um diretorio virtual (dirname) e puxa o arquivo users.json
    this.users = this.loadUsers();//[] é um array, esse array é pra armazenar o user
    this.nextID = this.getNextID(); //contador para gerar id
  }

  loadUsers() { //função pra carregar usuários
    try { //vai tentar isso enquanto der certo
      if (fs.existsSync(this.filePath)) { //se dentro do arquivo Json existir algum dado, ele da true e entra no if
        const data = fs.readFileSync(this.filePath) //quando true, ele da um read, ele lê o arquivo Json e salva na Data
        return JSON.parse(data) //ele transforma a data do json em um Array de objetos
      }
    } catch (erro) { //se o try der errado, ele vai mostrar que deu erro
      console.log('Erro ao carregar arquivo', erro) //vai ler o erro que deu no console
    }
    return [] //se não der true, roda um array vazio
  }


  //definir o proximo id a ser utilizado
  getNextID() {
    try {
      if (this.users.length === 0) return 1//se eu tiver um user dentro, ele não vai entrar, se tiver com 0 usuários ele entra e coloca ID 1
      return Math.max(...this.users.map(user => user.id)) + 1 //mostra pra gente o maior valor possível de um ID, ai ele mapeia o o ultimo user, e se o proximo for maior (vai ser maior por ser o próximo]) ele adiciona +1 no ID
    } catch (erro) {
      console.log('Erro ao buscar próximo ID', erro)
    }
  }

  SaveUsers() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.users));
    } catch (erro) {
      console.log('Erro ao salvar arquivo', erro);

    }
  }

    async addUser(nome, email, senha, endereco, telefone, cpf) {
      try {
      const SenhaCripto = await bcrypt.hash(senha, 10);
      const user = new User(this.nextID++, nome, email, SenhaCripto, endereco, telefone, cpf)  //cria novo user, e o novoid++ é pra toda vez aumentar um no id
      this.users.push(user) //da um push pra armazenar esse user no array de usuarios
      this.SaveUsers() //salva o user
      return user;
    } catch (erro) {
      console.log('erro ao cadastrar o ususrio', erro);
    }
  }

    getUsers() {
      return this.users
    }

    deleteUser(id) {
      try {
        this.users = this.users.filter(user => user.id !== id);
        this.SaveUsers();

      } catch {
        console.log('Erro ao declarar usuario', erro);
      }
    }
  }



module.exports = new userService

