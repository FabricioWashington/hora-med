"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import React, { ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { AvatarAuto } from "../shared/avatar-auto";
import { menuItems } from "@/config/sidebar-menu";
import { PageWrapper } from "./pageWrapper";
import { LogOut } from "lucide-react";
import { ModalConfirmacao } from "../shared/modal-confirmacao";


function SidebarLogo() {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";
    return (
        <a href="/" className="flex items-center justify-center gap-2 px-4 py-1 cursor-pointer">
            <div className="flex-shrink-0 relative w-[196px] h-[55px]">
                <Image
                    src="/icons/logo-full.png"
                    alt="HoraMed"
                    width={196}
                    height={55}
                    className="absolute top-0 left-0 w-full h-full"
                />
            </div>
        </a>
    );
}

function SidebarMenuComponent() {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";
    const pathname = usePathname();

    return (
        <SidebarContent>
            <SidebarGroup className={isCollapsed ? "p-2" : "p-6 pt-0 pb-0"}>
                {!isCollapsed && (
                    <SidebarGroupLabel className="text-[var(--gray-neutral)] mt-5 text-xs font-bold leading-normal">
                        MENU
                    </SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    className={pathname === item.url ? "bg-primary/10" : ""}
                                >
                                    <a href={item.url} className={`flex items-center gap-2 w-full`}>
                                        <span className="w-5 h-5"><item.icon /></span>
                                        {!isCollapsed && (
                                            <span className={`font-normal text-base ${pathname === item.url ? "text-primary" : "text-[var(--text-main)]"}`}>
                                                {item.title}
                                            </span>
                                        )}
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}

function SidebarFooterConditional() {
    const name = "Usuario";
    const email = "teste@horamed.com";
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();

    function handleLogout() {
        localStorage.removeItem("isLoggedIn");
        router.replace("/login");
    }

    return (
        <SidebarFooter className="w-full flex flex-col gap-2 px-4 pb-4">
            <div className="mt-6 flex items-center gap-3 p-2 rounded-lg">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <AvatarAuto name={name} size={40} />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-(--text-main) font-medium text-sm truncate">
                        {name}
                    </span>
                    <span className="text-(--gray-neutral) font-normal text-xs truncate">
                        {email}
                    </span>
                </div>
                <button
                    className="flex items-center justify-center w-7 h-7 rounded hover:bg-gray-100"
                    title="Sair"
                    onClick={() => setModalOpen(true)}
                >
                    <LogOut className="w-5 h-5 text-[#29447E]" />
                </button>
                <ModalConfirmacao
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={handleLogout}
                    title="Deseja sair?"
                    description="Você tem certeza que deseja sair do sistema?"
                    confirmLabel="Sair"
                    cancelLabel="Cancelar"
                />
            </div>
        </SidebarFooter>
    );
}

function AppLayoutContent({ children }: { children: ReactNode }) {
    const isMobile = useIsMobile();
    return (
        <SidebarProvider defaultOpen={true}>
            <header className="w-full bg-white z-50 fixed top-0 left-0 right-0 p-2 border-b border-neutral-200">
                <div className="flex justify-between h-16 items-center gap-1 relative">
                    <div className="flex items-center gap-4">
                        {!isMobile && (
                            <SidebarHeader className="pr-4">
                                <SidebarLogo />
                            </SidebarHeader>
                        )}
                        {isMobile && <SidebarTrigger className="w-4 h-4" />}
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <h1 className="text-2xl font-semibold text-(--text-main)">
                            Bem-vindo ao HoraMed 👋
                        </h1>
                    </div>
                </div>
            </header>
            <aside className="hidden md:block bg-white z-30 fixed top-16 left-0 w-[260px] h-[calc(100vh-4rem)] overflow-y-auto shadow">
                <Sidebar variant="sidebar" collapsible="icon">
                    <SidebarMenuComponent />
                    <SidebarFooterConditional />
                </Sidebar>
            </aside>
            <main className="w-full pt-16 min-h-[calc(100vh-4rem)] md:ml-[260px] bg-neutral-50">
                <SidebarInset>
                    <PageWrapper>
                        {children}
                    </PageWrapper>
                </SidebarInset>
            </main>
        </SidebarProvider>
    );
}

export function AppLayout({ children }: { children: ReactNode }) {
    return <AppLayoutContent>{children}</AppLayoutContent>;
}