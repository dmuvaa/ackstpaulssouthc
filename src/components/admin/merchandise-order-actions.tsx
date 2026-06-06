"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  addPaymentAdminNote,
  confirmMerchandisePayment,
  rejectPayment,
  requestCustomerFollowUp,
  resetPaymentToPending,
  updateMerchandiseFulfillment,
  updatePaymentMpesaCode,
} from "@/app/actions/orders";
import type { FulfillmentStatus, PurchasePaymentRow } from "@/app/actions/orders";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  MapPin,
  MoreHorizontal,
  Package,
  PackageCheck,
  RefreshCw,
  StickyNote,
  Truck,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

type MerchandiseOrderActionsProps = {
  payment: PurchasePaymentRow;
};

type DialogAction =
  | "reject"
  | "update-mpesa"
  | "add-note"
  | "follow-up"
  | null;

const dialogCopy: Record<
  Exclude<DialogAction, null>,
  { title: string; description: string; submitLabel: string }
> = {
  reject: {
    title: "Reject this merchandise order",
    description:
      "Use this when payment cannot be verified, the item is out of stock, or the order should not be fulfilled. The buyer will need to be contacted separately if they already paid. Record a clear reason for parish records.",
    submitLabel: "Reject order",
  },
  "update-mpesa": {
    title: "Correct the M-Pesa code",
    description:
      "Update the confirmation code if the buyer submitted the wrong one or you located the correct entry in your PayBill statement. Verify amount and phone before confirming the order.",
    submitLabel: "Save M-Pesa code",
  },
  "add-note": {
    title: "Add an internal admin note",
    description:
      "Record collection arrangements, delivery instructions, stock checks, or phone conversations. These notes help the parish office team coordinate physical handover.",
    submitLabel: "Save note",
  },
  "follow-up": {
    title: "Flag for customer follow-up",
    description:
      "Use when you need the buyer's delivery address, preferred pickup time, size confirmation, or corrected contact details before fulfilling the order.",
    submitLabel: "Flag follow-up",
  },
};

const fulfillmentLabels: Record<FulfillmentStatus, string> = {
  pending: "Awaiting payment confirmation",
  confirmed: "Payment confirmed — arrange delivery",
  ready_for_pickup: "Ready for parish pickup",
  shipped: "Out for delivery",
  delivered: "Delivered to buyer",
  cancelled: "Order cancelled",
};

