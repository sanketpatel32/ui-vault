import { ButtonGroup } from "./button-group";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="sm">
        Years
      </Button>
      <Button variant="outline" size="sm">
        Months
      </Button>
      <Button variant="outline" size="sm">
        Days
      </Button>
    </ButtonGroup>
  );
}
