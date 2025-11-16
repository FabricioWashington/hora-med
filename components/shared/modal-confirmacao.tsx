"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ModalConfirmacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function ModalConfirmacao({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmação",
  description = "Você tem certeza que deseja continuar?",
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
}: ModalConfirmacaoProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-[455px] p-6">
        <DialogTitle className="text-font-default font-medium">
          {title}
        </DialogTitle>

        <p className="text-font-default font-medium">{description}</p>

        <div className="flex justify-between gap-4 mt-4">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
          <Button
            variant="ghost"
            className="flex-1 text-primary-pastel"
            onClick={onClose}
          >
            {cancelLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
