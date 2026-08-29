import * as React from "react";

interface ControlledStateProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export function useControlledState<T>(
  arg1?: T | ControlledStateProps<T>,
  arg2?: T,
  arg3?: (value: T) => void,
): [T, (next: any) => void] {
  let value: T | undefined;
  let defaultValue: T | undefined;
  let onChange: ((value: T) => void) | undefined;

  if (
    arg1 &&
    typeof arg1 === "object" &&
    ("value" in arg1 || "defaultValue" in arg1 || "onChange" in arg1)
  ) {
    const props = arg1 as ControlledStateProps<T>;
    value = props.value;
    defaultValue = props.defaultValue;
    onChange = props.onChange;
  } else {
    value = arg1 as T | undefined;
    defaultValue = arg2;
    onChange = arg3;
  }

  const [state, setState] = React.useState<T>(value !== undefined ? value : (defaultValue as T));
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : state;

  const setValue = React.useCallback(
    (next: any) => {
      const nextValue = typeof next === "function" ? next(currentValue) : next;

      if (!isControlled) {
        setState(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, currentValue, onChange],
  );

  return [currentValue as T, setValue];
}
