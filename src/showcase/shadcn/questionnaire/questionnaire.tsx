import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function Questionnaire() {
  const [selected, setSelected] = useState("option-1");

  return (
    <div className="w-72 rounded-xl border border-border bg-panel p-4 shadow-xs space-y-3">
      <h4 className="text-xs font-semibold text-fg">How satisfied are you with UI Vault?</h4>
      <RadioGroup value={selected} onValueChange={setSelected} className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-1" id="q1" />
          <Label htmlFor="q1" className="text-xs cursor-pointer">
            Very Satisfied
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-2" id="q2" />
          <Label htmlFor="q2" className="text-xs cursor-pointer">
            Satisfied
          </Label>
        </div>
      </RadioGroup>
      <Button size="sm" className="w-full mt-2">
        Submit Feedback
      </Button>
    </div>
  );
}
