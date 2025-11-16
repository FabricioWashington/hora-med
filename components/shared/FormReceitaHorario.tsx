import React, { useState, useEffect } from "react";

export interface ReceitaHorarioItem {
  id: string;
  receita: string;
  horario: string;
}

const STORAGE_KEY = "receitasHorarios";

export function useReceitasHorarios() {
  const [items, setItems] = useState<ReceitaHorarioItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(receita: string, horario: string) {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), receita, horario },
    ]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return { items, addItem, removeItem };
}

export function FormReceitaHorario() {
  const { items, addItem, removeItem } = useReceitasHorarios();
  const [receita, setReceita] = useState("");
  const [horario, setHorario] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!receita || !horario) return;
    addItem(receita, horario);
    setReceita("");
    setHorario("");
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Receita"
          value={receita}
          onChange={(e) => setReceita(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Horário"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-primary text-white p-2 rounded">
          Adicionar
        </button>
      </form>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center border p-2 rounded">
            <span>
              <strong>{item.receita}</strong> - {item.horario}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:underline"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
