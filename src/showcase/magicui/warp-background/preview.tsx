import { WarpBackground } from "./warp-background";

export default function Preview() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <WarpBackground className="w-full max-w-md rounded-xl">
        <div className="p-8 text-center">
          <p className="text-lg font-semibold text-fg">Warp speed</p>
          <p className="mt-1 text-sm text-muted-fg">Beams travel the card&rsquo;s border grid.</p>
        </div>
      </WarpBackground>
    </div>
  );
}
