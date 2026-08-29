import Screenshot from "./screenshot";

export default function Preview() {
  return (
    <div className="w-72 overflow-hidden rounded-xl border border-border shadow-md">
      <Screenshot
        srcLight="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
        alt="Dashboard Screenshot"
        width={400}
        height={250}
        className="w-full object-cover"
      />
    </div>
  );
}
