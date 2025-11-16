export default function HorariosPage() {
  const horarios = [
    { hora: "08:00", medicamento: "Dipirona 500mg" },
    { hora: "12:00", medicamento: "Losartana 50mg" },
    { hora: "18:00", medicamento: "Metformina 850mg" },
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-[--text-main]">Meus Horários</h2>
      <div className="flex flex-col gap-4">
        {horarios.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between bg-zinc-100 rounded-lg px-4 py-3">
            <span className="font-semibold text-[--text-main]">{item.hora}</span>
            <span className="text-[--gray-neutral]">{item.medicamento}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold">Adicionar Horário</button>
      </div>
    </div>
  );
}
