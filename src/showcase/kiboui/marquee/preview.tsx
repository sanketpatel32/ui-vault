import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/marquee).

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-96 items-center justify-center p-6">
        <Marquee>
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
          <MarqueeContent>
            {new Array(10).fill(null).map((_, index) => (
              <MarqueeItem className="h-32 w-32" key={index}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`Placeholder ${index}`}
                  className="overflow-hidden rounded-full"
                  src={`https://placehold.co/128x128?random=${index}`}
                />
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </div>
  );
}
