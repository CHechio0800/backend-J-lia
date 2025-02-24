//close base Usuário
class Usuario {
    constructor (name, email, senha){
        this.nome = nome;
        this.email = email;
        this._senha = senha; //atributo privado
      }
      
      autenticar (senha) {
        return senha === this._senha;
      }

      alteraSenha(novaSenha){
        this._senha = novaSenha;
        console.log('Senha alterada com sucesso');
      }
}

//Classe admin que herda de Usuário
class Admin extends Usuario {
    constructor(nome, email, senha, nívelAcesso){
        super(nome, email, senha); 
        this.nivelAcesso = nivelAcesso;
    }

    banirUsuario(usuario){
    console.log('$(usuario.nome) foi banido pelo admin $(this.nome)');
    }

//Polimorfismo sobrepondo o método autenticar
autenticar(senha){
    return senha === this._senha && this,nivelAcesso ==='alto';
}

} 

//Exemplo de uso
const usuario1 = new Usuario('Luiz', 'luiz@gmail.com', '1234');
const usuario2 = new Admin('Maria', 'maria@gmail.com', '6789', 'alto');
console.log(usuario1.autenticar('1234')); 
console.log(usuario2.autenticar('6789'));
usuario2.banirUsuario(usuario1);

