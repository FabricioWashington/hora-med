"use client";

import { ReactNode, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  const texts = [
    {
      title: "Horários inteligentes para sua receita.",
      subtitle: "Deixe a IA organizar seus atendimentos médicos automaticamente.",
    },
    {
      title: "Agendamento otimizado por IA.",
      subtitle: "Receba sugestões de horários ideais conforme sua rotina e demanda.",
    },
    {
      title: "Mais tempo para cuidar dos pacientes.",
      subtitle: "Menos preocupação com agenda, mais foco na saúde.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (isMobile) {
    return (
      <div className="w-full px-4 pt-0 min-w-full">
        <div className="max-w-full mx-auto">{children}</div>
      </div>
    );
  }

  return (
    <div className="md:flex w-full min-h-screen bg-white">
      <div className="md:w-1/2 flex items-center justify-center md:h-screen">
        <div className="w-full md:max-w-2xl flex flex-col gap-6 fixed md:relative">
          {children}
        </div>
      </div>
      <div
        className="md:w-1/2 relative flex items-center justify-center overflow-hidden bg-[#123356]"
      >
        <div className="flex flex-col items-center w-full max-w-full relative">
          <Image
            src="/images/banner.png"
            alt="HoraMed"
            width={1000}
            height={500}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
