export class inscricao_model{
    id_evento: number
    id_usuario_participante: number

    constructor(id_evento: number, id_usuario_participante: number){
        this.id_evento = id_evento
        this.id_usuario_participante = id_usuario_participante
    }
}