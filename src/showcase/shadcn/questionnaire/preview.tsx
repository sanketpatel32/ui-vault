import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Preview() {
  return (
    <Card className="w-80">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-semibold">How would you rate your experience?</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        <RadioGroup defaultValue="4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5" id="q5" />
            <Label htmlFor="q5">Excellent</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="q4" />
            <Label htmlFor="q4">Very Good</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="q3" />
            <Label htmlFor="q3">Average</Label>
          </div>
        </RadioGroup>
        <Button size="sm" className="w-full">
          Submit Feedback
        </Button>
      </CardContent>
    </Card>
  );
}
