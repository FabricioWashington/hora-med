export default function PerfilPage() {
  const paciente = {
    nome: "João da Silva",
    email: "joao@email.com",
    idade: 42,
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-[--text-main]">Perfil</h2>
      <div className="bg-zinc-100 rounded-lg p-6 flex flex-col gap-4">
        <div>
          <span className="font-semibold text-[--text-main]">Nome:</span>
          <span className="ml-2 text-[--gray-neutral]">{paciente.nome}</span>
        </div>
        <div>
          <span className="font-semibold text-[--text-main]">Email:</span>
          <span className="ml-2 text-[--gray-neutral]">{paciente.email}</span>
        </div>
        <div>
          <span className="font-semibold text-[--text-main]">Idade:</span>
          <span className="ml-2 text-[--gray-neutral]">{paciente.idade}</span>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold">Editar Perfil</button>
      </div>
    </div>
  );
}
