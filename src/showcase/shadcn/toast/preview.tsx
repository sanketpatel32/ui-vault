import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Preview() {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <Button size="sm" onClick={() => setOpen(true)}>
        Open Toast
      </Button>
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>Notification</ToastTitle>
        <ToastDescription>Your settings have been saved successfully.</ToastDescription>
      </Toast>
      <ToastViewport className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" />
    </ToastProvider>
  );
}
