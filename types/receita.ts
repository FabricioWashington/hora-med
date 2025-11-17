
export interface MedicamentoReceita {
    nome: string;
    quantidade_comprimidos: number;
    quantidade_dia: number;
    quantidade_mes: number;
    intervalo_horas: number;
    horario_inicio: string;
    data_inicial: string;
    data_final: string;
    horarios: string[];
    status: string;
}


export interface Receita {
    id: number;
    nome: string;
    medico: string;
    medicamentos: string; // JSON string
    statusReceita: string;
    dataCriacaoMedico: string;
    created: string;
    updated: string;
}


export interface ReceitaStore {
    receitas: Receita[];
}
