"use client";
import { useEffect, useState } from "react";
import { getReceitas, updateReceita } from "@/services/receita.service";
import type { Receita, MedicamentoReceita } from "@/types/receita";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Plus } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Content() {
  const [deleteReceitaModalOpen, setDeleteReceitaModalOpen] = useState(false);
  const [receitaToDeleteIdx, setReceitaToDeleteIdx] = useState<number | null>(null);
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [medicamentosForm, setMedicamentosForm] = useState<MedicamentoReceita[]>([{
    nome: "",
    quantidade_comprimidos: 0,
    quantidade_dia: 0,
    quantidade_mes: 0,
    intervalo_horas: 0,
    horario_inicio: "",
    data_inicial: "",
    data_final: "",
    horarios: [],
    status: "ativo"
  }]);
  const [editReceitaIdx, setEditReceitaIdx] = useState<number | null>(null);
  const [editMedIdx, setEditMedIdx] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<MedicamentoReceita | null>(null);
  const [deleteReceitaIdx, setDeleteReceitaIdx] = useState<number | null>(null);
  const [deleteMedIdx, setDeleteMedIdx] = useState<number | null>(null);

  function handleFormChange(idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setMedicamentosForm((prev) => prev.map((med, i) => i === idx ? {
      ...med,
      [name]: name.startsWith("quantidade") || name === "intervalo_horas" ? Number(value) : value
    } : med));
  }

  function handleEditFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (!editForm) return;
    const { name, value } = e.target;
    setEditForm((prev) => prev ? ({
      ...prev,
      [name]: name.startsWith("quantidade") || name === "intervalo_horas" ? Number(value) : value
    }) : prev);
  }

  function handleEditHorariosChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!editForm) return;
    setEditForm((prev) => prev ? ({
      ...prev,
      horarios: e.target.value.split(",").map(h => h.trim())
    }) : prev);
  }

  function handleHorariosChange(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    setMedicamentosForm((prev) => prev.map((med, i) => i === idx ? {
      ...med,
      horarios: e.target.value.split(",").map(h => h.trim())
    } : med));
  }

  function addMedicamentoField() {
    setMedicamentosForm((prev) => [...prev, {
      nome: "",
      quantidade_comprimidos: 0,
      quantidade_dia: 0,
      quantidade_mes: 0,
      intervalo_horas: 0,
      horario_inicio: "",
      data_inicial: "",
      data_final: "",
      horarios: [],
      status: "ativo"
    }]);
  }

  function removeMedicamentoField(idx: number) {
    setMedicamentosForm((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (receitas.length > 0) {
      await updateReceita(receitas[0].id.toString(), {
        medicamentos: JSON.stringify(medicamentosForm)
      });
      const data = await getReceitas();
      setReceitas(data);
    }
    setModalOpen(false);
    setMedicamentosForm([{
      nome: "",
      quantidade_comprimidos: 0,
      quantidade_dia: 0,
      quantidade_mes: 0,
      intervalo_horas: 0,
      horario_inicio: "",
      data_inicial: "",
      data_final: "",
      horarios: [],
      status: "ativo"
    }]);
    setLoading(false);
  }

  function openEditModal(receitaIdx: number, medIdx: number, med: MedicamentoReceita) {
    setEditReceitaIdx(receitaIdx);
    setEditMedIdx(medIdx);
    setEditForm(med);
    setEditModalOpen(true);
  }

  async function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editReceitaIdx === null || editMedIdx === null || !editForm) return;
    setLoading(true);
    const receita = receitas[editReceitaIdx];
    let meds: MedicamentoReceita[] = [];
    if (typeof receita.medicamentos === "string") {
      try {
        if (receita.medicamentos.trim().startsWith("[")) {
          meds = JSON.parse(receita.medicamentos);
        }
      } catch {}
    } else if (Array.isArray(receita.medicamentos)) {
      meds = receita.medicamentos;
    }
    meds[editMedIdx] = editForm;
    await updateReceita(receita.id.toString(), {
      medicamentos: JSON.stringify(meds)
    });
    const data = await getReceitas();
    setReceitas(data);
    setEditModalOpen(false);
    setEditReceitaIdx(null);
    setEditMedIdx(null);
    setEditForm(null);
    setLoading(false);
  }

  function openDeleteModal(receitaIdx: number, medIdx: number) {
    setDeleteReceitaIdx(receitaIdx);
    setDeleteMedIdx(medIdx);
    setConfirmOpen(true);
  }

  async function handleDelete() {
    if (deleteReceitaIdx === null || deleteMedIdx === null) return;
    setLoading(true);
    const receita = receitas[deleteReceitaIdx];
    let meds: MedicamentoReceita[] = [];
    if (typeof receita.medicamentos === "string") {
      try {
        if (receita.medicamentos.trim().startsWith("[")) {
          meds = JSON.parse(receita.medicamentos);
        }
      } catch {}
    } else if (Array.isArray(receita.medicamentos)) {
      meds = receita.medicamentos;
    }
    meds.splice(deleteMedIdx, 1);
    await updateReceita(receita.id.toString(), {
      medicamentos: JSON.stringify(meds)
    });
    const data = await getReceitas();
    setReceitas(data);
    setConfirmOpen(false);
    setDeleteReceitaIdx(null);
    setDeleteMedIdx(null);
    setLoading(false);
  }

  useEffect(() => {
    async function fetchReceitas() {
      setLoading(true);
      try {
        const data = await getReceitas();
        setReceitas(data);
      } finally {
        setLoading(false);
      }
    }
    fetchReceitas();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-[--text-main]">Receitas e Medicamentos</h2>
      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="text-center text-gray-500">Carregando...</div>
        ) : receitas.length === 0 ? (
          <div className="text-center text-gray-500">Nenhuma receita encontrada.</div>
        ) : (
          receitas.map((receita, idx) => {
            let meds: MedicamentoReceita[] = [];
            if (typeof receita.medicamentos === "string") {
              try {
                if (receita.medicamentos.trim().startsWith("[")) {
                  meds = JSON.parse(receita.medicamentos);
                }
              } catch {}
            } else if (Array.isArray(receita.medicamentos)) {
              meds = receita.medicamentos;
            }
            return (
              <div key={receita.id} className="bg-zinc-100 rounded-lg px-4 py-3 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold text-[--text-main]">Receita #{receita.id} - {receita.medico}</div>
                  <Button size="icon" variant="destructive" title="Excluir Receita" onClick={() => { setReceitaToDeleteIdx(idx); setDeleteReceitaModalOpen(true); }}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mb-2 text-xs text-[--gray-neutral]">Criada em: {new Date(receita.created).toLocaleDateString()}</div>
                {meds.length === 0 ? (
                  <div className="text-gray-500">Nenhum medicamento cadastrado.</div>
                ) : (
                  meds.map((med, mIdx) => (
                    <div key={mIdx} className="bg-white rounded px-3 py-2 mb-2 border">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-[--text-main]">{med.nome}</span>
                          <span className="ml-2 text-xs text-[--gray-neutral]">({med.status})</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="outline" title="Editar" onClick={() => openEditModal(idx, mIdx, med)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="destructive" title="Excluir" onClick={() => openDeleteModal(idx, mIdx)}>
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <strong>Horários:</strong> {med.horarios.join(", ")}
                      </div>
                      <div className="mt-1 text-xs text-[--gray-neutral]">
                        <span>Qtd. Comprimidos: {med.quantidade_comprimidos} | Qtd. Dia: {med.quantidade_dia} | Qtd. Mês: {med.quantidade_mes} | Intervalo: {med.intervalo_horas}h</span>
                      </div>
                      <div className="mt-1 text-xs text-[--gray-neutral]">
                        <span>Início: {med.data_inicial} | Fim: {med.data_final} | Horário Inicial: {med.horario_inicio}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            );
          })
        )}
      </div>
      <Modal
        title="Confirmar Exclusão de Receita"
        description="Tem certeza que deseja excluir esta receita?"
        open={deleteReceitaModalOpen}
        onOpenChange={setDeleteReceitaModalOpen}
        size="sm"
        hideFooterClose={true}
      >
        <div className="flex flex-col gap-4">
          <div className="text-center">Esta ação não pode ser desfeita.</div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteReceitaModalOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={async () => {
              if (receitaToDeleteIdx !== null) {
                setLoading(true);
                const receita = receitas[receitaToDeleteIdx];
                const { deleteReceita } = await import("@/services/receita.service");
                await deleteReceita(receita.id.toString());
                const data = await getReceitas();
                setReceitas(data);
                setDeleteReceitaModalOpen(false);
                setReceitaToDeleteIdx(null);
                setLoading(false);
              }
            }}>Excluir</Button>
          </div>
        </div>
      </Modal>
      <div className="mt-8 text-center">
        <Button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold" onClick={() => setModalOpen(true)}>
          <Plus className="mr-2 w-4 h-4" />Cadastrar Medicamentos
        </Button>
      </div>
      <Modal
        title="Cadastrar Medicamentos"
        open={modalOpen}
        onOpenChange={setModalOpen}
        size="md"
      >
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {medicamentosForm.map((form, idx) => (
            <div key={idx} className="border rounded p-4 mb-2 bg-zinc-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Medicamento {idx + 1}</span>
                {medicamentosForm.length > 1 && (
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeMedicamentoField(idx)}>
                    Remover
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`nome-${idx}`}>Nome</Label>
                  <Input id={`nome-${idx}`} name="nome" value={form.nome} onChange={e => handleFormChange(idx, e)} required />
                </div>
                <div>
                  <Label htmlFor={`status-${idx}`}>Status</Label>
                  <select id={`status-${idx}`} name="status" value={form.status} onChange={e => handleFormChange(idx, e)} className="border rounded w-full h-9 px-3">
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor={`quantidade_comprimidos-${idx}`}>Qtd. Comprimidos</Label>
                  <Input id={`quantidade_comprimidos-${idx}`} name="quantidade_comprimidos" type="number" value={form.quantidade_comprimidos} onChange={e => handleFormChange(idx, e)} required />
                </div>
                <div>
                  <Label htmlFor={`quantidade_dia-${idx}`}>Qtd. por Dia</Label>
                  <Input id={`quantidade_dia-${idx}`} name="quantidade_dia" type="number" value={form.quantidade_dia} onChange={e => handleFormChange(idx, e)} required />
                </div>
                <div>
                  <Label htmlFor={`quantidade_mes-${idx}`}>Qtd. por Mês</Label>
                  <Input id={`quantidade_mes-${idx}`} name="quantidade_mes" type="number" value={form.quantidade_mes} onChange={e => handleFormChange(idx, e)} required />
                </div>
                <div>
                  <Label htmlFor={`intervalo_horas-${idx}`}>Intervalo (horas)</Label>
                  <Input id={`intervalo_horas-${idx}`} name="intervalo_horas" type="number" value={form.intervalo_horas} onChange={e => handleFormChange(idx, e)} required />
                </div>
                <div>
                  <Label htmlFor={`horario_inicio-${idx}`}>Horário Início</Label>
                  <Input id={`horario_inicio-${idx}`} name="horario_inicio" type="time" value={form.horario_inicio} onChange={e => handleFormChange(idx, e)} required />
                </div>
                <div>
                  <Label htmlFor={`data_inicial-${idx}`}>Data Inicial</Label>
                  <Input id={`data_inicial-${idx}`} name="data_inicial" type="date" value={form.data_inicial} onChange={e => handleFormChange(idx, e)} required />
                </div>
                <div>
                  <Label htmlFor={`data_final-${idx}`}>Data Final</Label>
                  <Input id={`data_final-${idx}`} name="data_final" type="date" value={form.data_final} onChange={e => handleFormChange(idx, e)} required />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`horarios-${idx}`}>Horários (separados por vírgula)</Label>
                  <Input id={`horarios-${idx}`} name="horarios" value={form.horarios.join(", ")} onChange={e => handleHorariosChange(idx, e)} placeholder="08:00, 20:00" required />
                </div>
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addMedicamentoField} className="mb-2">+ Adicionar Medicamento</Button>
          <div className="flex justify-end mt-2">
            <Button type="submit" variant="default">Salvar</Button>
          </div>
        </form>
      </Modal>
      <Modal
        title="Editar Medicamento"
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        size="md"
      >
        {editForm && (
          <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
            <div>
              <Label htmlFor="edit-nome">Nome</Label>
              <Input id="edit-nome" name="nome" value={editForm.nome} onChange={handleEditFormChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-quantidade_comprimidos">Qtd. Comprimidos</Label>
                <Input id="edit-quantidade_comprimidos" name="quantidade_comprimidos" type="number" value={editForm.quantidade_comprimidos} onChange={handleEditFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-quantidade_dia">Qtd. por Dia</Label>
                <Input id="edit-quantidade_dia" name="quantidade_dia" type="number" value={editForm.quantidade_dia} onChange={handleEditFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-quantidade_mes">Qtd. por Mês</Label>
                <Input id="edit-quantidade_mes" name="quantidade_mes" type="number" value={editForm.quantidade_mes} onChange={handleEditFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-intervalo_horas">Intervalo (horas)</Label>
                <Input id="edit-intervalo_horas" name="intervalo_horas" type="number" value={editForm.intervalo_horas} onChange={handleEditFormChange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-horario_inicio">Horário Início</Label>
                <Input id="edit-horario_inicio" name="horario_inicio" type="time" value={editForm.horario_inicio} onChange={handleEditFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <select id="edit-status" name="status" value={editForm.status} onChange={handleEditFormChange} className="border rounded w-full h-9 px-3">
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-data_inicial">Data Inicial</Label>
                <Input id="edit-data_inicial" name="data_inicial" type="date" value={editForm.data_inicial} onChange={handleEditFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-data_final">Data Final</Label>
                <Input id="edit-data_final" name="data_final" type="date" value={editForm.data_final} onChange={handleEditFormChange} required />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-horarios">Horários (separados por vírgula)</Label>
              <Input id="edit-horarios" name="horarios" value={editForm.horarios.join(", ")} onChange={handleEditHorariosChange} placeholder="08:00, 20:00" required />
            </div>
            <div className="flex justify-end mt-2">
              <Button type="submit" variant="default">Salvar</Button>
            </div>
          </form>
        )}
      </Modal>
      <Modal
        title="Confirmar Exclusão"
        description="Tem certeza que deseja excluir este medicamento?"
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        size="sm"
        hideFooterClose={true}
      >
        <div className="flex flex-col gap-4">
          <div className="text-center">Esta ação não pode ser desfeita.</div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}