import { Switch } from "./switch";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 p-8">
        <Switch defaultChecked id="notifications" />
        <label htmlFor="notifications">Notifications</label>
      </div>
    </div>
  );
}
