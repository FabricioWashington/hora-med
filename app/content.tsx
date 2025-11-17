"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, PlusCircle, Pill } from "lucide-react";
import { ReviewReceitasHorarios } from "@/components/shared/ReviewReceitasHorarios";

const horarios = [
    { hora: "08:00", medicamento: "Dipirona 500mg" },
    { hora: "12:00", medicamento: "Losartana 50mg" },
    { hora: "18:00", medicamento: "Metformina 850mg" },
];

const receitas = [
    {
        medicamento: "Dipirona 500mg",
        dosesRestantes: 6,
        dosesPorDia: 2,
    },
    {
        medicamento: "Losartana 50mg",
        dosesRestantes: 10,
        dosesPorDia: 1,
    },
    {
        medicamento: "Metformina 850mg",
        dosesRestantes: 12,
        dosesPorDia: 2,
    },
];

export function Content() {
    const [iaStatus, setIaStatus] = useState<"idle" | "loading" | "done">("idle");

    return (
        <div className="min-h-screen flex flex-col gap-6 px-2 sm:px-4 py-6 sm:py-8 text-zinc-800 w-full">
            <h1 className="text-2xl font-bold text-start text-[--text-main]">Olá! Aqui está seu dia</h1>
            <p className="text-start text-zinc-500 mb-2">Resumo dos horários e medicamentos ativos.</p>

            <div className="w-full mt-6 flex flex-col items-center">
                <div className="w-full max-w-full md:max-w-4xl">
                    <ReviewReceitasHorarios />
                </div>
            </div>
        </div>
    );
}
