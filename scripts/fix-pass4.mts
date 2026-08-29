// Pass 4: shims for unpublished wm deps (input-group, carousel), dashboard prop micro-fixes,
// comp-variant previews for tree + image-cropper, prop'd block previews.
import { existsSync, readFileSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const put = (f: string, c: string) => writeFileSync(f, c);

// ---------- 1. input-group shim (registry dep has no published item) ----------
put(
  "src/showcase/_shared/watermelon/input-group.tsx",
  `import * as React from "react";
import { cn } from "@/lib/utils";

// Minimal shim: the watermelon "input-group" registry dependency has no published item
// (checked 2026-08-29). API follows the shadcn input-group conventions the dashboards use.
export const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-9 w-full items-center rounded-md border border-border bg-transparent text-sm shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50",
        className,
      )}
      {...props}
    />
  ),
);
InputGroup.displayName = "InputGroup";

export const InputGroupInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full min-w-0 bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
InputGroupInput.displayName = "InputGroupInput";

export const InputGroupAddon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("flex items-center gap-1.5 px-3 text-muted-foreground [&>svg]:size-4", className)}
      {...props}
    />
  ),
);
InputGroupAddon.displayName = "InputGroupAddon";
`,
);

// ---------- 2. carousel shim (canonical shadcn embla carousel, MIT) ----------
put(
  "src/showcase/_shared/watermelon/carousel.tsx",
  `import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/showcase/_shared/watermelon/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

interface CarouselContextProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  options?: CarouselOptions;
  orientation: "horizontal" | "vertical";
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return (
      <CarouselContext.Provider
        value={{ carouselRef, api: api as CarouselApi, options: opts, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
      >
        <div
          onKeyDownCapture={(e) => {
            if (e.key === "ArrowLeft") { e.preventDefault(); scrollPrev(); }
            else if (e.key === "ArrowRight") { e.preventDefault(); scrollNext(); }
          }}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return (
      <div
        role="group"
        aria-roledescription="slide"
        ref={ref}
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { scrollPrev, canScrollPrev, orientation } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("absolute size-8 rounded-full", orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", !canScrollPrev && "pointer-events-none opacity-50", className)}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="size-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { scrollNext, canScrollNext, orientation } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("absolute size-8 rounded-full", orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", !canScrollNext && "pointer-events-none opacity-50", className)}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="size-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel };
`,
);

// point testimonials-1 at the shim
{
  const f = "src/showcase/watermelon/testimonial-blocks/testimonials-1.tsx";
  put(
    f,
    readFileSync(f, "utf8").replaceAll(
      '"@/components/ui/carousel"',
      '"@/showcase/_shared/watermelon/carousel"',
    ),
  );
}

// ---------- 3. dashboard prop micro-fixes (their code drifts from their published base items) ----------
{
  const f =
    "src/showcase/watermelon/dashboard-agndex/src/components/dashboards/agndex-dashboard/components/agndex/sidebar.tsx";
  put(f, readFileSync(f, "utf8").replaceAll('<Avatar size="sm">', "<Avatar>"));
}
{
  const f =
    "src/showcase/watermelon/dashboard-jobtracker/src/components/dashboards/jobtracker-dashboard/components/layout/top-navbar.tsx";
  put(f, readFileSync(f, "utf8").replaceAll('size="icon-lg"', 'size="icon"'));
}
{
  const f =
    "src/showcase/watermelon/dashboard-jobtracker/src/components/dashboards/jobtracker-dashboard/components/dashboard/job-details/job-details-content.tsx";
  put(f, readFileSync(f, "utf8").replace('variant="line"\n          className=', "className="));
}

// ---------- 4. tree + image-cropper: replace with self-contained comp variants ----------
const cfg = readFileSync(".vcache/origin-config.ts", "utf8");
const famComps = new Map<string, string[]>();
for (const m of cfg.matchAll(/components: \[([\s\S]*?)\],\s*name: "[^"]*",\s*slug: "([^"]+)"/g)) {
  famComps.set(
    m[2],
    [...m[1].matchAll(/name: "(comp-\d+)"/g)].map((x) => x[1]),
  );
}
for (const fam of ["tree", "image-cropper"]) {
  const comp0 = famComps.get(fam)?.[0];
  if (!comp0) {
    console.log(`no comp for ${fam}`);
    continue;
  }
  const res = await fetch(`https://coss.com/origin/r/${comp0}.json`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const text = await res.text();
  if (!res.ok || !text.trimStart().startsWith("{")) {
    console.log(`fetch fail ${comp0}`);
    continue;
  }
  const item = JSON.parse(text);
  writeFileSync(`.vcache/originui-${comp0}.json`, JSON.stringify(item));
  const outDir = `src/showcase/originui/${fam}`;
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  let main = "";
  for (const f of item.files ?? []) {
    const base = (f.path ?? "").split("/").pop()!;
    if (!/\.(tsx|ts)$/.test(base)) continue;
    const content = (f.content ?? "")
      .replaceAll("@/registry/default/lib/utils", "@/lib/utils")
      .replace(/@\/registry\/[\w-]+\/ui\/([\w-]+)/g, "@/showcase/_shared/originui/$1");
    put(join(outDir, base), content);
    if (/export default/.test(content) && !main) main = base.replace(/\.(tsx|ts)$/, "");
    else if (!main && /export (?:function|const) ([A-Z]\w+)/.test(content))
      main = base.replace(/\.(tsx|ts)$/, "");
  }
  put(
    join(outDir, "preview.tsx"),
    `import Component from "./${main}";\n\nexport default function Preview() {\n  return (\n    <div className="flex w-full items-center justify-center p-6">\n      <Component />\n    </div>\n  );\n}\n`,
  );
  console.log(`${fam} <- ${comp0} (${main})`);
}

// ---------- 5. prop'd block previews ----------
put(
  "src/showcase/watermelon/cta-blocks/preview.tsx",
  `import { Cta1 } from "./cta-1";

export default function Preview() {
  return (
    <div className="w-full p-6">
      <Cta1
        title="Start building with Launch UI"
        buttonText="Get Started"
      />
    </div>
  );
}
`,
);

put(
  "src/showcase/watermelon/faq-blocks/preview.tsx",
  `import { Faq1 } from "./faq-1";

const faqs = [
  { id: "1", question: "Is Watermelon UI free?", answer: "Yes — the registry is open source and free for personal and commercial use." },
  { id: "2", question: "How do I install a block?", answer: "Copy the shadcn CLI command from any block page and run it in your project." },
  { id: "3", question: "Does it work with Tailwind v4?", answer: "Yes, the blocks are built on React 19, TypeScript and Tailwind CSS v4." },
];

export default function Preview() {
  return (
    <div className="w-full p-6">
      <Faq1 title="Frequently asked questions" faqs={faqs} />
    </div>
  );
}
`,
);

put(
  "src/showcase/watermelon/footer-blocks/preview.tsx",
  `import { Footer1 } from "./footer-1";

export default function Preview() {
  return (
    <div className="w-full p-6">
      <Footer1
        logo={<span className="text-xl">🍉</span>}
        brandName="Watermelon UI"
        newsletterTitle="Stay in the loop"
        newsletterDescription="Get the newest blocks dropped in your inbox."
      />
    </div>
  );
}
`,
);

put(
  "src/showcase/watermelon/pricing-blocks/preview.tsx",
  `import { Pricing1 } from "./pricing-1";

const plans = [
  { id: "starter", title: "Starter", description: "For personal projects", price: "$0", features: [{ text: "3 components" }, { text: "Community support" }], buttonText: "Start free" },
  { id: "pro", title: "Pro", description: "For shipping products", price: "$29", features: [{ text: "Unlimited components" }, { text: "Priority support" }, { text: "Figma sources" }], buttonText: "Go Pro", isPopular: true },
  { id: "team", title: "Team", description: "For teams of any size", price: "$79", features: [{ text: "Everything in Pro" }, { text: "SSO and roles" }, { text: "Audit log" }], buttonText: "Contact sales" },
];

export default function Preview() {
  return (
    <div className="w-full p-6">
      <Pricing1 plans={plans} />
    </div>
  );
}
`,
);

put(
  "src/showcase/watermelon/micro-interactions/preview.tsx",
  `import { ShimmerButton } from "./shimmer-button/shimmer-button";
import { FlipButton } from "./flip/flip";

export default function Preview() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6 p-8">
      <ShimmerButton>Shimmer Button</ShimmerButton>
      <FlipButton>Flip Button</FlipButton>
    </div>
  );
}
`,
);
console.log("pass4 done");
