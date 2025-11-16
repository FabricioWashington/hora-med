// Função utilitária para gerar horários inteligentes para um medicamento
// Considera: dias de tratamento, intervalo entre doses, data de início, preferências do usuário, rotina

export type HorarioPreferencial = "manha" | "tarde" | "noite";

export interface PreferenciasUsuario {
  faixaHorarios: HorarioPreferencial[]; // ex: ["manha", "noite"]
  evitarHorarios?: string[]; // ex: ["12:00", "23:00"]
  inicioDia?: string; // ex: "06:00"
  fimDia?: string; // ex: "22:00"
}

export interface GerarHorariosParams {
  dias: number;
  intervaloHoras: number;
  dataInicio: string; // formato ISO
  preferencias: PreferenciasUsuario;
}

// Faixas de horários típicas
const FAIXAS = {
  manha: [6, 12],
  tarde: [12, 18],
  noite: [18, 23],
};

function getFaixaHora(hora: number): HorarioPreferencial | null {
  if (hora >= FAIXAS.manha[0] && hora < FAIXAS.manha[1]) return "manha";
  if (hora >= FAIXAS.tarde[0] && hora < FAIXAS.tarde[1]) return "tarde";
  if (hora >= FAIXAS.noite[0] && hora < FAIXAS.noite[1]) return "noite";
  return null;
}

export function gerarHorariosMedicamento({ dias, intervaloHoras, dataInicio, preferencias }: GerarHorariosParams): string[] {
  const horarios: string[] = [];
  const inicio = new Date(dataInicio);
  let atual = new Date(inicio);
  const totalDoses = Math.ceil((24 / intervaloHoras) * dias);

  for (let i = 0; i < totalDoses; i++) {
    // Calcula próximo horário
    if (i > 0) {
      atual.setHours(atual.getHours() + intervaloHoras);
    }
    // Ajusta para dentro do dia
    if (preferencias.inicioDia && atual.getHours() < Number(preferencias.inicioDia.split(":")[0])) {
      atual.setHours(Number(preferencias.inicioDia.split(":")[0]), 0, 0, 0);
    }
    if (preferencias.fimDia && atual.getHours() >= Number(preferencias.fimDia.split(":")[0])) {
      atual.setDate(atual.getDate() + 1);
      atual.setHours(Number(preferencias.inicioDia?.split(":")[0] || "6"), 0, 0, 0);
    }
    // Verifica faixa preferencial
    const faixa = getFaixaHora(atual.getHours());
    if (preferencias.faixaHorarios.length > 0 && faixa && !preferencias.faixaHorarios.includes(faixa)) {
      // Se não está na faixa preferida, pula para próxima faixa
      const proximaFaixa = FAIXAS[preferencias.faixaHorarios[0]];
      atual.setHours(proximaFaixa[0], 0, 0, 0);
    }
    // Evita horários indesejados
    const horaStr = atual.toTimeString().slice(0, 5);
    if (preferencias.evitarHorarios && preferencias.evitarHorarios.includes(horaStr)) {
      atual.setHours(atual.getHours() + 1);
    }
    // Adiciona horário
    horarios.push(atual.toISOString());
  }
  return horarios;
}
