import { BlurFade } from "./blur-fade";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <BlurFade delay={0.25} inView>
        <h3 className="text-2xl font-bold tracking-tight text-fg">Hello BlurFade</h3>
      </BlurFade>
      <BlurFade delay={0.5} inView>
        <p className="text-xs text-muted-fg">Smooth progressive blur-in animation sequence.</p>
      </BlurFade>
    </div>
  );
}
