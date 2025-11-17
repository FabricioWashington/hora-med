"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type ModalProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  closeText?: string;
  hideFooterClose?: boolean;
};

const sizeMap: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-2xl",
};

export function Modal({
  title,
  description,
  children,
  trigger,
  open,
  onOpenChange,
  className,
  size = "lg",
  closeText = "Fechar",
  hideFooterClose,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

      <DialogContent
        className={cn(
          "bg-background fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg",
          sizeMap[size],
          className
        )}
      >
        <DialogHeader className="pr-8">
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>

        <DialogClose
          className="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
          aria-label="Fechar"
        >
        </DialogClose>

        <div>{children}</div>

        {!hideFooterClose && (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{closeText}</Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
