import Component from "./p-otp-field-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Component />
        <p className="text-xs text-muted-fg">
          Type a 4-digit one-time passcode — focus jumps slot to slot.
        </p>
      </div>
    </div>
  );
}
