"use client";

import React, { useEffect, useState } from "react";
import { getReceitas } from "@/services/receita.service";
import type { Receita, MedicamentoReceita } from "@/types/receita";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Content() {
    const [receitas, setReceitas] = useState<Receita[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState<MedicamentoReceita>({
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
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name.startsWith("quantidade") || name === "intervalo_horas" ? Number(value) : value
        }));
    }

    function handleHorariosChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm((prev) => ({
            ...prev,
            horarios: e.target.value.split(",").map(h => h.trim())
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setModalOpen(false);
    }

    useEffect(() => {
        if (typeof window !== "undefined" && "Notification" in window) {
            if (Notification.permission === "default") {
                Notification.requestPermission();
            }
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/medication-sw.js');
            }
        }
    }, []);

    useEffect(() => {
        async function fetchReceitas() {
            setLoading(true);
            try {
                const data = await getReceitas();
                setReceitas(data);

                if (typeof window !== "undefined" && 'serviceWorker' in navigator && Notification.permission === "granted") {
                    navigator.serviceWorker.ready.then((registration) => {
                        data.forEach((r) => {
                            let meds: MedicamentoReceita[] = [];
                            if (typeof r.medicamentos === "string") {
                                try {
                                    if (r.medicamentos.trim().startsWith("[")) {
                                        meds = JSON.parse(r.medicamentos);
                                    }
                                } catch {}
                            } else if (Array.isArray(r.medicamentos)) {
                                meds = r.medicamentos;
                            }
                            meds.forEach((med) => {
                                registration.active?.postMessage({
                                    type: 'schedule-medication',
                                    horarios: med.horarios,
                                    nome: med.nome
                                });
                            });
                        });
                    });
                }
            } finally {
                setLoading(false);
            }
        }
        fetchReceitas();
    }, []);

    const receitasAtivas = receitas.length;
    const ultimaReceita = receitas.length > 0 ? receitas[receitas.length - 1] : null;
    const mediaMedicamentos = receitas.length > 0
        ? Math.round(
            receitas.reduce((acc, r) => {
                let meds: MedicamentoReceita[] = [];
                if (typeof r.medicamentos === "string") {
                    try {
                        if (r.medicamentos.trim().startsWith("[")) {
                            meds = JSON.parse(r.medicamentos);
                        }
                    } catch {}
                } else if (Array.isArray(r.medicamentos)) {
                    meds = r.medicamentos;
                }
                return acc + meds.length;
            }, 0) / receitas.length
        )
        : 0;

    const statusData = Object.values(
        receitas.reduce((acc: Record<string, { name: string; value: number }>, r) => {
            acc[r.medico] = acc[r.medico]
                ? { name: r.medico, value: acc[r.medico].value + 1 }
                : { name: r.medico, value: 1 };
            return acc;
        }, {})
    );

    const medCount: Record<string, number> = {};
    receitas.forEach(r => {
        let meds: MedicamentoReceita[] = [];
        if (typeof r.medicamentos === "string") {
            try {
                if (r.medicamentos.trim().startsWith("[")) {
                    meds = JSON.parse(r.medicamentos);
                }
            } catch {}
        } else if (Array.isArray(r.medicamentos)) {
            meds = r.medicamentos;
        }
        meds.forEach(m => {
            medCount[m.nome] = (medCount[m.nome] || 0) + 1;
        });
    });
    const medicamentosMaisUsados = Object.entries(medCount).map(([name, quantidade]) => ({ name, quantidade }));

    const horarioCount: Record<string, number> = {};
    receitas.forEach(r => {
        let meds: MedicamentoReceita[] = [];
        if (typeof r.medicamentos === "string") {
            try {
                if (r.medicamentos.trim().startsWith("[")) {
                    meds = JSON.parse(r.medicamentos);
                }
            } catch {}
        } else if (Array.isArray(r.medicamentos)) {
            meds = r.medicamentos;
        }
        meds.forEach(m => m.horarios.forEach(h => {
            const hora = new Date(h).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            horarioCount[hora] = (horarioCount[hora] || 0) + 1;
        }));
    });
    const horariosMaisComuns = Object.entries(horarioCount).map(([horario, frequencia]) => ({ horario, frequencia }));

    return (
        <div className="min-h-screen px-4 py-6 md:px-8 text-zinc-800">
            <div className="flex items-center justify-between gap-4 mb-1">
                <h1 className="text-3xl font-bold text-[--tertiary]">Dashboard de Receitas</h1>
                <Button variant="default" size="sm" className="flex items-center gap-2 cursor-pointer" onClick={() => setModalOpen(true)}>
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Cadastrar Medicamento</span>
                </Button>
            </div>
            <Modal
                title="Cadastrar Medicamento"
                open={modalOpen}
                onOpenChange={setModalOpen}
                size="md"
            >
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="nome">Nome</Label>
                        <Input id="nome" name="nome" value={form.nome} onChange={handleChange} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="quantidade_comprimidos">Qtd. Comprimidos</Label>
                            <Input id="quantidade_comprimidos" name="quantidade_comprimidos" type="number" value={form.quantidade_comprimidos} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="quantidade_dia">Qtd. por Dia</Label>
                            <Input id="quantidade_dia" name="quantidade_dia" type="number" value={form.quantidade_dia} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="quantidade_mes">Qtd. por Mês</Label>
                            <Input id="quantidade_mes" name="quantidade_mes" type="number" value={form.quantidade_mes} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="intervalo_horas">Intervalo (horas)</Label>
                            <Input id="intervalo_horas" name="intervalo_horas" type="number" value={form.intervalo_horas} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="horario_inicio">Horário Início</Label>
                            <Input id="horario_inicio" name="horario_inicio" type="time" value={form.horario_inicio} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <select id="status" name="status" value={form.status} onChange={handleChange} className="border rounded w-full h-9 px-3">
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="data_inicial">Data Inicial</Label>
                            <Input id="data_inicial" name="data_inicial" type="date" value={form.data_inicial} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="data_final">Data Final</Label>
                            <Input id="data_final" name="data_final" type="date" value={form.data_final} onChange={handleChange} required />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="horarios">Horários (separados por vírgula)</Label>
                        <Input id="horarios" name="horarios" value={form.horarios.join(", ")} onChange={handleHorariosChange} placeholder="08:00, 20:00" required />
                    </div>
                    <div className="flex justify-end mt-2">
                        <Button type="submit" variant="default">Salvar</Button>
                    </div>
                </form>
            </Modal>
            <p className="text-[--secondary] mb-6">Acompanhe seus dados e insights médicos em tempo real.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-lg border border-[--primary]">
                    <CardContent className="text-center p-6">
                        <h2 className="text-lg font-medium text-[--tertiary]">Receitas Ativas</h2>
                        <p className="text-5xl font-semibold text-[--primary] mt-2">{loading ? "..." : receitasAtivas}</p>
                    </CardContent>
                </Card>

                <Card className="shadow-lg border border-[--primary]">
                    <CardContent className="text-center p-6">
                        <h2 className="text-lg font-medium text-[--tertiary]">Última Receita</h2>
                        <p className="text-3xl font-semibold text-[--primary] mt-2">{loading ? "..." : ultimaReceita ? new Date(ultimaReceita.created).toLocaleDateString() : "--/--/----"}</p>
                    </CardContent>
                </Card>

                <Card className="shadow-lg border border-[--primary]">
                    <CardContent className="text-center p-6">
                        <h2 className="text-lg font-medium text-[--tertiary]">Média de Medicamentos</h2>
                        <p className="text-4xl font-semibold text-[--primary] mt-2">{loading ? "..." : mediaMedicamentos}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">

                <Card className="shadow-md">
                    <CardContent className="p-6">
                        <h2 className="text-lg font-semibold text-[--tertiary] mb-4">Medicamentos Mais Usados</h2>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={medicamentosMaisUsados}>
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="quantidade" fill="#0A6CF1" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}