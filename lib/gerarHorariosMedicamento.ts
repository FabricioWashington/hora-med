export type HorarioPreferencial = "manha" | "tarde" | "noite";

export interface PreferenciasUsuario {
  faixaHorarios: HorarioPreferencial[]; 
  evitarHorarios?: string[];
  inicioDia?: string; 
  fimDia?: string; 
}

export interface GerarHorariosParams {
  dias: number;
  intervaloHoras: number;
  dataInicio: string;
  preferencias: PreferenciasUsuario;
}

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
    if (i > 0) {
      atual.setHours(atual.getHours() + intervaloHoras);
    }
    if (preferencias.inicioDia && atual.getHours() < Number(preferencias.inicioDia.split(":")[0])) {
      atual.setHours(Number(preferencias.inicioDia.split(":")[0]), 0, 0, 0);
    }
    if (preferencias.fimDia && atual.getHours() >= Number(preferencias.fimDia.split(":")[0])) {
      atual.setDate(atual.getDate() + 1);
      atual.setHours(Number(preferencias.inicioDia?.split(":")[0] || "6"), 0, 0, 0);
    }
    const faixa = getFaixaHora(atual.getHours());
    if (preferencias.faixaHorarios.length > 0 && faixa && !preferencias.faixaHorarios.includes(faixa)) {
      const proximaFaixa = FAIXAS[preferencias.faixaHorarios[0]];
      atual.setHours(proximaFaixa[0], 0, 0, 0);
    }
    const horaStr = atual.toTimeString().slice(0, 5);
    if (preferencias.evitarHorarios && preferencias.evitarHorarios.includes(horaStr)) {
      atual.setHours(atual.getHours() + 1);
    }
    horarios.push(atual.toISOString());
  }
  return horarios;
}
