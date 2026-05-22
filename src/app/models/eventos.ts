export class Eventos {

    nome: string;
    dt_inicio: string;
    dt_fim: string;
    descricao: string;

    nome_responsavel: string;
    cpf_responsavel: string;
    email_responsavel: string;

    numero_vagas: number;
    dt_limite_inscricao: string;

    constructor(
        nome: string,
        dt_inicio: string,
        dt_fim: string,
        descricao: string,

        nome_responsavel: string,
        cpf_responsavel: string,
        email_responsavel: string,

        numero_vagas: number,
        dt_limite_inscricao: string
    ) {

        this.nome = nome;
        this.dt_inicio = dt_inicio;
        this.dt_fim = dt_fim;
        this.descricao = descricao;

        this.nome_responsavel = nome_responsavel;
        this.cpf_responsavel = cpf_responsavel;
        this.email_responsavel = email_responsavel;

        this.numero_vagas = numero_vagas;
        this.dt_limite_inscricao = dt_limite_inscricao;
    }
}