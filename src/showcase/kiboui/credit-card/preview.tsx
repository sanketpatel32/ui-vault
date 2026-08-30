import { useState } from "react";
import {
  CreditCard,
  CreditCardBack,
  CreditCardChip,
  CreditCardCvv,
  CreditCardExpiry,
  CreditCardFlipper,
  CreditCardFront,
  CreditCardLogo,
  CreditCardMagStripe,
  CreditCardName,
  CreditCardNumber,
  CreditCardServiceProvider,
} from "./index";

type Brand = "Visa" | "Mastercard" | "AmericanExpress";

const brands: Brand[] = ["Visa", "Mastercard", "AmericanExpress"];

export default function Preview() {
  const [brand, setBrand] = useState<Brand>("Visa");

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-5 p-6">
        <p className="text-muted-fg text-xs">Hover (or tap) the card to flip it over</p>

        <CreditCard className="max-w-xs">
          <CreditCardFlipper>
            <CreditCardFront className="bg-gradient-to-br from-violet-600 via-indigo-700 to-slate-900">
              <CreditCardLogo>
                <span className="flex size-full items-center justify-center rounded-md bg-white/90 text-[9px] font-bold tracking-tight text-slate-900">
                  KIBO
                </span>
              </CreditCardLogo>

              <div className="flex h-full flex-col justify-between pt-8">
                <CreditCardChip />
                <CreditCardNumber className="mb-3 text-base tracking-[0.18em]">
                  4242 4242 4242 4242
                </CreditCardNumber>
                <div className="flex items-end justify-between">
                  <div className="flex flex-col gap-1">
                    <CreditCardName className="text-[10px] opacity-70">Card Holder</CreditCardName>
                    <CreditCardName className="text-sm">Alex Morgan</CreditCardName>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <CreditCardExpiry className="text-[10px] opacity-70">Expires</CreditCardExpiry>
                    <CreditCardExpiry className="text-sm">09/29</CreditCardExpiry>
                  </div>
                  <CreditCardServiceProvider type={brand} />
                </div>
              </div>
            </CreditCardFront>

            <CreditCardBack className="bg-gradient-to-br from-violet-600 via-indigo-700 to-slate-900">
              <CreditCardMagStripe />
              <div className="absolute right-4 bottom-4 flex flex-col items-end gap-1">
                <span className="text-[10px] text-white/70">CVV</span>
                <div className="rounded bg-white px-2 py-0.5">
                  <CreditCardCvv className="text-sm text-slate-900">123</CreditCardCvv>
                </div>
              </div>
              <p className="absolute bottom-4 left-4 text-[10px] text-white/70">
                Kibo Bank — demo card
              </p>
            </CreditCardBack>
          </CreditCardFlipper>
        </CreditCard>

        <div className="flex items-center gap-2">
          {brands.map((b) => (
            <button
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                brand === b
                  ? "border-transparent bg-accent text-accent-fg"
                  : "border-border bg-panel text-muted-fg hover:text-fg"
              }`}
              key={b}
              onClick={() => setBrand(b)}
              type="button"
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
