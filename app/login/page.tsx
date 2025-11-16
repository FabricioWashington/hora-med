"use client";
import AuthLayout from "@/components/layout/authLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  senha: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>();
  const router = useRouter();

  function onSubmit(data: LoginForm) {
    if (data.email === "teste@horamed.com" && data.senha === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    } else {
      setError("senha", { type: "manual", message: "Email ou senha inválidos" });
    }
  }

  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center bg-background">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card p-8 rounded-xl shadow w-full max-w-sm flex flex-col gap-4 border"
        >
          <div className="flex flex-col items-center">
            <img src="/icons/logo-full.png" alt="Logo HoraMed" className="h-16 mb-1" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">Entrar</h1>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Informe o email" })}
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email.message}</div>
          )}
          <Input
            type="password"
            placeholder="Senha"
            {...register("senha", { required: "Informe a senha" })}
          />
          {errors.senha && (
            <div className="text-red-500 text-sm">{errors.senha.message}</div>
          )}
          <Button type="submit" className="w-full">Entrar</Button>
        </form>
      </div>
    </AuthLayout>
  );
}
