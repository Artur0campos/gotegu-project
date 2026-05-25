export class User {

    cpf: string;
    nome: string;
    email: string;
    senha: string;

    constructor(
        cpf: string,
        nome: string,
        email: string,
        senha: string
    ) {

        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}


export class UserLogin {

    cpf: string;
    senha: string;

    constructor(
        cpf: string,
        senha: string
    ) {

        this.cpf = cpf;
        this.senha = senha;
    }
}
