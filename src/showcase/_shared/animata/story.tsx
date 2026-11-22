import { MotionConfig } from "motion/react";
import { useMemo, type ComponentType, type ReactNode } from "react";
import type { Meta, StoryFn, StoryObj } from "./storybook";

/** Renders one upstream animata story (CSF3 object or CSF2 function) as a live preview. */
export function AnimataStory({ meta, story }: { meta: Meta; story: StoryObj<any> | StoryFn<any> }) {
  const Story = useMemo(() => {
    const args = { ...meta.args, ...story.args };
    const context = { args };
    const Component = meta.component;
    const render =
      typeof story === "function"
        ? story
        : (story.render ?? (() => (Component ? <Component {...args} /> : null)));
    let Wrapped: ComponentType = (): ReactNode => <>{render(args, context)}</>;
    const decorators = [
      ...((typeof story === "function" ? [] : story.decorators) ?? []),
      ...(meta.decorators ?? []),
    ];
    for (const decorate of decorators) {
      const Inner: ComponentType = Wrapped;
      Wrapped = (): ReactNode => <>{decorate(Inner, context)}</>;
    }
    return Wrapped;
  }, [meta, story]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="animata-preview flex w-full items-center justify-center">
        <Story />
      </div>
    </MotionConfig>
  );
}
