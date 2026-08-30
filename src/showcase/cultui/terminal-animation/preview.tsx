import Demo from "./demo";

export default function Preview() {
  return (
    <div className="w-full">
      {/* The upstream component expects an `animate-caret-blink` utility in
          global CSS; scope it to this preview so the cursor blinks without
          touching app-level styles. */}
      <style>{`
        @keyframes cultui-caret-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-caret-blink {
          animation: cultui-caret-blink 1s step-end infinite;
        }
      `}</style>
      <Demo />
    </div>
  );
}
