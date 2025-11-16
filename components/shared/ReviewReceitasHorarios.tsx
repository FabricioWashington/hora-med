

import React, { useState, useEffect } from "react";
import type { Receita, Medicamento, ReceitaStore } from "@/types/receita";
import { gerarHorariosMedicamento, PreferenciasUsuario } from "@/lib/gerarHorariosMedicamento";

const STORAGE_KEY = "receitas";

export function useReceitas() {
  const [store, setStore] = useState<ReceitaStore>({ receitas: [] });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setStore(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }, [store]);

  function addReceita(receita: Omit<Receita, "id" | "created" | "updated">) {
    const now = new Date().toISOString();
    setStore((prev) => ({
      receitas: [
        ...prev.receitas,
        {
          ...receita,
          id: crypto.randomUUID(),
          created: now,
          updated: now,
        },
      ],
    }));
  }

  function removeReceita(id: string) {
    setStore((prev) => ({
      receitas: prev.receitas.filter((r) => r.id !== id),
    }));
  }

  // Campo para receita ativa
  const [receitaAtivaId, setReceitaAtivaId] = useState<string | null>(null);

  useEffect(() => {
    // Se não houver receita ativa, define a primeira como ativa
    if (!receitaAtivaId && store.receitas.length > 0) {
      setReceitaAtivaId(store.receitas[0].id);
    }
  }, [store.receitas, receitaAtivaId]);

  function setReceitaAtiva(id: string) {
    setReceitaAtivaId(id);
  }

  return { receitas: store.receitas, addReceita, removeReceita, receitaAtivaId, setReceitaAtiva };
}

