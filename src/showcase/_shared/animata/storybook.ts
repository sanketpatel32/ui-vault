/**
 * Minimal type-only stand-in for "@storybook/react" so upstream animata
 * `*.stories.tsx` files compile unchanged and double as preview demos.
 */
import type { ComponentType, ReactNode } from "react";

// oxlint-disable-next-line typescript/no-explicit-any
type AnyArgs = Record<string, any>;

export interface StoryContext {
  args: AnyArgs;
}

export type Decorator = (Story: ComponentType, context: StoryContext) => ReactNode;

export interface Meta<_T = unknown> {
  title?: string;
  // oxlint-disable-next-line typescript/no-explicit-any
  component?: ComponentType<any>;
  args?: AnyArgs;
  argTypes?: AnyArgs;
  parameters?: AnyArgs;
  tags?: string[];
  decorators?: Decorator[];
}

type PropsOf<T> =
  T extends ComponentType<infer P>
    ? P
    : T extends { component?: ComponentType<infer P> }
      ? P
      : AnyArgs;

export interface StoryObj<T = unknown> {
  name?: string;
  args?: Partial<PropsOf<T>>;
  argTypes?: AnyArgs;
  parameters?: AnyArgs;
  decorators?: Decorator[];
  render?: (args: PropsOf<T>, context: StoryContext) => ReactNode;
}

export type StoryFn<P = AnyArgs> = ((args: P, context: StoryContext) => ReactNode) & {
  args?: Partial<P>;
};
