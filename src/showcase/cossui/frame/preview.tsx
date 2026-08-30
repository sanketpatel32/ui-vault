import { ArrowUpRight, CreditCard, Truck } from "lucide-react";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from "./frame";

const lineClass = "flex items-center justify-between gap-4 text-sm";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <Frame className="w-full max-w-md border border-border">
          <FramePanel>
            <FrameHeader className="px-0 py-0">
              <FrameTitle>Order #4218</FrameTitle>
              <FrameDescription>
                Placed today at 09:41 — two stacked panels in a frame.
              </FrameDescription>
            </FrameHeader>
            <div className="flex flex-col gap-2.5 px-5 text-fg">
              <div className={lineClass}>
                <span className="inline-flex items-center gap-2 text-muted-fg">
                  <Truck className="size-4" />
                  Shipping
                </span>
                <span>Express (2 days)</span>
              </div>
              <div className={lineClass}>
                <span className="inline-flex items-center gap-2 text-muted-fg">
                  <CreditCard className="size-4" />
                  Payment
                </span>
                <span>•••• 4242</span>
              </div>
              <div className={`${lineClass} font-medium`}>
                <span>Total</span>
                <span>$128.00</span>
              </div>
            </div>
            <FrameFooter className="px-0 py-0">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                Track order
                <ArrowUpRight className="size-4" />
              </button>
            </FrameFooter>
          </FramePanel>
          <FramePanel>
            <FrameHeader className="px-0 py-0">
              <FrameTitle>Delivery updates</FrameTitle>
              <FrameDescription>We’ll email you when the parcel is on its way.</FrameDescription>
            </FrameHeader>
          </FramePanel>
        </Frame>
      </div>
    </div>
  );
}