export function ReviewReceitasHorarios() {
  const { receitas, addReceita, removeReceita, receitaAtivaId, setReceitaAtiva } = useReceitas();

  // Formulário de receita
  const [nome, setNome] = useState("");
  const [medico, setMedico] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");
  const [observacoes, setObservacoes] = useState("");

  // Formulário de medicamento
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [medNome, setMedNome] = useState("");
  const [medDias, setMedDias] = useState("");
  const [medIntervalo, setMedIntervalo] = useState("");
  const [medDosagem, setMedDosagem] = useState("");
  const [medObservacoes, setMedObservacoes] = useState("");
  // Preferências do usuário para horários
  const [faixaHorarios, setFaixaHorarios] = useState<PreferenciasUsuario["faixaHorarios"]>([]);
  const [evitarHorarios, setEvitarHorarios] = useState<string>("");
  const [inicioDia, setInicioDia] = useState("06:00");
  const [fimDia, setFimDia] = useState("22:00");

  function handleAddMedicamento(e: React.FormEvent) {
    e.preventDefault();
    if (!medNome || !medDias || !medIntervalo) return;
    // Monta preferências do usuário
    const preferencias: PreferenciasUsuario = {
      faixaHorarios,
      evitarHorarios: evitarHorarios.split(",").map(h => h.trim()).filter(Boolean),
      inicioDia,
      fimDia,
    };
    // Gera horários automáticos
    const horarios = gerarHorariosMedicamento({
      dias: Number(medDias),
      intervaloHoras: Number(medIntervalo.replace(/[^\d]/g, "")) || 8,
      dataInicio: new Date().toISOString(),
      preferencias,
    });
    setMedicamentos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        nome: medNome,
        dias: Number(medDias),
        intervalo: medIntervalo,
        dosagem: medDosagem,
        horarios,
        observacoes: medObservacoes || "",
      },
    ]);
    setMedNome("");
    setMedDias("");
    setMedIntervalo("");
    setMedDosagem("");
    setMedObservacoes("");
    setFaixaHorarios([]);
    setEvitarHorarios("");
    setInicioDia("06:00");
    setFimDia("22:00");
  }

  function handleRemoveMedicamento(id: string) {
    setMedicamentos((prev) => prev.filter((m) => m.id !== id));
  }

  function handleSubmitReceita(e: React.FormEvent) {
    e.preventDefault();
    if (!nome || !medico || !dataConsulta || medicamentos.length === 0) return;
    addReceita({
      nome,
      medico,
      dataConsulta,
      observacoes,
      medicamentos,
    });
    setNome("");
    setMedico("");
    setDataConsulta("");
    setObservacoes("");
    setMedicamentos([]);
  }

  // Receita ativa
  const receitaAtiva = receitas.find((r) => r.id === receitaAtivaId) || null;

  // Horários do dia: medicamentos da receita ativa
  const hoje = new Date().toLocaleDateString();
  const horariosDoDia: Medicamento[] = [];
  if (receitaAtiva) {
    receitaAtiva.medicamentos.forEach((m) => {
      horariosDoDia.push(m);
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-4">
      {/* Card de receita ativa */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-bold mb-2">Receita Ativa</h2>
        {receitas.length === 0 && <div className="text-gray-500">Nenhuma receita cadastrada.</div>}
        {receitaAtiva ? (
          <div className="border p-2 rounded mb-2">
            <div className="flex justify-between items-center">
              <span>
                <strong>{receitaAtiva.nome}</strong> <span className="text-xs text-gray-500">({receitaAtiva.medico})</span>
              </span>
              <button
                onClick={() => removeReceita(receitaAtiva.id)}
                className="text-red-500 hover:underline"
              >
                Excluir
              </button>
            </div>
            <div className="text-xs text-gray-600">Consulta: {receitaAtiva.dataConsulta}</div>
            <ul className="mt-2 ml-2 space-y-1">
              {receitaAtiva.medicamentos.map((m) => (
                <li key={m.id}>
                  <span className="font-medium">{m.nome}</span> - {m.dias} dias restantes, intervalo: {m.intervalo}
                  {m.dosagem && <span>, dosagem: {m.dosagem}</span>}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {/* Se houver mais de uma receita, permite selecionar qual está ativa */}
        {receitas.length > 1 && (
          <div className="mt-4">
            <label className="font-medium">Selecionar receita ativa:</label>
            <select
              className="border p-2 rounded ml-2"
              value={receitaAtivaId || ""}
              onChange={e => setReceitaAtiva(e.target.value)}
            >
              {receitas.map((r) => (
                <option key={r.id} value={r.id}>{r.nome} ({r.medico})</option>
              ))}
            </select>
          </div>
        )}
      </div>
      {/* Card de horários do dia da receita ativa */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-bold mb-2">Horários do Dia (Receita Ativa)</h2>
        <ul className="space-y-2">
          {horariosDoDia.length === 0 && <li className="text-gray-500">Nenhum horário para hoje.</li>}
          {horariosDoDia.map((m) => (
            <li key={m.id} className="border p-2 rounded">
              <span className="font-medium">{m.nome}</span> - {m.dias} dias restantes, intervalo: {m.intervalo}
              {m.dosagem && <span>, dosagem: {m.dosagem}</span>}
              {/* Notificação visual para horários do dia */}
              {m.horarios && m.horarios.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-1">
                  {m.horarios.map((h: string, idx: number) => (
                    <li key={idx} className="bg-blue-100 px-2 py-1 rounded text-xs">
                      {new Date(h).toLocaleString()}
                      {/* Aqui pode ser integrado com lógica de notificação real */}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Formulário de cadastro de receita */}
      <div className="col-span-2 bg-white rounded shadow p-4 mt-4">
        <h2 className="text-lg font-bold mb-2">Adicionar Receita</h2>
        <form onSubmit={handleSubmitReceita} className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            placeholder="Nome da receita"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Médico"
            value={medico}
            onChange={(e) => setMedico(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            placeholder="Data da consulta"
            value={dataConsulta}
            onChange={(e) => setDataConsulta(e.target.value)}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Observações"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="border p-2 rounded"
          />
          <div className="bg-neutral-50 p-2 rounded mt-2">
            <h3 className="font-semibold mb-2">Medicamentos</h3>
            <div className="flex flex-col gap-2 mb-2">
              <input
                type="text"
                placeholder="Nome do medicamento"
                value={medNome}
                onChange={(e) => setMedNome(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                min="1"
                placeholder="Dias de uso"
                value={medDias}
                onChange={(e) => setMedDias(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Intervalo (ex: 8h)"
                value={medIntervalo}
                onChange={(e) => setMedIntervalo(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Dosagem (opcional)"
                value={medDosagem}
                onChange={(e) => setMedDosagem(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Observações (opcional)"
                value={medObservacoes}
                onChange={(e) => setMedObservacoes(e.target.value)}
                className="border p-2 rounded"
              />
              <div className="flex flex-col gap-2 mt-2">
                <label className="font-medium">Preferências de horários</label>
                <div className="flex gap-2">
                  <label><input type="checkbox" checked={faixaHorarios.includes("manha")} onChange={e => setFaixaHorarios(faixaHorarios => e.target.checked ? [...faixaHorarios, "manha"] : faixaHorarios.filter(f => f !== "manha"))}/> Manhã</label>
                  <label><input type="checkbox" checked={faixaHorarios.includes("tarde")} onChange={e => setFaixaHorarios(faixaHorarios => e.target.checked ? [...faixaHorarios, "tarde"] : faixaHorarios.filter(f => f !== "tarde"))}/> Tarde</label>
                  <label><input type="checkbox" checked={faixaHorarios.includes("noite")} onChange={e => setFaixaHorarios(faixaHorarios => e.target.checked ? [...faixaHorarios, "noite"] : faixaHorarios.filter(f => f !== "noite"))}/> Noite</label>
                </div>
                <input
                  type="text"
                  placeholder="Evitar horários (ex: 12:00,23:00)"
                  value={evitarHorarios}
                  onChange={e => setEvitarHorarios(e.target.value)}
                  className="border p-2 rounded"
                />
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={inicioDia}
                    onChange={e => setInicioDia(e.target.value)}
                    className="border p-2 rounded"
                  />
                  <span>até</span>
                  <input
                    type="time"
                    value={fimDia}
                    onChange={e => setFimDia(e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
              </div>
              <button type="button" className="bg-primary text-white p-2 rounded" onClick={handleAddMedicamento}>Adicionar Medicamento</button>
            </div>
            <ul className="space-y-1">
              {medicamentos.map((m) => (
                <li key={m.id} className="flex flex-col border p-2 rounded mb-2">
                  <div className="flex justify-between items-center">
                    <span>
                      <strong>{m.nome}</strong> - {m.dias} dias, intervalo: {m.intervalo}
                      {m.dosagem && <span>, dosagem: {m.dosagem}</span>}
                    </span>
                    <button
                      onClick={() => handleRemoveMedicamento(m.id)}
                      className="text-red-500 hover:underline"
                    >Excluir</button>
                  </div>
                  <div className="text-xs text-gray-600">Horários gerados:</div>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {m.horarios.map((h, idx) => (
                      <li key={idx} className="bg-zinc-100 px-2 py-1 rounded text-xs">{new Date(h).toLocaleString()}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="bg-primary text-white p-2 rounded mt-2">Salvar Receita</button>
        </form>
      </div>
    </div>
  );
}
