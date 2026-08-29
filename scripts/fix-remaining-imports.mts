import * as fs from "node:fs";

const targets = [
  "src/showcase/launchui/footer/preview.tsx",
  "src/showcase/launchui/logos/preview.tsx",
  "src/showcase/launchui/stats/preview.tsx",
  "src/showcase/launchui/glow/preview.tsx",
  "src/showcase/launchui/mockup/preview.tsx",
  "src/showcase/launchui/screenshot/preview.tsx",
  "src/showcase/launchui/glass/preview.tsx",
  "src/showcase/reactbits/glitch-text/preview.tsx",
  "src/showcase/reactbits/gradient-text/preview.tsx",
  "src/showcase/reactbits/circular-text/preview.tsx",
  "src/showcase/reactbits/shiny-text/preview.tsx",
  "src/showcase/reactbits/star-border/preview.tsx",
  "src/showcase/motionprimitives/shimmer-wave/preview.tsx",
  "src/showcase/motionprimitives/border-trail/preview.tsx",
  "src/showcase/motionprimitives/infinite-slider/preview.tsx",
  "src/showcase/aceternity/moving-border/preview.tsx",
  "src/showcase/aceternity/lamp-effect/preview.tsx",
  "src/showcase/aceternity/aurora-background/preview.tsx",
];

for (const target of targets) {
  if (fs.existsSync(target)) {
    let content = fs.readFileSync(target, "utf8");
    // Replace className="..." on first element with className={cn("...")}
    if (content.includes('className="')) {
      content = content.replace(/className="([^"]+)"/, 'className={cn("$1")}');
      fs.writeFileSync(target, content, "utf8");
      console.log("Used cn in", target);
    }
  }
}