export function MerchandiseOrderActions({ payment }: MerchandiseOrderActionsProps) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [dialogAction, setDialogAction] = useState<DialogAction>(null);
  const [dialogValue, setDialogValue] = useState("");

  const isFailed = payment.status === "failed";
  const isDelivered = payment.fulfillment_status === "delivered";
  const canConfirm =
    payment.status === "pending" && payment.fulfillment_status !== "cancelled";

  async function runAction(
    actionKey: string,
    action: () => Promise<{ success: boolean; message?: string; error?: string }>
  ) {
    setLoadingAction(actionKey);
    const result = await action();
    setLoadingAction(null);

    if (result.success) {
      toast.success(result.message || "Action completed");
      router.refresh();
    } else {
      toast.error(result.error || "Action failed");
    }
  }

  async function handleConfirmPayment() {
    await runAction("confirm", () => confirmMerchandisePayment(payment.id));
  }

  async function handleFulfillment(status: FulfillmentStatus) {
    await runAction(status, () =>
      updateMerchandiseFulfillment(payment.id, status)
    );
  }

  async function handleDialogSubmit() {
    if (!dialogAction) return;

    const handlers: Record<
      Exclude<DialogAction, null>,
      () => Promise<{ success: boolean; message?: string; error?: string }>
    > = {
      reject: () => rejectPayment(payment.id, dialogValue),
      "update-mpesa": () => updatePaymentMpesaCode(payment.id, dialogValue),
      "add-note": () => addPaymentAdminNote(payment.id, dialogValue),
      "follow-up": () => requestCustomerFollowUp(payment.id, dialogValue),
    };

    setLoadingAction(dialogAction);
    const result = await handlers[dialogAction]();
    setLoadingAction(null);

    if (result.success) {
      toast.success(result.message || "Saved");
      setDialogAction(null);
      setDialogValue("");
      router.refresh();
    } else {
      toast.error(result.error || "Action failed");
    }
  }

  function openDialog(action: DialogAction, initialValue = "") {
    setDialogAction(action);
    setDialogValue(initialValue);
  }

  const deliveryInfo =
    payment.delivery_preference === "pickup"
      ? "Buyer requested parish pickup. Contact them to arrange a collection time at ACK St Paul's."
      : payment.delivery_preference === "delivery"
        ? payment.delivery_address
          ? `Deliver to: ${payment.delivery_address}`
          : "Buyer requested delivery but no address was captured — follow up before shipping."
        : "No delivery preference recorded. Confirm how the buyer wants to receive the item.";

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="rounded-lg border border-blue-200 bg-blue-50/80 p-4 text-sm text-blue-950">
        <p className="font-semibold">Physical merchandise fulfillment</p>
        <p className="mt-2 leading-relaxed">
          Merchandise must be handed over in person or delivered. First confirm the
          M-Pesa payment, then update fulfillment status as you prepare, ship, or
          complete pickup. Current status:{" "}
          <span className="font-semibold">
            {fulfillmentLabels[payment.fulfillment_status]}
          </span>
          .
        </p>
        <p className="mt-2 leading-relaxed">{deliveryInfo}</p>
        {payment.rejection_reason && (
          <p className="mt-2 font-medium text-destructive">
            Rejection reason: {payment.rejection_reason}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          className="gap-2"
          onClick={handleConfirmPayment}
          disabled={!canConfirm || loadingAction === "confirm"}
        >
          {loadingAction === "confirm" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          {payment.status === "success" ? "Payment confirmed" : "Confirm payment"}
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-2"
          disabled={
            payment.status !== "success" ||
            isDelivered ||
            loadingAction === "ready_for_pickup"
          }
          onClick={() => handleFulfillment("ready_for_pickup")}
        >
          <Package className="h-4 w-4" />
          Ready for pickup
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-2"
          disabled={
            payment.status !== "success" ||
            isDelivered ||
            loadingAction === "shipped"
          }
          onClick={() => handleFulfillment("shipped")}
        >
          <Truck className="h-4 w-4" />
          Mark shipped
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-2"
          disabled={
            payment.status !== "success" ||
            isDelivered ||
            loadingAction === "delivered"
          }
          onClick={() => handleFulfillment("delivered")}
        >
          <PackageCheck className="h-4 w-4" />
          Mark delivered
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" size="sm" variant="outline" className="gap-2">
              <MoreHorizontal className="h-4 w-4" />
              Other Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Merchandise order actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              disabled={loadingAction !== null}
              onClick={() =>
                openDialog("update-mpesa", payment.mpesa_receipt || "")
              }
            >
              <RefreshCw className="h-4 w-4" />
              <div>
                <p className="font-medium">Update M-Pesa code</p>
                <p className="text-xs text-muted-foreground">
                  Correct payment reference before confirming
                </p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={isFailed || loadingAction !== null}
              onClick={() => openDialog("reject")}
            >
              <XCircle className="h-4 w-4" />
              <div>
                <p className="font-medium">Reject order</p>
                <p className="text-xs text-muted-foreground">
                  Invalid payment or cannot fulfill
                </p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!isFailed || loadingAction !== null}
              onClick={() =>
                runAction("reset", () => resetPaymentToPending(payment.id))
              }
            >
              <RefreshCw className="h-4 w-4" />
              <div>
                <p className="font-medium">Reset to pending</p>
                <p className="text-xs text-muted-foreground">
                  Re-review after buyer provides new details
                </p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              disabled={loadingAction !== null}
              onClick={() => openDialog("follow-up")}
            >
              <AlertTriangle className="h-4 w-4" />
              <div>
                <p className="font-medium">Request buyer follow-up</p>
                <p className="text-xs text-muted-foreground">
                  Missing address, size, or contact details
                </p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={loadingAction !== null}
              onClick={() => openDialog("add-note")}
            >
              <StickyNote className="h-4 w-4" />
              <div>
                <p className="font-medium">Add admin note</p>
                <p className="text-xs text-muted-foreground">
                  Record pickup times or delivery coordination
                </p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={loadingAction !== null}
              onClick={() => {
                const details = [
                  `Item: ${payment.product_title}`,
                  `Buyer: ${payment.customer_name}`,
                  `Phone: ${payment.phone}`,
                  `Email: ${payment.customer_email || "not provided"}`,
                  payment.delivery_address
                    ? `Address: ${payment.delivery_address}`
                    : null,
                  `M-Pesa: ${payment.mpesa_receipt || "not provided"}`,
                ]
                  .filter(Boolean)
                  .join("\n");
                navigator.clipboard.writeText(details);
                toast.success("Order details copied to clipboard");
              }}
            >
              <MapPin className="h-4 w-4" />
              <div>
                <p className="font-medium">Copy order details</p>
                <p className="text-xs text-muted-foreground">
                  Paste into SMS, WhatsApp, or parish records
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {(payment.admin_notes?.length ?? 0) > 0 && (
        <div className="rounded-lg border bg-background p-3 text-sm">
          <p className="mb-2 font-semibold">Admin notes</p>
          <ul className="space-y-2">
            {(payment.admin_notes ?? []).map((entry, index) => (
              <li key={`${entry.added_at}-${index}`} className="text-muted-foreground">
                <span className="block text-xs">
                  {new Intl.DateTimeFormat("en-KE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(entry.added_at))}
                </span>
                <span className="text-foreground">{entry.note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Dialog
        open={dialogAction !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDialogAction(null);
            setDialogValue("");
          }
        }}
      >
        <DialogContent>
          {dialogAction && (
            <>
              <DialogHeader>
                <DialogTitle>{dialogCopy[dialogAction].title}</DialogTitle>
                <DialogDescription>
                  {dialogCopy[dialogAction].description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2">
                {dialogAction === "update-mpesa" ? (
                  <>
                    <Label htmlFor="mpesa-code">M-Pesa confirmation code</Label>
                    <Input
                      id="mpesa-code"
                      value={dialogValue}
                      onChange={(event) =>
                        setDialogValue(event.target.value.toUpperCase())
                      }
                      placeholder="e.g. RFT123ABC4"
                    />
                  </>
                ) : (
                  <>
                    <Label htmlFor="dialog-value">
                      {dialogAction === "reject"
                        ? "Rejection reason"
                        : dialogAction === "follow-up"
                          ? "What do you need from the buyer?"
                          : "Note"}
                    </Label>
                    <Textarea
                      id="dialog-value"
                      value={dialogValue}
                      onChange={(event) => setDialogValue(event.target.value)}
                      placeholder={
                        dialogAction === "reject"
                          ? "e.g. Item out of stock — refund arranged at parish office"
                          : dialogAction === "follow-up"
                            ? "e.g. Need delivery address for South C area"
                            : "e.g. Buyer collecting Sunday after 10am service"
                      }
                    />
                  </>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogAction(null);
                    setDialogValue("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant={dialogAction === "reject" ? "destructive" : "default"}
                  disabled={!dialogValue.trim() || loadingAction === dialogAction}
                  onClick={handleDialogSubmit}
                >
                  {loadingAction === dialogAction ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    dialogCopy[dialogAction].submitLabel
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
