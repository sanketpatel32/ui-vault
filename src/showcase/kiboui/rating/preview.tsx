import { useState } from "react";
import { Rating, RatingButton } from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/rating), wrapped in state so the
// chosen value is visible.

export default function Preview() {
  const [value, setValue] = useState(4);

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Rating onValueChange={setValue} value={value}>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} />
          ))}
        </Rating>
        <p className="text-muted-fg text-xs">
          Rated: <span className="font-medium text-fg">{value} / 5</span>
        </p>
      </div>
    </div>
  );
}
