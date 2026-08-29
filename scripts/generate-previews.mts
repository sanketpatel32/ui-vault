import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index";
import { SHOWCASE_DIR } from "./vendor-utils.mts";
import { EXISTING_KEYS } from "./vendor-numberflow.mts";

export async function generateAllPreviews() {
  console.log("Generating clean, type-safe preview.tsx for all components...");
  let count = 0;

  for (const entry of entries) {
    const slug = entry.id.replace(new RegExp(`^${entry.source}-`), "");
    const previewKey = entry.previewKey || entry.id;
    if (EXISTING_KEYS.has(previewKey)) continue;

    const dir = path.join(SHOWCASE_DIR, entry.source, slug);
    fs.mkdirSync(dir, { recursive: true });
    const previewFile = path.join(dir, "preview.tsx");

    const code = getPreviewCode(entry.source, slug, entry.name, entry.description);
    fs.writeFileSync(previewFile, code, "utf8");
    count++;
  }

  console.log(`Generated ${count} preview.tsx files! ✓`);
}

function getPreviewCode(source: string, slug: string, name: string, description: string): string {
  // 1. NumberFlow
  if (source === "numberflow") {
    if (slug === "input") {
      return `import { useState } from "react";
import NumberFlow from "@number-flow/react";
import { Minus, Plus } from "lucide-react";

export default function Preview() {
  const [val, setVal] = useState(42);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4 rounded-2xl border border-border bg-panel p-2 shadow-xs">
        <button
          onClick={() => setVal((v) => Math.max(0, v - 1))}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-muted text-fg transition-colors hover:bg-accent-soft hover:text-accent"
          aria-label="Decrease"
        >
          <Minus size={16} />
        </button>

        <div className="min-w-[70px] text-center font-mono text-3xl font-bold tracking-tight text-fg">
          <NumberFlow value={val} />
        </div>

        <button
          onClick={() => setVal((v) => v + 1)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-muted text-fg transition-colors hover:bg-accent-soft hover:text-accent"
          aria-label="Increase"
        >
          <Plus size={16} />
        </button>
      </div>
      <p className="text-xs text-muted-fg">Interactive stepper with animated digit transitions</p>
    </div>
  );
}
`;
    }
    if (slug === "countdown") {
      return `import { useState } from "react";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { Eye, Heart, Share2 } from "lucide-react";

export default function Preview() {
  const [likes, setLikes] = useState(1284);
  const [views, setViews] = useState(8490);
  const [shares, setShares] = useState(312);
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <NumberFlowGroup>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-panel p-3 shadow-xs">
          <button
            onClick={() => {
              setLiked(!liked);
              setLikes((l) => (liked ? l - 1 : l + 1));
            }}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
          >
            <Heart size={15} className={liked ? "fill-red-500 text-red-500" : ""} />
            <NumberFlow value={likes} format={{ notation: "compact" }} />
          </button>

          <div className="h-4 w-px bg-border" />

          <button
            onClick={() => setViews((v) => v + Math.floor(Math.random() * 15) + 1)}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
          >
            <Eye size={15} />
            <NumberFlow value={views} format={{ notation: "compact" }} />
          </button>

          <div className="h-4 w-px bg-border" />

          <button
            onClick={() => setShares((s) => s + 1)}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
          >
            <Share2 size={15} />
            <NumberFlow value={shares} format={{ notation: "compact" }} />
          </button>
        </div>
      </NumberFlowGroup>
      <p className="text-xs text-muted-fg">Click any metric to trigger smooth NumberFlow transitions</p>
    </div>
  );
}
`;
    }
  }

  // 2. ReactBits
  if (source === "reactbits") {
    if (slug === "split-text") {
      return `import { useState } from "react";

export default function Preview() {
  const [key, setKey] = useState(0);
  const words = ["Build", "stunning", "interfaces", "faster", "with", "UI", "Vault"];

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div key={key} className="flex flex-wrap justify-center gap-2 text-3xl font-bold tracking-tight text-fg">
        {words.map((w, i) => (
          <span
            key={w + i}
            style={{ animationDelay: \`\${i * 80}ms\` }}
            className="inline-block animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
          >
            {w}
          </span>
        ))}
      </div>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
      >
        Replay SplitText
      </button>
    </div>
  );
}
`;
    }
    if (slug === "glitch-text") {
      return `export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="relative font-mono text-4xl font-extrabold tracking-widest text-fg">
        <span className="relative z-10">CYBERPUNK</span>
        <span className="absolute inset-0 translate-x-[2px] text-red-500 opacity-70 mix-blend-screen" aria-hidden>
          CYBERPUNK
        </span>
        <span className="absolute inset-0 translate-x-[-2px] text-cyan-400 opacity-70 mix-blend-screen" aria-hidden>
          CYBERPUNK
        </span>
      </div>
      <p className="text-xs text-muted-fg font-sans">RGB chromatic aberration glitch effect</p>
    </div>
  );
}
`;
    }
    if (slug === "decrypted-text") {
      return `import { useState, useEffect } from "react";

const TARGET = "SECURITY_PROTOCOL_ACTIVATED";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

export default function Preview() {
  const [text, setText] = useState(TARGET);

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        TARGET.split("")
          .map((char, index) => {
            if (index < iteration) return TARGET[index];
            if (char === "_") return "_";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= TARGET.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  };

  useEffect(() => {
    scramble();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 text-center font-mono">
      <div className="min-h-[40px] text-2xl font-bold text-fg tracking-wide">{text}</div>
      <button
        onClick={scramble}
        className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg font-sans"
      >
        Decrypt Again
      </button>
    </div>
  );
}
`;
    }
    if (slug === "gradient-text") {
      return `export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h3 className="bg-linear-to-r from-accent via-pink-500 to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
        Gradient Elegance
      </h3>
      <p className="text-xs text-muted-fg">Multi-stop animated gradient sweep</p>
    </div>
  );
}
`;
    }
    if (slug === "circular-text") {
      return `export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-dashed border-accent/40 bg-accent-soft/30 animate-[spin_12s_linear_infinite]">
        <span className="font-mono text-[11px] font-bold tracking-widest text-accent">
          REACT • BITS • VAULT •
        </span>
      </div>
    </div>
  );
}
`;
    }
    if (slug === "magnet") {
      return `import { useState } from "react";

export default function Preview() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex h-48 w-72 items-center justify-center rounded-2xl border border-dashed border-border bg-panel"
    >
      <div
        style={{
          transform: \`translate3d(\${pos.x}px, \${pos.y}px, 0)\`,
          transition: "transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)",
        }}
      >
        <button className="rounded-xl border border-border bg-accent text-accent-fg px-4 py-2 text-sm font-medium shadow-md">
          Magnetic Button
        </button>
      </div>
    </div>
  );
}
`;
    }
    if (slug === "star-border") {
      return `export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative overflow-hidden rounded-xl p-[1.5px]">
        <div className="moving-border-track absolute inset-[-100%]" aria-hidden />
        <div className="relative rounded-[10px] bg-panel px-8 py-3.5 shadow-sm">
          <span className="text-sm font-semibold text-fg">Star Border Glow</span>
        </div>
      </div>
      <p className="text-xs text-muted-fg">Traveling streak along component perimeter</p>
    </div>
  );
}
`;
    }
  }

  // 3. Motion Primitives
  if (source === "motionprimitives") {
    if (slug === "text-scramble") {
      return `import { useState, useEffect } from "react";

const PHRASE = "MOTION PRIMITIVES";
const GLYPHS = "01010101#@$%&*";

export default function Preview() {
  const [display, setDisplay] = useState(PHRASE);

  const run = () => {
    let count = 0;
    const timer = setInterval(() => {
      setDisplay(
        PHRASE.split("")
          .map((_c, i) => (i < count ? PHRASE[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      );
      if (count >= PHRASE.length) clearInterval(timer);
      count += 1;
    }, 40);
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 text-center font-mono">
      <div className="text-2xl font-bold tracking-wider text-fg">{display}</div>
      <button
        onClick={run}
        className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg font-sans"
      >
        Scramble
      </button>
    </div>
  );
}
`;
    }
    if (slug === "text-morph") {
      return `import { useState, useEffect } from "react";

const WORDS = ["Create", "Design", "Animate", "Ship"];

export default function Preview() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="min-h-[50px] flex items-center justify-center">
        <span key={idx} className="text-4xl font-extrabold tracking-tight text-accent animate-in fade-in zoom-in-95 duration-500">
          {WORDS[idx]}
        </span>
      </div>
      <p className="text-xs text-muted-fg">Smooth glyph morphing between changing words</p>
    </div>
  );
}
`;
    }
    if (slug === "shimmer-wave") {
      return `export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h3 className="shiny-text text-3xl font-extrabold tracking-tight">
        Luminescent Wave
      </h3>
      <p className="text-xs text-muted-fg">Light wave passing continuously through text</p>
    </div>
  );
}
`;
    }
    if (slug === "animated-number") {
      return `import { useState } from "react";
import NumberFlow from "@number-flow/react";

export default function Preview() {
  const [val, setVal] = useState(1280);

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="font-mono text-4xl font-bold tracking-tight text-fg">
        $<NumberFlow value={val} />
      </div>
      <button
        onClick={() => setVal(Math.floor(Math.random() * 9000) + 1000)}
        className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
      >
        Randomize Value
      </button>
    </div>
  );
}
`;
    }
    if (slug === "sliding-number") {
      return `import { useState } from "react";
import NumberFlow from "@number-flow/react";

export default function Preview() {
  const [count, setCount] = useState(482);

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="font-mono text-5xl font-bold tracking-tight text-accent">
        <NumberFlow value={count} />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setCount((c) => c + 15)}
          className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
        >
          +15
        </button>
        <button
          onClick={() => setCount((c) => Math.max(0, c - 20))}
          className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
        >
          -20
        </button>
      </div>
    </div>
  );
}
`;
    }
    if (slug === "spotlight") {
      return `import { useState } from "react";

export default function Preview() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      className="relative flex h-56 w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-8 shadow-xs"
    >
      <div
        style={{
          background: \`radial-gradient(circle 120px at \${pos.x}% \${pos.y}%, rgba(139, 92, 246, 0.25), transparent 80%)\`,
        }}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10 text-center">
        <h4 className="text-lg font-semibold text-fg">Interactive Spotlight</h4>
        <p className="mt-1 text-xs text-muted-fg">Hover and move pointer around this container</p>
      </div>
    </div>
  );
}
`;
    }
    if (slug === "tilt") {
      return `import { useState } from "react";

export default function Preview() {
  const [rot, setRot] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
        const y = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        setRot({ x, y });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      style={{ perspective: 800 }}
      className="flex items-center justify-center p-4"
    >
      <div
        style={{
          transform: \`rotateX(\${rot.x}deg) rotateY(\${rot.y}deg)\`,
          transition: "transform 0.1s ease-out",
        }}
        className="flex h-44 w-72 flex-col justify-between rounded-2xl border border-border bg-panel p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-medium text-accent">3D TILT</span>
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <p className="text-sm font-semibold text-fg">Hover pointer across this card</p>
        <p className="text-[11px] text-muted-fg">Smooth gyro perspective response</p>
      </div>
    </div>
  );
}
`;
    }
    if (slug === "border-trail") {
      return `export default function Preview() {
  return (
    <div className="relative flex h-40 w-72 items-center justify-center rounded-2xl border border-border bg-panel p-6 shadow-sm overflow-hidden">
      <div className="moving-border-track absolute inset-[-100%]" aria-hidden />
      <div className="relative rounded-xl bg-panel px-6 py-4 text-center z-10">
        <p className="text-sm font-semibold text-fg">Border Trail</p>
        <p className="text-xs text-muted-fg">Animated streak along container perimeter</p>
      </div>
    </div>
  );
}
`;
    }
    if (slug === "infinite-slider") {
      return `export default function Preview() {
  const items = ["React", "Tailwind", "Motion", "TypeScript", "Vite", "Next.js", "Radix", "Shadcn"];

  return (
    <div className="w-full max-w-md overflow-hidden py-4 fade-x">
      <div className="flex gap-4 animate-[marquee_15s_linear_infinite]">
        {items.concat(items).map((item, idx) => (
          <div
            key={item + idx}
            className="flex h-12 w-28 shrink-0 items-center justify-center rounded-xl border border-border bg-panel text-xs font-semibold shadow-xs text-fg"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
`;
    }
  }

  // 4. Aceternity
  if (source === "aceternity") {
    if (slug === "3d-card-effect") {
      return `import { useState } from "react";

export default function Preview() {
  const [rot, setRot] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
        const y = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
        setRot({ x, y });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      style={{ perspective: 1000 }}
      className="p-4"
    >
      <div
        style={{
          transform: \`rotateX(\${rot.x}deg) rotateY(\${rot.y}deg)\`,
          transition: "transform 0.15s ease-out",
        }}
        className="w-80 rounded-2xl border border-border bg-panel p-6 shadow-2xl space-y-4"
      >
        <h4 className="text-lg font-bold text-fg">Aceternity 3D Card</h4>
        <p className="text-xs text-muted-fg leading-relaxed">
          Hover over this card to experience realistic multi-plane 3D perspective shifts.
        </p>
        <div className="h-32 w-full rounded-xl bg-linear-to-br from-accent/30 via-pink-500/20 to-cyan-400/20 flex items-center justify-center border border-accent/20">
          <span className="font-mono text-xs font-semibold text-accent">Interactive 3D Plane</span>
        </div>
      </div>
    </div>
  );
}
`;
    }
    if (slug === "lamp-effect") {
      return `export default function Preview() {
  return (
    <div className="relative flex h-60 w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-2xl bg-zinc-950 px-6 text-center shadow-xl">
      <div className="absolute top-0 h-28 w-48 bg-cyan-500/30 blur-2xl rounded-full" />
      <div className="relative z-10 space-y-2">
        <h3 className="bg-linear-to-b from-white to-zinc-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
          Lamps Done Right
        </h3>
        <p className="text-xs text-zinc-400">Atmospheric top-down cone lighting</p>
      </div>
    </div>
  );
}
`;
    }
    if (slug === "aurora-background") {
      return `export default function Preview() {
  return (
    <div className="relative flex h-60 w-full max-w-md items-center justify-center overflow-hidden rounded-2xl bg-zinc-950 p-6 text-center shadow-xl">
      <div className="absolute inset-0 bg-linear-to-tr from-accent/40 via-emerald-500/30 to-pink-500/30 opacity-60 blur-3xl" />
      <div className="relative z-10 space-y-2">
        <h3 className="text-2xl font-bold tracking-tight text-white">Aurora Background</h3>
        <p className="text-xs text-zinc-300">Shimmering northern lights atmospheric backdrop</p>
      </div>
    </div>
  );
}
`;
    }
  }

  // 5. Default Showcase preview with component demo
  return `export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-panel p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-medium text-accent uppercase tracking-wider">${source}</span>
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <h4 className="text-base font-semibold text-fg tracking-tight">${name}</h4>
        <p className="text-xs text-muted-fg leading-relaxed">${description.replace(/"/g, "'")}</p>
      </div>
    </div>
  );
}
`;
}

void generateAllPreviews();
