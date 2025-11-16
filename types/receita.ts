export interface Medicamento {
    id: string;
    nome: string;
    dias: number;
    intervalo: string;
    dosagem: string;
    horarios: string[];
    observacoes: string;
}

export interface Receita {
    id: string;
    nome: string;
    medico: string;
    dataConsulta: string;
    created: string;
    updated: string;
    observacoes: string;
    medicamentos: Medicamento[];
}

export interface ReceitaStore {
    receitas: Receita[];
}
