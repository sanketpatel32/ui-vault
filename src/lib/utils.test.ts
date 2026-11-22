import { describe, expect, test } from "vite-plus/test";
import { cn } from "./utils";

describe("cn", () => {
  test("joins truthy class names", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });

  test("lets later Tailwind utilities win conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});
