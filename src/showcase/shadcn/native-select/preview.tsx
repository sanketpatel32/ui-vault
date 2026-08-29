import { NativeSelect, NativeSelectOption } from "./native-select";

export default function Preview() {
  return (
    <div className="w-60">
      <NativeSelect defaultValue="system">
        <NativeSelectOption value="light">Light Theme</NativeSelectOption>
        <NativeSelectOption value="dark">Dark Theme</NativeSelectOption>
        <NativeSelectOption value="system">System Preference</NativeSelectOption>
      </NativeSelect>
    </div>
  );
}
