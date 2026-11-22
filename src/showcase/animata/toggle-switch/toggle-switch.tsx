// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/button/toggle-switch.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
"use client";
import { useId, useState } from "react";

interface IToggleSwitchProps {
  onChange?: (value: boolean) => void;
  defaultChecked?: boolean;
}

const ToggleSwitch = ({ onChange, defaultChecked }: IToggleSwitchProps) => {
  const id = useId();
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked ?? false);
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange?.(newCheckedState);
  };

  return (
    <label htmlFor={id} className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          aria-label="Toggle switch"
          className="sr-only"
        />
        <div className={`box block h-8 w-14 rounded-full ${isChecked ? "bg-muted" : "bg-muted"}`} />
        <div
          className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full transition-all ${
            isChecked ? "translate-x-full bg-foreground/75" : "bg-foreground/50"
          }`}
        />
      </div>
    </label>
  );
};

export default ToggleSwitch;
