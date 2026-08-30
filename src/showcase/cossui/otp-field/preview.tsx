import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { OTPField, OTPFieldInput, OTPFieldSeparator } from "./otp-field";

export default function Preview() {
  const [value, setValue] = useState("");
  const [complete, setComplete] = useState(false);

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <OTPField
          length={6}
          onValueChange={(newValue) => {
            setValue(newValue);
            setComplete(false);
          }}
          onValueComplete={(newValue) => {
            setValue(newValue);
            setComplete(true);
          }}
          value={value}
        >
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldSeparator />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
        </OTPField>
        <p className="flex items-center gap-1.5 text-xs text-muted-fg">
          {complete ? (
            <>
              <CheckIcon aria-hidden="true" className="size-3.5" />
              Code complete — verified
            </>
          ) : (
            <>Type or paste the 6-digit code ({value.length}/6)</>
          )}
        </p>
      </div>
    </div>
  );
}
