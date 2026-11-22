import Component from "./src/components/dashboards/jobtracker-dashboard/demo";

export default function Preview() {
  // The dashboard collapses past usefulness below ~34rem; keep that width and let the frame scroll.
  return (
    <div className="w-full min-w-[34rem]">
      <div className="flex min-h-96 items-start justify-center p-4">
        <Component />
      </div>
    </div>
  );
}
