import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function Preview() {
  const handleClick = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={handleClick}>Trigger Confetti 🎉</Button>
    </div>
  );
}
