"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { confirmPaymentAndSendMagazine } from "@/app/actions/orders";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

type OrderActionsProps = {
  paymentId: string;
  disabled?: boolean;
};

export function OrderActions({ paymentId, disabled }: OrderActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleConfirmAndSend() {
    setLoading(true);
    const result = await confirmPaymentAndSendMagazine(paymentId);
    setLoading(false);

    if (result.success) {
      toast.success(result.message || "Magazine email sent");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to send magazine email");
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      className="gap-2"
      onClick={handleConfirmAndSend}
      disabled={disabled || loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Send className="h-4 w-4" />
      )}
      {disabled ? "Sent" : "Confirm & send"}
    </Button>
  );
}
